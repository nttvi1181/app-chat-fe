import axiosClient from "./axiosClient";

const userApi = {
  async login(data: any) {
    const url = ``;
    return axiosClient.post(url, data);
  },
};

export default userApi;
