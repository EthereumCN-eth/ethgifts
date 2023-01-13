import ogs from "open-graph-scraper";
import { Meta } from "./types";
import axios from "axios";
import { urlType } from "@prisma/client";
import fetch from "node-fetch";
import cheerio from "cheerio";

export class MetaData {
  expressUrl: string;

  constructor(expressUrl: string) {
    this.expressUrl = expressUrl;
  }

  public async getOgData(): Promise<Meta | undefined> {
    const options = {
      url: this.expressUrl,
      customMetaTags: [
        {
          multiple: true,
          property: "site_name",
          fieldName: "site",
        },
      ],
    };

    const ogData = await ogs(options);
    const { error, result } = ogData;

    if (!error) {
      return {
        urlType: urlType.ogData,
        title: result.ogTitle,
        description: result.ogDescription,
        image: result.ogImageURL,
        site: result.site,
        videoUrl: result.ogType?.includes("video") ? result.ogVideo : undefined,
      };
    } else {
      new Error("fail to get og data");
      await this.fetchPage(this.expressUrl);
    }
  }

  async fetchPage(url: string) {
    fetch(url)
      .then((res) => res.text())
      .then((html) => {
        const $ = cheerio.load(html);
        const title = $("meta[property='title']")[0];
        const description = $("meta[property='description']")[0];
      });

    if (!result.data) {
      console.log(result.data);
    } else {
      new Error("invalid url");
    }
  }
}
