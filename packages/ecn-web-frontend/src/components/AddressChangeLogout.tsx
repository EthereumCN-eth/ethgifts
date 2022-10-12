import { useEffect, useRef } from "react";
import { useAccount } from "wagmi";

import { actions as globalActions } from "../state/global";
import { useAppDispatch } from "@/state/reduxHooks";

const AddressChangeLogout = () => {
  const { address } = useAccount();
  const dispatch = useAppDispatch();
  const previousAddrRef = useRef<string | undefined>(address);
  useEffect(() => {
    if (address !== previousAddrRef.current) {
      dispatch(
        globalActions.setAuth({
          accessToken: null,
          auth_status: "unauthenticated",
        })
      );
    }
    previousAddrRef.current = address;
  }, [address, dispatch]);
  return null;
};

export { AddressChangeLogout };
