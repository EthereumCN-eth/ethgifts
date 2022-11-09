import type { Provider } from "@ethersproject/providers";
// import { useQuery } from "@tanstack/react-query";
import type { ContractInterface, Signer } from "ethers";
import {
  // useContract,
  useContractRead,
  useAccount,
  useNetwork,
} from "wagmi";

// wagmi mess
export const useNFTRead = (
  contractReadObj: Parameters<typeof useContractRead>[0]
) => {
  const { chain } = useNetwork();

  const { addressOrName, contractInterface, functionName, chainId, args } =
    contractReadObj;
  const { address } = useAccount();
  const [, ...restArgs] = args;
  const fixedArgs = [address, ...restArgs];
  const isOnSameChain = chain?.id === chainId;
  // console.log("chainId", chainId);
  // console.log("chain?.id", chain?.id);

  // const provider = useProvider();
  // const contract = useContract({
  //   addressOrName,
  //   contractInterface,
  //   signerOrProvider: provider,
  //   chainId: chain?.id,
  // });

  return useContractRead({
    addressOrName,
    contractInterface,
    chainId: chain?.id,
    args: fixedArgs,
    functionName,
    enabled: isOnSameChain,
  });

  // const result = useQuery(["useNFTRead", chainId, addressOrName, address], {
  //   queryFn: () => {
  //     return contract[functionName](...fixedArgs);
  //   },
  //   enabled: Boolean(
  //     !!contract && isOnSameChain
  //     // chain?.id === chainId
  //   ),
  // });

  // console.log("Boolean(chain?.id === chainId)", Boolean(chain?.id === chainId));
  // console.log("data result", result);
  // console.log("data status", result.status);
  // return result;
};

export type GetContractArgs = {
  /** Contract address or ENS name */
  addressOrName: string;
  /** Contract interface or ABI */
  contractInterface: ContractInterface;
  /** Signer or provider to attach to contract */
  signerOrProvider?: Signer | Provider | null;
};

// export function getContract<T = Contract>({
//   addressOrName,
//   contractInterface,
//   signerOrProvider,
// }: GetContractArgs) {
//   if (addressOrName === constants.AddressZero) return null;
//   return <T>(
//     (<unknown>(
//       new Contract(
//         addressOrName,
//         contractInterface,
//         <Signer | Provider | undefined>signerOrProvider
//       )
//     ))
//   );
// }

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export const useContract = <Contract = any>({
//   addressOrName,
//   contractInterface,
//   signerOrProvider,
//   chainId,
// }: {
//   addressOrName: string;
//   contractInterface: ContractInterface;
//   signerOrProvider?: Signer | Provider | null | undefined;
//   chainId: number | undefined;
// }) => {
//   return useMemo(() => {
//     return getContract<Contract>({
//       addressOrName,
//       contractInterface,
//       signerOrProvider,
//     });
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [addressOrName, contractInterface, signerOrProvider, chainId]);
// };
