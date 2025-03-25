import Placeholder1 from "@/assets/placeholders/asset.png";

export const config: Config = {
  // Removing one or all of these socials will remove them from the page
  socials: {
    twitter: "https://twitter.com",
    discord: "https://discord.com",
    homepage: "#",
  },

  defaultAsset: {
    name: "Yeap Finance Test Tokens Facet",
    image: Placeholder1,
  },

  ourStory: {
    title: "Yeap Finance",
    description: `Yeap Finance is a decentralized finance (DeFi) platform built on the Aptos blockchain.It is a collection of smart contracts that enable users to create and manage financial instruments such as loans,savings accounts.Yeap Finance is designed to be secure, transparent, and efficient, with low transaction fees and fast settlement times.`,
    discordLink: "https://discord.com",
  },
};

export interface Config {
  socials?: {
    twitter?: string;
    discord?: string;
    homepage?: string;
  };

  defaultAsset?: {
    name: string;
    image: string;
  };

  ourStory?: {
    title: string;
    subTitle?: string;
    description: string;
    discordLink: string;
  };
}
