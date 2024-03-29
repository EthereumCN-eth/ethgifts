import { useCallback, useEffect, useState } from "react";

import { useExternalDragState } from "./externalDragState";
import { useFileReadText } from "./useFileReadText";

export const useFileReadTextOnDrop = () => {
  const [file, setFile] = useState<File>();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // console.log(acceptedFiles);
    setFile(acceptedFiles[0]);
    // setLocalImgSrc(URL.createObjectURL(acceptedFiles[0]));
  }, []);

  const fileText = useFileReadText({ file });
  // console.log("fileText", fileText);

  const setFileText = useExternalDragState((state) => state.setFileText);
  useEffect(() => {
    setFileText(fileText);
  }, [fileText, setFileText]);
  const resetFile = useCallback(() => {
    // console.log(acceptedFiles);
    setFile(undefined);
    setFileText(undefined);
    // setLocalImgSrc(URL.createObjectURL(acceptedFiles[0]));
  }, [setFileText]);

  return {
    onDrop,
    fileText,
    resetFile,
  };
};
