import { Text } from "@chakra-ui/react";
import { css } from "@emotion/react";
import { useAccount, useNetwork } from "wagmi";

import { selectors as globalSelectors } from "@/state/global";
import { useAppSelector } from "@/state/reduxHooks";
import { selectors as sbtSelectors } from "@/state/sbt";
import { responsive } from "@/styles/utils";

const showLevelText = ({
  expressCount,
  sbtLevel,
}: {
  expressCount: number | null;
  sbtLevel: number[];
}) => {
  if (!expressCount)
    return `你还没参与过E群志编辑哦，快加入ECN
          Discord，跟大家分享一条以太坊相关的资讯吧！`;
  const { lv, texttemplate } = sbtLevel.reduce(
    (acc, levelval, levelindex) => {
      if (expressCount < levelval) return acc;
      else if (expressCount === levelval) {
        return {
          texttemplate: (level: number) =>
            `恭喜你🎉你已经有资格申领E群誌Lv${level} SBT了，快去申领吧！`,
          lv: levelindex + 1,
        };
      } else {
        return {
          texttemplate: (level: number) =>
            `你已经在争取E群誌Lv${level} SBT的路上了，感谢你的参与！`,
          lv: levelindex + 2,
        };
      }
    },
    {
      texttemplate: (level: number) =>
        `你已经在争取E群誌Lv${level} SBT的路上了，感谢你的参与！`,
      lv: 1,
    }
  );

  return texttemplate(lv);
};

export const InfoText = () => {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const authStatus = useAppSelector((state) =>
    globalSelectors.selectAuthStatus(state, { address, chainId: chain?.id })
  );
  const {
    // loaded,
    // sbtLevel,
    // status,
    // artworks,
    // itemTexts,
    // detailTags,
    expressCount,
    sbtLevel,
    // contractAddress,
  } = useAppSelector(sbtSelectors.selectAll);

  if (authStatus === "unauthenticated") {
    return (
      <Text
        w={responsive.respWStr(394)}
        css={css`
          font-family: "PingFang SC";
          font-style: normal;
          font-weight: 600;
          font-size: ${responsive.respWStr(14)};
          line-height: 180%;
          letter-spacing: 0.01em;
          color: #ffffff;
        `}
      >
        我们还不了解你的参与情况，快连接钱包看看吧！
      </Text>
    );
  }
  return (
    <Text
      w={responsive.respWStr(394)}
      css={css`
        font-family: "PingFang SC";
        font-style: normal;
        font-weight: 600;
        font-size: ${responsive.respWStr(14)};
        line-height: 180%;
        letter-spacing: 0.01em;
        color: #ffffff;
      `}
    >
      {showLevelText({ expressCount, sbtLevel })}
    </Text>
  );
};
