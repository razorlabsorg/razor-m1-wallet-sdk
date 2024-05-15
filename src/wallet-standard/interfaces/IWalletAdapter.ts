import {
  AptosConnectFeature,
  AptosConnectMethod,
  AptosDisconnectFeature,
  AptosDisconnectMethod,
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
    StandardEventsFeature &
    AptosSignAndSubmitTransactionFeature &
    AptosSignTransactionFeature &
    AptosSignMessageFeature &
    Partial<AptosDisconnectFeature>
> & {
  hasFeature: (name: string) => boolean;
  connect: AptosConnectMethod;
  disconnect: AptosDisconnectMethod;
  on: StandardEventsOnMethod;
  signAndSubmitTransaction: AptosSignAndSubmitTransactionMethod;
  signTransaction: AptosSignTransactionMethod;
  signMessage: AptosSignMessageMethod;
};
