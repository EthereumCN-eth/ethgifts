import { useEffect, useState } from "react";

export const useFileReadText = ({ file }: { file: File | undefined }) => {
  const [fileText, setFileText] = useState<string>();
  useEffect(() => {
    if (!file) {
      setFileText(undefined);
      return () => {};
    }
    const reader = new FileReader();
    reader.readAsText(file);
    const readFunc = (event: ProgressEvent<FileReader>) => {
      setFileText(event?.target?.result as string);
      // console.log("fileText", fileText);
    };
    reader.addEventListener("load", readFunc, false);
    return () => {
      reader.removeEventListener("load", readFunc);
    };
  }, [file, fileText]);

  return fileText;
};
