import ogs from "open-graph-scraper";

export const parseOg = async (urlValue: string) => {
  const options = {
    url: urlValue,
    retry: 2,
    timeout: 10000,
    downloadLimit: 10000000,
  };
  try {
    const data = await ogs(options);
    const { error, result } = data;
    // console.log("error:", error); // This returns true or false. True if there was an error. The error itself is inside the results object.
    console.log("result:", result); // This contains all of the Open Graph results
    if (error) {
      return {};
    }

    if (result.success) {
      let ogTitle, ogDescription;
      let image:
        | {
            url: string;
            width?: number;
            height?: number;
          }
        | undefined;

      if (result?.ogImage) {
        if (!Array.isArray(result?.ogImage)) {
          if (result?.ogImage?.url) {
            image = {
              url: result.ogImage.url,
            };
            if (result.ogImage.height && result.ogImage.width) {
              image["width"] = Number(result.ogImage.width);
              image["height"] = Number(result.ogImage.height);
            }
          }
        }
      }
      if (result?.ogTitle) {
        ogTitle = result.ogTitle;
      }
      if (result?.ogDescription) {
        ogDescription = result.ogDescription;
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
