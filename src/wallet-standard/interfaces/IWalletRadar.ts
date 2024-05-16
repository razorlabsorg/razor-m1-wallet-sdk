import { IWalletAdapter } from './IWalletAdapter';
import {
  WalletRadarSubscriptionInput,
  WalletRadarSubscriptionOutput,
} from '../types';
import { IWalletAdapterV2 } from './IWalletAdapterV2';

export interface IWalletRadar {
  activate: () => void;
  deactivate: () => void;
  getDetectedWalletAdapters: () => IWalletAdapter[];
  getDetectedWalletAdaptersV2: () => IWalletAdapterV2[]
  /**
   * Subscribe to detected wallet updates
   * @param callback
   */
  subscribe: (
    callback: WalletRadarSubscriptionInput
  ) => WalletRadarSubscriptionOutput;
}
