import { timeoutPromise } from "./timeoutPromise";

export async function checkWithMinTime<T>(p: Promise<T>, time: number) {
  const [result] = await Promise.all([p, timeoutPromise(time)]);

  return result;
}
