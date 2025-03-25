import { InputTransactionData } from "@aptos-labs/wallet-adapter-react";
// Internal utils
import { convertAmountFromHumanReadableToOnChain } from "@/utils/helpers";
import { MODULE_ADDRESS } from "@/constants";

export type MintAssetArguments = {
  assetType: string;
  amount: number;
  decimals: number;
  to: string;
};

export const mintAsset = (args: MintAssetArguments): InputTransactionData => {
  const { assetType, amount, decimals, to } = args;
  return {
    data: {
      function: `${MODULE_ADDRESS}::ytest_fa::mint`,
      typeArguments: [],
      functionArguments: [assetType, to, convertAmountFromHumanReadableToOnChain(amount, decimals)],
    },
  };
};
