import { DataSignIn, DataSignUp } from "@types";
import HttpRequest from "./axiosClient";

const UserService = {
  updateInfo: async (id: string, data: any) => {
    return await HttpRequest.put(`/user/${id}`, data);
  },

  login: async (data: DataSignIn) => {
    return await HttpRequest.post("/user/login", {
      ...data,
      phone: data.phone,
      password: data.password,
    });
  },

  register: async (data: DataSignUp) => {
    return await HttpRequest.post("/user/register", data);
  },

  search: async (data: { searchKey: string }) => {
    return await HttpRequest.post("/user/search", data);
  },

  getMyinfo: async () => {
    return await HttpRequest.get("/user/myinfo");
  },
};

export default UserService;
