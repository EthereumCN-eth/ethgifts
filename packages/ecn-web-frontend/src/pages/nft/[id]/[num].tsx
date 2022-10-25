import { Layout } from "@/components/Layouts/Layout";
import { NFT } from "@/components/NFT";

const NFTPage = () => {
  return (
    <Layout headerProps={{ colorTheme: "black" }}>
      <NFT />
    </Layout>
  );
};

export default NFTPage;
