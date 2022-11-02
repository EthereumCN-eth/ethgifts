export const StatusText = ({
  index,
  sbtLevel,
  claimed,
  expressCount,
  itemTexts,
}: {
  index: number;
  sbtLevel: number[];
  claimed: number[] | undefined;
  expressCount: number | null;
  itemTexts: string[] | null;
}) => {
  if (!itemTexts || !claimed) return "";
  if (!expressCount) {
    return "你还没参与过E群誌编辑哦，快加入ECN Discord，跟大家分享一条以太坊相关的资讯吧！";
  }
  if (expressCount < sbtLevel[index]) {
    if (index === 0 || expressCount > sbtLevel[index - 1]) {
      return `你已经在争取${itemTexts[index]} 的路上了，加油💪`;
    }
    // index !== 0 && expressCount <= sbtLevel[index - 1]
    return `你还没开始争取${itemTexts[index]}的历程哦！`;
    //
  } else {
    // (expressCount >= sbtLevel[index])
    if (!claimed.includes(index + 1)) {
      return `恭喜，你已经可以申领${itemTexts[index]}并下载对应的Verifiable Credential了！`;
    }
    return `你已经领取了${itemTexts[index]}，真棒！`;
  }
  //  expressCount > sbtLevel[index];
};
