import { NextSeo } from "next-seo";

import { Home } from "@/components/Home";
import { Layout } from "@/components/Layouts/Layout";
import defaultSEOConfig from "next-seo.config";
// translateY(calc(${15}vh + ${scrollY}px))

const HomePage = () => {
  return (
    <>
      <NextSeo {...defaultSEOConfig} />
      <Layout headerProps={{ colorTheme: "white" }}>
        <Home />
      </Layout>
    </>
  );
};

export default HomePage;
