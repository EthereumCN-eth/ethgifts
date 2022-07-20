import { parseMsg } from "./utils";

describe("test parseMsg", () => {
  it("parse url", async () => {
    const { hasUrl, msg, url } = parseMsg(
      "以太坊工作量证明（PoW）转为权益证明（PoS）已经箭在弦上，那么具体将带来哪些改变，普通用户又该如何参与到这场变革当中呢？请看：https://mirror.xyz/snapfingersdao.eth/AgX10hrIy1Hwwo8Lyt_RtPWSVopd7fZkjWuEMChkSI4"
    );
    expect(hasUrl).toBe(true);
    expect(msg).toBe(
      "以太坊工作量证明（PoW）转为权益证明（PoS）已经箭在弦上，那么具体将带来哪些改变，普通用户又该如何参与到这场变革当中呢？请看："
    );
    expect(url).toBe(
      "https://mirror.xyz/snapfingersdao.eth/AgX10hrIy1Hwwo8Lyt_RtPWSVopd7fZkjWuEMChkSI4"
    );
  });

  it("invalid url", async () => {
    const { hasUrl, msg, url } = parseMsg(
      "以太坊工作量证明（PoW）转为权益证明（PoS）已经箭在弦上，那么具体将带来哪些改变，普通用户又该如何参与到这场变革当中呢？"
    );
    expect(hasUrl).toBe(false);
    expect(msg).toBe("");
    expect(url).toBe("");
  });
});
