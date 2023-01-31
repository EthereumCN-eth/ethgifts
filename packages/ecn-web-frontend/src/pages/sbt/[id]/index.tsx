import { Layout } from "@/components/Layouts/Layout";
import { SBT_V2 } from "@/components/SBT_V2";

const SBTPage = () => {
  return (
    <Layout headerProps={{ colorTheme: "black" }}>
      <SBT_V2 />
    </Layout>
  );
};

export default SBTPage;
