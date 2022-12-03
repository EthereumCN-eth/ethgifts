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

  const setFileText = useExternalDragState((state) => state.setFileText);
  useEffect(() => {
    setFileText(fileText);
  }, [fileText, setFileText]);

  return {
    onDrop,
    fileText,
  };
};
