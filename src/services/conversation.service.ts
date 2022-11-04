import HttpRequest from "./axiosClient";

export const ConversationService = {
  getAllConversations: async () =>
    HttpRequest.get("/conversation/all_conversations"),
  deleteConversation: async (data: { conversation_id: string }) =>
    HttpRequest.post("/conversation/member_delete", data),
};
