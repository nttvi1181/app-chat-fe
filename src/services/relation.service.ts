import HttpRequest from "./axiosClient";

export const RelationServives = {
  getAllRelation: async () => HttpRequest.get("/friend/get_all"),
  getAllRequestReceived: async () => HttpRequest.get("/friend/get_all_request"),
  sendRelation: async (data: any) =>
    HttpRequest.post("/friend/send_request", data),
  acceptRelation: async (data: any) =>
    HttpRequest.post("/friend/accept_request", data),
};
