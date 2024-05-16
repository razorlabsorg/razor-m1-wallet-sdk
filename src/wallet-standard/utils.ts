import { AptosWallet } from '@aptos-labs/wallet-standard';
import { Wallet } from '@razorlabs/wallet-standard';

export function isStandardWalletAdapterCompatibleWallet(wallet: Wallet) {
  return (
    'aptos:connect' in wallet.features &&
    'standard:events' in wallet.features &&
    'aptos:signAndSubmitTransaction' in wallet.features
  );
}

export function isStandardWalletAdapterCompatibleWalletV2(wallet: AptosWallet) {
  return (
    'aptos:connect' in wallet.features &&
    'aptos:signMessage' in wallet.features &&
    'aptos:signAndSubmitTransaction' in wallet.features
  );
}
