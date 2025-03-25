import { HeroSection } from "./components/HeroSection";

import { OurStorySection } from "./components/OurStorySection";

import { Socials } from "./components/Socials";

import { Header } from "@/components/Header";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

export function Mint() {

  const queryClient = useQueryClient();
  const { account } = useWallet();
  useEffect(() => {
    queryClient.invalidateQueries();
  }, [account, queryClient]);


  return (
    <>
      <Header />
      <div style={{ overflow: "hidden" }} className="overflow-hidden">
        <main className="flex flex-col gap-10 md:gap-16 mt-6">
          {/* <ConnectWalletAlert /> */}
          <HeroSection />

          <OurStorySection />
        </main>

        <footer className="footer-container px-4 pb-6 w-full max-w-screen-xl mx-auto mt-6 md:mt-16 flex items-center justify-between">
          <Socials />
        </footer>
      </div>
    </>
  );
}
