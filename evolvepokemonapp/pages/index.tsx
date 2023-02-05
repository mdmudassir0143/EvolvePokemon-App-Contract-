import { ConnectWallet, useAddress, useContract, useOwnedNFTs, ThirdwebNftMedia, Web3Button } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const { contract } = useContract("0xe557b4CBDd6EfD4a19c8848eA0Bb33aC8EeC4A8A");
  const address = useAddress();
  const { data: nfts } = useOwnedNFTs(contract, address);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div style={{ minWidth: "200px" }}>
        </div>
        <div className={styles.title}>
          Mint and Evolve Your Pokemon
        </div>
        <div className={styles.connect}>
          <ConnectWallet />
        </div>
      </div>
      <main className={styles.main}>
        <div className={styles.claim}>
          <div className={styles.claimbutton}><Web3Button contractAddress={"0xe557b4CBDd6EfD4a19c8848eA0Bb33aC8EeC4A8A"} action={(contract) => contract.erc1155.claim(0, 1)}> Claim a Bulbasaur</Web3Button></div>
          <div className={styles.nftContainer}>{
            nfts?.map((nft) =>
              <div className={styles.card} key={nft.metadata.id.toString()}>
                <ThirdwebNftMedia metadata={nft.metadata} />
                <div className={styles.nftName}>
                  {nft.metadata.name}
                </div>
                <div className={styles.nftSupply}>
                  Total Nfts -
                  {nft.quantityOwned}
                </div>
                {(nft.metadata.name === "Bulbasaur") ?
                  <div className={styles.claimbutt}><Web3Button contractAddress={"0xe557b4CBDd6EfD4a19c8848eA0Bb33aC8EeC4A8A"} action={(contract) => contract.call("evolve")}> Evolve to Ivysaur</Web3Button></div> :
                  (nft.metadata.name === "Ivysaur") ?
                    <div className={styles.claimbutt}><Web3Button contractAddress={"0xe557b4CBDd6EfD4a19c8848eA0Bb33aC8EeC4A8A"} action={(contract) => contract.call("evolve1")}> Evolve to Venusaur</Web3Button></div> :
                    <div className={styles.claimbutt}><Web3Button contractAddress={"0xe557b4CBDd6EfD4a19c8848eA0Bb33aC8EeC4A8A"} action={(contract) => contract.call("")}>Venusaur Reached</Web3Button>
                </div>
                }
              </div>
            )}
          </div>
        </div>
      </main>
      <div className={styles.footer}>
        Created by Mohammad Mudassir
      </div>
    </div>
  );
};

export default Home;
