import { Home } from "@/components/Home";
import { Layout } from "@/components/Layouts/Layout";
// translateY(calc(${15}vh + ${scrollY}px))

const HomePage = () => {
  return (
    <Layout headerProps={{ colorTheme: "white" }}>
      <Home />
    </Layout>
  );
};

export default HomePage;
