import { User, RawExpressMessage, ExpressMessage } from "@prisma/client";
import axios from "axios";
// import { boolean } from "yup";

export const addRawMsgApi = async (msgPayload: {
  rawMessage: string;
  discordId: string;
  discordName: string;
  msgId: string;
}) => {
  try {
    const results = await axios.post<{
      success: boolean;
      data?: {
        discordName: string | null;
        userId: string;
        rawMessage: string;
        parsedUrl: string;
        parsedMessage: string;
        user: {
          ethAddress: string | null;
          discordId: string;
        };
      };
    }>("http://localhost:3010/rawMsg/addRawMessage", msgPayload);
    // console.log("res:", results.data);
    return {
      success: results.data.success,
      data: results.data.data,
    };
  } catch (e) {
    // console.log("addRawMessage error:", e);
    return {
      success: false,
      data: null,
    };
  }
};

export const userHasAddressApi = async ({
  discordId,
}: {
  discordId: string;
}) => {
  try {
    const results = await axios.post<{
      success: boolean;
      data?: {
        hasEthAddress: boolean;
        user?: {
          ethAddress: string | null;
        };
      };
    }>("http://localhost:3010/user/hasEthAddress", { discordId });
    // console.log("res:", results.data);
    return {
      success: results.data.success,
      hasEthAddress: results.data.data?.hasEthAddress || false,
      user: results.data.data?.user,
    };
  } catch (e) {
    // console.log("addRawMessage error:", e);
    return {
      success: false,
      data: null,
    };
  }
};

export const updateAddressApi = async ({
  ethAddress,
  discordId,
  discordName,
}: {
  discordId: string;
  ethAddress: string;
  discordName: string;
}) => {
  try {
    const results = await axios.post<{
      success: boolean;
      data?: User;
    }>("http://localhost:3010/user/updateEthAddress", {
      ethAddress,
      discordId,
      discordName,
    });
    // console.log("res:", results.data);
    return {
      success: results.data.success,
      data: results.data,
    };
  } catch (e) {
    // console.log("addRawMessage error:", e);
    return {
      success: false,
      data: null,
    };
  }
};

export const findRawMsg = async ({ msgId }: { msgId: string }) => {
  try {
    const results = await axios.post<{
      success: boolean;
      data?: RawExpressMessage;
      error: string | null;
    }>("http://localhost:3010/rawMsg/findRawMessage", {
      msgId,
    });
    // console.log("res:", results.status);
    return {
      success: results.data.success,
      data: results.data,
    };
  } catch (e) {
    // console.log("addRawMessage error:", e);
    return {
      success: false,
      data: null,
    };
  }
};

export const addMsgApi = async (msgPayload: {
  content: string;
  url: string;
  discordId: string;
  contentType: string;
  msgId: string;
}) => {
  try {
    const results = await axios.post<{
      success: boolean;
      data?: ExpressMessage;
    }>("http://localhost:3010/msg/addMessage", msgPayload);
    // console.log("res:", results.status);
    return {
      success: results.data.success,
      data: results.data.data,
    };
  } catch (e) {
    // console.log("addMessage error:", e);
    return {
      success: false,
      data: null,
    };
  }
};
