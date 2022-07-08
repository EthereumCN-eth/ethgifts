import axios from "axios";
// import ogs from "open-graph-scraper";

export const parseOg = async (urlValue: string) => {
  // const options = {
  //   url: urlValue,
  //   retry: 2,
  //   timeout: 10000,
  //   downloadLimit: 10000000,
  // };
  try {
    // const data = await ogs(options);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const results = await axios.get<{ meta: any }>("http://localhost:3000", {
      params: { url: urlValue },
      headers: {
        Accept: "application/json",
      },
    });
    console.log("results", results);
    const { meta } = results.data;
    // console.log("error:", error); // This returns true or false. True if there was an error. The error itself is inside the results object.
    // console.log("meta:", meta); // This contains all of the Open Graph results
    // if (error) {
    //   return {};
    // }

    if (meta && meta.success) {
      let ogTitle, ogDescription;
      let image:
        | {
            url: string;
            width?: number;
            height?: number;
          }
        | undefined;

      if (meta?.ogImage) {
        if (!Array.isArray(meta?.ogImage)) {
          if (
            (meta?.ogImage?.url &&
              Object.prototype.toString.call(meta?.ogImage?.url) ===
                "[object String]" &&
              // image format
              meta?.ogImage?.url.startsWith("http")) ||
            meta?.ogImage?.url.startsWith("https")
          ) {
            image = {
              url: meta.ogImage.url,
            };
            if (
              meta.ogImage.height &&
              meta.ogImage.width &&
              !isNaN(meta.ogImage.width) &&
              !isNaN(meta.ogImage.height)
            ) {
              image["width"] = Number(meta.ogImage.width);
              image["height"] = Number(meta.ogImage.height);
            }
          }
        }
      }
      if (meta?.ogTitle) {
        ogTitle = meta.ogTitle;
      }
      if (meta?.ogDescription) {
        ogDescription = meta.ogDescription;
      }

      return {
        image,
        ogDescription,
        ogTitle,
      };
    } else {
      return {};
    }
  } catch (e) {
    console.log("parseog error:", e);
    return {};
  }
};
