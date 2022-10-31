import { VStack, Text } from "@chakra-ui/react";

import { useIsAuth } from "@/state/global/hooks";
import { useAppSelector } from "@/state/reduxHooks";
import { selectors as sbtSelectors } from "@/state/sbt";

import { VCButton } from "./VCButton";
import { VCCard } from "./VCCard";

export const VCDetail = () => {
  const isAuth = useIsAuth();
  const { loaded, records } = useAppSelector(sbtSelectors.selectAll);
  return (
    <VStack
      mt="12px"
      mb="12px"
      minH="369px"
      w="full"
      bg="#FAFAFA"
      borderRadius="16px"
      boxShadow="2px 2px 4px rgba(0, 0, 0, 0.25)"
      px="40px"
      py="30px"
    >
      <Text color="#000" fontWeight={600} fontSize="lg" mb="22px">
        {!isAuth && "请连接钱包以显示你的VC数据"}
        {isAuth && !loaded && "加载中..."}
        {isAuth && loaded && !records && "我们没有你的VC数据"}
        {isAuth && loaded && !!records && "E群誌贡献VC的关键数据"}
      </Text>
      <VCCard />

      <VCButton />
    </VStack>
  );
};
