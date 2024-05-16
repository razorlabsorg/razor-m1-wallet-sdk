import { Wallet } from '@razorlabs/wallet-standard';

export function isStandardWalletAdapterCompatibleWallet(wallet: Wallet) {
  return (
    'aptos:connect' in wallet.features &&
    'standard:events' in wallet.features &&
    'aptos:signAndSubmitTransaction' in wallet.features
  );
}
