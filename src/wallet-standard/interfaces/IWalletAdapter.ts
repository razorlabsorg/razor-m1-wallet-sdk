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
} from '@razorlabs/wallet-standard';

export type IWalletAdapter = WalletWithFeatures<
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
