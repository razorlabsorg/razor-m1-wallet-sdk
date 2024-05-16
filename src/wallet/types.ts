import type { IWalletAdapter, IWalletAdapterV2 } from '../wallet-standard';

export interface IWallet {
  name: string;
  label: string;
  adapter: IWalletAdapter | IWalletAdapterV2 | undefined;
  installed: boolean | undefined;
  iconUrl: string;
  downloadUrl: {
    browserExtension?: string; // chrome default
  };
}

export type IDefaultWallet = Omit<
  IWallet,
  keyof {
    adapter: any;
    installed: any;
  }
>;
