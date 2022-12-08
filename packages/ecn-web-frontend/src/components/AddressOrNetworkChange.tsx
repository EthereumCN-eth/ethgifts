// import { actions as globalActions } from "../state/global";
import { useAutoLogoutExpiredJWT } from "@/state/global/hooks";

const AddressOrNetworkChange = () => {
  // const { chain } = useNetwork();
  // const { address } = useAccount();
  // const dispatch = useAppDispatch();
  // const previousAddrRef = useRef<string | undefined>(address);
  useAutoLogoutExpiredJWT();
  // useEffect(() => {
  //   if (address !== previousAddrRef.current) {
  //     // dispatch(
  //     //   globalActions.setAuth({
  //     //     accessToken: null,
  //     //     auth_status: "unauthenticated",
  //     //   })
  //     // );
  //   }

  //   previousAddrRef.current = address;
  // }, [address, dispatch]);
  return null;
};

export { AddressOrNetworkChange };
