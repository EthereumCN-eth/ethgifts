export const parseMsg = (msg: string) => {
  const urlIndex = msg.indexOf("https");
  if (urlIndex === -1) {
    return {
      hasUrl: false,
      url: "",
      msg: "",
    };
  } else {
    let strArray = [...msg];
    const urlStr = strArray.splice(urlIndex);
    return {
      hasUrl: true,
      url: urlStr.join(""),
      msg: strArray.join(""),
    };
  }
};
