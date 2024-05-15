import { Chain } from './types';

export enum AptosChainId {
  DEV_NET = 'aptos:devnet',
  TEST_NET = 'aptos:testnet',
  MAIN_NET = 'aptos:mainnet',
}

export const AptosDevnetChain: Chain = {
  id: AptosChainId.DEV_NET,
  name: 'M1 Devnet',
  rpcUrl: 'https://aptos.devnet.m1.movementlabs.xyz/',
};

export const UnknownChain: Chain = {
  id: 'unknown:unknown',
  name: 'Unknown Network',
  rpcUrl: '',
};

export const DefaultChains = [AptosDevnetChain];
