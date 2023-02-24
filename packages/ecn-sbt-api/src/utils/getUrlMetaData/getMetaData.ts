import ogs from "open-graph-scraper";
import { Meta } from "./types";
import axios from "axios";
import { urlType } from "@prisma/client";
import fetch from "node-fetch";
import cheerio from "cheerio";
import { getUrl, getTwitterStatusId, verifyMediaUrl } from "./utils";
import { UrlType } from "./types";
import { prisma } from "../../server";

export class MetaData {
  expressUrl: string;

  constructor(expressUrl: string) {
    this.expressUrl = expressUrl;
  }

  public async getOgData(): Promise<Meta> {
    const options = {
      url: this.expressUrl,
      // customMetaTags: [
      //   {
      //     multiple: true,
      //     property: "site_name",
      //     fieldName: "site",
      //   },
      // ],
    };

    const ogData = await ogs(options);
    const { error, result } = ogData;

    if (!error && result.success) {
      if (result.ogSiteName?.includes("YouTube")) {
        return {
          urlType: UrlType.video,
          title: result.ogTitle || result.twitterTitle,
          siteName: result.ogSiteName || result.twitterSite,
          videoUrl:
            result.ogVideo != undefined ? getUrl(result.ogVideo) : undefined,
        };
      }
      const imageUrl = result.ogImage || result.twitterImage;
      return {
        urlType: UrlType.ogData,
        title: result.ogTitle || result.twitterTitle,
        description: result.ogDescription || result.twitterDescription,
        imageUrl: imageUrl != undefined ? getUrl(imageUrl) : undefined,
        siteName: result.ogSiteName || result.twitterSite,
      };
    } else {
      console.log("fail to get og data, try to get meta tag data");
      const metaFetch = await this.fetchPage();
      return {
        urlType: metaFetch.urlType,
        title: metaFetch?.title,
        description: metaFetch?.description,
      };
    }
  }

  async fetchPage() {
    const response = await fetch(this.expressUrl);
    const $ = cheerio.load(await response.text());

    const title =
      $("title").text() ||
      $("meta[name=title]").attr("content") ||
      $("meta[name=title]").attr("content");
    const description =
      $("meta[name=description]").attr("content") ||
      $("meta[name=og:description]").attr("content");

    if (title !== "" && description !== "") {
      return {
        urlType: UrlType.onlyMeta,
        title: title,
        description: description,
      };
    } else {
      console.log(
        `fail to get meta tag data, ${this.expressUrl} is an invalid url`
      );
      return {
        urlType: UrlType.noMeta,
      };
    }
  }

  public getTwitter(): Meta {
    const twitterId = getTwitterStatusId(this.expressUrl);

    return {
      urlType: urlType.twitter,
      twitterId: twitterId,
    };
  }
}

export const generateMetaData = async (msgId: string, url: string) => {
  const meta = new MetaData(url);
  try {
    const metadata = verifyMediaUrl(url)
      ? meta.getTwitter()
      : await meta.getOgData();

    // console.log(metadata);
    await prisma.metaData.create({
      data: {
        messageId: msgId,
        urlType: metadata.urlType,
        title: metadata.title,
        description: metadata.description,
        imageUrl: metadata.imageUrl,
        site: metadata.siteName,
        videoUrl: metadata.videoUrl,
        twitterId: metadata.twitterId,
      },
    });

    return {
      success: true,
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
    };
  }
};
