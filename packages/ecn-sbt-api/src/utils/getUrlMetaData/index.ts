import { MetaData } from "./getMetaData";
import { verifyMediaUrl } from "./utils";

/**
 * @dev test link:
 * media(media): https://twitter.com/MevRefund/status/1579199432452886528
 *
 *
 * ogData: https://bogota.ethglobal.com/
 * https://www.theblock.co/post/178896/zksync-to-launch-on-mainnet-this-month-what-you-need-to-know?utm_source=twitter&utm_medium=social
 *
 *
 * https://www.youtube.com/channel/UCrJfD36TJb60hlSl6taZ7rw/videos
 * https://www.youtube.com/watch?v=r8jSHcHQJoU
 * https://evmsummit.org/
 *
 *
 * onlyMeta: https://www.tuoniaox.com/news/p-541633.html
 * noMeta:
 */

export const getMetaData = async (url: string) => {
  const meta = new MetaData(url);
  try {
    const metadata = verifyMediaUrl(url)
      ? await meta.getTwitter()
      : await meta.getOgData();

    console.log(metadata);
    return metadata;
  } catch (error) {
    console.log(error);
  }
};

// getMetaData("https://evmsummit.org/");
