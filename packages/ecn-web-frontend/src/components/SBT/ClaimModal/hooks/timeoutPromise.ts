export const timeoutPromise = (num: number) =>
  new Promise<boolean>((res) => {
    setTimeout(() => res(true), num);
  });
