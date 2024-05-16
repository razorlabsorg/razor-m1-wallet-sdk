import {
  AptosConnectFeature,
  AptosConnectMethod,
  AptosDisconnectFeature,
  AptosDisconnectMethod,
  AptosGetAccountFeature,
  AptosGetAccountMethod,
  AptosGetNetworkFeature,
  AptosGetNetworkMethod,
  AptosSignAndSubmitTransactionFeature,
  AptosSignAndSubmitTransactionMethod,
  AptosSignMessageFeature,
  AptosSignMessageMethod,
  AptosSignTransactionFeature,
  AptosSignTransactionMethod,
  StandardEventsFeature,
  StandardEventsOnMethod,
  WalletWithFeatures,
} from '@aptos-labs/wallet-standard';

export type IWalletAdapterV2 = WalletWithFeatures<
  AptosConnectFeature &
    AptosGetAccountFeature &
    AptosGetNetworkFeature &
    StandardEventsFeature &
    AptosSignAndSubmitTransactionFeature &
    AptosSignTransactionFeature &
    AptosSignMessageFeature &
    Partial<AptosDisconnectFeature>
> & {
  hasFeature: (name: string) => boolean;
  connect: AptosConnectMethod;
  disconnect: AptosDisconnectMethod;
  network: AptosGetNetworkMethod;
  account: AptosGetAccountMethod;
  on: StandardEventsOnMethod;
  signAndSubmitTransaction: AptosSignAndSubmitTransactionMethod;
  signTransaction: AptosSignTransactionMethod;
  signMessage: AptosSignMessageMethod;
};
