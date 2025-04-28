import { FC, FormEvent, useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
// Internal utils
import { truncateAddress } from "@/utils/truncateAddress";
// Internal components
import { Image } from "@/components/ui/image";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { Socials } from "@/pages/Mint/components/Socials";
// Internal hooks
// Internal utils
import { aptosClient } from "@/utils/aptosClient";
// Internal constants
import { CREATOR_ADDRESS, NETWORK, TEST_ASSETS } from "@/constants";
// Internal assets
import Placeholder1 from "@/assets/placeholders/asset.png";
import ExternalLink from "@/assets/icons/external-link.svg";
import Copy from "@/assets/icons/copy.svg";
// Internal config
import { config } from "@/config";
// Internal enrty functions
import { mintAsset } from "@/entry-functions/mint_asset";
import { getMetadatasByCreator } from "@/hooks/useGetAssetMetadata";
import { StatsSection } from "./StatsSection";

interface HeroSectionProps { }

export const HeroSection: React.FC<HeroSectionProps> = () => {

  const queryClient = useQueryClient();
  const { account, signAndSubmitTransaction } = useWallet();

  const [assetCount, setAssetCount] = useState<string>("1");
  const [error, setError] = useState<string | null>(null);
  const [assetMetadatas, setAssetMetadatas] = useState<any[]>([]);
  const [assetObj, setAssetObj] = useState<{
    icon_uri?: string | null;
    project_uri?: string | null;
    supply_aggregator_table_handle_v1?: string | null;
    supply_aggregator_table_key_v1?: string | null;
    creator_address: string;
    asset_type: string;
    decimals: number;
    last_transaction_timestamp: any;
    last_transaction_version: any;
    name: string;
    symbol: string;
    token_standard: string;
    supply_v2?: any | null;
    maximum_v2?: any | null;
  } | null>(null);

  useEffect(() => {
    const fetchMetadata = async () => {
      const metadatas = await getMetadatasByCreator(CREATOR_ADDRESS);

      const testMetas = metadatas.filter(    (metadata) => {
        return TEST_ASSETS.includes(metadata.asset_type);
      })
      setAssetMetadatas(testMetas);
      setAssetObj(testMetas[0]);
    };

    fetchMetadata();
  }, []);

  const mintFA = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const asset = assetObj;
    if (!account) {
      return setError("Please connect your wallet");
    }

    if (!asset) {
      return setError("Asset not found");
    }

    const amount = parseFloat(assetCount);
    if (Number.isNaN(amount) || amount <= 0) {
      return setError("Invalid amount");
    }

    const response = await signAndSubmitTransaction(
      mintAsset({
        assetType: asset.asset_type,
        amount,
        decimals: asset.decimals,
        to: account.address.toString(),
      }),
    );
    await aptosClient().waitForTransaction({ transactionHash: response.hash });
    queryClient.invalidateQueries();
    setAssetCount("1");
  };

  return (
    <section className="hero-container flex flex-col md:flex-row gap-6 px-4 max-w-screen-xl mx-auto w-full">
      <Image
        src={assetObj?.icon_uri || "Placeholder1"}
        rounded="full"
        className="basis-1/2 aspect-square object-cover self-center max-w-[300px]"
      />
      <div className="basis-4/5 flex flex-col gap-4">
        <h1 className="title-md">{assetObj?.name ?? config.defaultAsset?.name}</h1>
        <Socials />

        <Card>
          <CardContent
            fullPadding
            className="flex flex-col md:flex-row gap-4 md:justify-between items-start md:items-center"
          >
            <form onSubmit={mintFA} className="flex flex-col md:flex-row gap-4 w-full md:basis-1/4">
              <select
                name="assetType"

                onChange={async (e) => {
                  const selectedAsset = assetMetadatas.find(v => v.asset_type === e.target.value);
                  if (selectedAsset) {
                    setAssetObj(selectedAsset);
                  }
                }}
                className="input"
              >
                {assetMetadatas.map((t) => (
                  <option key={t.symbol} value={t.asset_type}>
                    {t.name}
                  </option>
                ))}
              </select>

              <Input
                type="text"
                name="amount"
                value={assetCount}
                onChange={(e) => {
                  setAssetCount(e.target.value);
                }}
                className="w-full md:w-auto"
              />
              <Button className="h-16 md:h-auto" type="submit">
                Mint
              </Button>
            </form>

          </CardContent>
        </Card>

        {error && <p className="body-sm text-destructive">{error}</p>}

        <div className="flex gap-x-2 items-center flex-wrap justify-between">
          <p className="whitespace-nowrap body-sm-semibold">Address</p>

          <div className="flex gap-x-2">
            <AddressButton address={assetObj?.asset_type ?? ""} />
            <a
              className={buttonVariants({ variant: "link" })}
              target="_blank"
              href={`https://explorer.aptoslabs.com/account/${assetObj?.asset_type}?network=${NETWORK}`}
            >
              View on Explorer <Image src={ExternalLink} />
            </a>
          </div>
        </div>
      </div>

      {assetObj && <StatsSection fa_address={assetObj?.asset_type} />}
    </section>
  );
};

const AddressButton: FC<{ address: string }> = ({ address }) => {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    if (copied) return;
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  }

  return (
    <Button onClick={onCopy} className="whitespace-nowrap flex gap-1 px-0 py-0" variant="link">
      {copied ? (
        "Copied!"
      ) : (
        <>
          {truncateAddress(address)}
          <Image src={Copy} className="dark:invert" />
        </>
      )}
    </Button>
  );
};
