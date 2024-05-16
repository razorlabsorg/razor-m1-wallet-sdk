import { IWalletAdapter, IWalletAdapterV2, IWalletRadar } from './interfaces';
import {
  WalletRadarSubscriptionInput,
  WalletRadarSubscriptionOutput,
} from './types';
import { isStandardWalletAdapterCompatibleWallet } from './utils';
import { WalletAdapter } from './WalletAdapter';
import { WalletAdapterV2 } from './WalletAdapterV2';
import {
  getWallets,
  Wallet,
  Wallets as WalletStandardSdk,
} from '@razorlabs/wallet-standard';
import { AptosWallet, Wallets as WalletStandardSdkV2, isWalletWithRequiredFeatureSet } from '@aptos-labs/wallet-standard';

/// type IAdapter = IWalletAdapter | IWalletAdapterV2;

export class WalletRadar implements IWalletRadar {
  private walletStandardSdk: WalletStandardSdk | WalletStandardSdkV2 | null;
  private walletAdapterMap: Map<string, IWalletAdapter>;
  private walletAdapterMapV2: Map<string, IWalletAdapterV2>;
  private clearOnRegisterListener: null | (() => void);
  private subscriptions = new Set<WalletRadarSubscriptionInput>();

  constructor() {
    this.walletStandardSdk = null;
    this.clearOnRegisterListener = null;
    this.walletAdapterMap = new Map();
    this.walletAdapterMapV2 = new Map();
  }

  activate(): void {
    this.walletStandardSdk = getWallets();
    const initialWalletAdapters = this.walletStandardSdk.get();
    initialWalletAdapters.forEach((adapter) => {
      const isV2 = isWalletWithRequiredFeatureSet(adapter);
      if (isV2) {
        this.setDetectedWalletAdaptersV2(adapter);
      } else {
        this.setDetectedWalletAdapters(adapter);
      }
    });
    this.clearOnRegisterListener = this.walletStandardSdk.on(
      'register',
      (...newAdapters) => {
        newAdapters.forEach((adapter) => {
          this.setDetectedWalletAdapters(adapter);
        });
        this.notifySubscribers();
      }
    );
  }

  deactivate(): void {
    if (this.clearOnRegisterListener) {
      this.clearOnRegisterListener();
    }
    this.walletAdapterMap.clear();
    this.walletAdapterMapV2.clear();
  }

  getDetectedWalletAdapters(): IWalletAdapter[] {
    return Array.from(this.walletAdapterMap.values());
  }

  getDetectedWalletAdaptersV2(): IWalletAdapterV2[] {
    return Array.from(this.walletAdapterMapV2.values());
  }

  subscribe(
    callback: WalletRadarSubscriptionInput
  ): WalletRadarSubscriptionOutput {
    this.subscriptions.add(callback);
    return () => {
      this.subscriptions.delete(callback);
    };
  }

  private notifySubscribers() {
    this.subscriptions.forEach((subscription) => {
      subscription(this.getDetectedWalletAdapters());
    });
  }

  private setDetectedWalletAdapters(rawAdapter: Wallet) {
    if (!isStandardWalletAdapterCompatibleWallet(rawAdapter)) return;
    if (this.walletAdapterMap.has(rawAdapter.name)) return;

    this.walletAdapterMap.set(rawAdapter.name, new WalletAdapter(rawAdapter));
  }

  private setDetectedWalletAdaptersV2(rawAdapter: Wallet) {
    if (!isWalletWithRequiredFeatureSet(rawAdapter)) return;
    if (this.walletAdapterMapV2.has(rawAdapter.name)) return;

    this.walletAdapterMapV2.set(rawAdapter.name, new WalletAdapterV2(rawAdapter));
  }
}
