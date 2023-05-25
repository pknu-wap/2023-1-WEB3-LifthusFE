import axios from "axios";
import { LIFTHUS_AUTH_URL } from "../common/routes";
import { GetUserInfoDto } from "./dtos/user.dto";
import {
  SetUserInfoParams,
  Uid,
  UserApi,
  Username,
} from "./interfaces/userApi.interface";
import userTestApi from "./testApi/userTestApi";

const userApi: UserApi = {
  setUserinfo: async (user: SetUserInfoParams) => {
    if (process.env.NODE_ENV === "development") {
      return userTestApi.setUserinfo(user);
    }
    return userTestApi.setUserinfo(user);
  },
  getUserInfo: async ({ uid }: Uid): Promise<GetUserInfoDto> => {
    try {
      if (process.env.NODE_ENV === "development") {
        return await userTestApi.getUserInfo({ uid });
      }
      const res = await axios.get(LIFTHUS_AUTH_URL + "/auth/user/" + uid);
      return res.data;
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  },
  getIdByName: async ({ username }: Username): Promise<Uid> => {
    if (process.env.NODE_ENV === "development") {
      return userTestApi.getIdByName({ username });
    }
    return userTestApi.getIdByName({ username });
  },
  getNameById: async ({ uid }: Uid): Promise<Username> => {
    try {
      if (process.env.NODE_ENV === "development") {
        return await userTestApi.getNameById({ uid });
      }
      const res = await axios.get(LIFTHUS_AUTH_URL + "/auth/user/" + uid);
      return res.data;
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  },
};

export default userApi;
