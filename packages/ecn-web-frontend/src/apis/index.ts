import type { GalleryServerItem } from "@/types/gallery.interface";
import { NEXT_PUBLIC_ECN_WEB_API_BASE } from "src/constants";

const defaultHeaders = {
  // eslint-disable-next-line sonarjs/no-duplicate-string
  Accept: "application/json",
  "Content-Type": "application/json",
};

const AuthHeadersMaker = (token: string) => ({
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: ` Bearer ${token}`,
});

function apiMaker<TRequest, TResponse>({
  path,
  method,
}: {
  path: string;
  method?: string;
}) {
  return async function apiSend({ data }: { data: TRequest }) {
    try {
      const res = await fetch(`${NEXT_PUBLIC_ECN_WEB_API_BASE}${path}`, {
        method: method || "POST",
        headers: defaultHeaders,
        body: (method === "POST" && JSON.stringify(data)) || undefined,
      });
      const resjson = await res.json();
      return resjson as TResponse;
    } catch (error) {
      // console.log(error);
      return {
        success: false,
        error: "api client error",
      } as TResponse;
    }
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function authApiMaker<TRequest, TResponse>({ path }: { path: string }) {
  return async function apiAuthSend({
    data,
    token,
  }: {
    data: TRequest;
    token: string;
  }) {
    try {
      const res = await fetch(`${NEXT_PUBLIC_ECN_WEB_API_BASE}/${path}`, {
        method: "POST",
        headers: AuthHeadersMaker(token),
        body: JSON.stringify(data),
      });
      const resjson = await res.json();
      return resjson as TResponse;
    } catch (error) {
      return {
        success: false,
        error: "api client error",
      };
    }
  };
}

export const ecnApiClient = {
  authNonce: apiMaker<
    Record<string, never>,
    { success: boolean; error?: string; nonce?: string }
  >({
    path: "/auth/nonce",
  }),
  authVerify: apiMaker<
    { message: string; signature: string },
    {
      success: boolean;
      accessToken: null | string;
    }
  >({
    path: "/auth/verify",
  }),
  gallery: apiMaker<
    Record<string, never>,
    {
      success: boolean;
      items: GalleryServerItem[];
      error?: string;
    }
  >({
    path: "/gallery",
    method: "GET",
  }),
};

// export interface TypeEcnApiClient {}