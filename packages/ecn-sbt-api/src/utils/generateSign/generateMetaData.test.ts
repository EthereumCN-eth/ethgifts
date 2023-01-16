import { storeMetaData } from "./generateMetaData";
const metaDataName = "ExpressSBT";
const metaDataDescription = "hello world";
const issuer = "0x999999";
const subject = "";
const contributions = {};

describe("test automatically select metadata generation method based on express amount", () => {
  it("input 3 amount", async () => {
    const expressAmount = 3;

    const storeStatus = await storeMetaData(
      metaDataName,
      metaDataDescription,
      issuer,
      subject,
      contributions,
      expressAmount
    );

    expect(storeStatus.success).toBe(true);
    expect(storeStatus.data.substr(0, 4)).toBe("ipfs");
  });

  it("input 20 amount", async () => {
    const expressAmount = 20;

    const storeStatus = await storeMetaData(
      metaDataName,
      metaDataDescription,
      issuer,
      subject,
      contributions,
      expressAmount
    );

    expect(storeStatus.success).toBe(true);
    expect(storeStatus.data.substr(0, 4)).toBe("http");
  });
});
