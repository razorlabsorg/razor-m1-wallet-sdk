import {
  AptosChain,
  StandardEventsListeners,
  Wallet,
  WalletAccount,
} from '@razorlabs/wallet-standard';
import { IWalletAdapter } from './interfaces/IWalletAdapter';
import { IWalletAdapterV2 } from './interfaces';

export type WalletRadarSubscriptionInput = (wallets: IWalletAdapter[] |IWalletAdapterV2[]) => void;
export type WalletRadarSubscriptionOutput = () => void;

export type WalletEvent =
  | keyof StandardEventsListeners
  | 'chainChange'
  | 'featureChange'
  | 'accountChange';

export type WalletEventListeners = StandardEventsListeners & {
  chainChange: (params: ChainChangeParams) => void;
  featureChange: (params: FeatureChangeParams) => void;
  accountChange: (params: AccountChangeParams) => void;
};

export interface ChainChangeParams {
  chain: AptosChain;
}

export interface AccountChangeParams {
  account: WalletAccount;
}

export interface FeatureChangeParams {
  features: Wallet['features'];
}
