import { storeMetaData } from "./generateMetaData";

describe("test automatically select metadata generation method based on express amount", () => {
  it("input 3 amount", async () => {
    const subject = "";
    const contributions = {};
    const expressAmount = 3;

    const storeStatus = await storeMetaData(
      subject,
      contributions,
      expressAmount
    );

    expect(storeStatus.success).toBe(true);
    expect(storeStatus.data.substr(0, 4)).toBe("ipfs");
  });

  it("input 20 amount", async () => {
    const subject = "";
    const contributions = {};
    const expressAmount = 20;

    const storeStatus = await storeMetaData(
      subject,
      contributions,
      expressAmount
    );

    expect(storeStatus.success).toBe(true);
    expect(storeStatus.data.substr(0, 4)).toBe("http");
  });
});
