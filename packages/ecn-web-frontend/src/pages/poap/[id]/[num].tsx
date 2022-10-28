import { Layout } from "@/components/Layouts/Layout";
import { POAP } from "@/components/POAP";

const PoapPage = () => {
  return (
    <Layout headerProps={{ colorTheme: "black" }}>
      <POAP />
    </Layout>
  );
};

export default PoapPage;
