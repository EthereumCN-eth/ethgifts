import NextHeadSeo from "next-head-seo";

export const NextSeoData = () => (
  <NextHeadSeo
    title="ETHGifts"
    canonical="ETHGifts"
    description="ETHGifts"
    og={{
      title: "ETHGifts",
      description: "ETHGifts",
      url: "https://www.ethgifts.com",
      image:
        "https://ethereumcn.mypinata.cloud/ipfs/Qmbnr9qdUna5DbuXFSbcx82nFWgd9FKHHdHx2RZ4B7B1gb",
      type: "website",
      siteName: "ETHGifts",
    }}
    twitter={{
      card: "summary_large_image",
    }}
  />
);
