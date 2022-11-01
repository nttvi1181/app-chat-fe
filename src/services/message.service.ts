import HttpRequest from "./axiosClient";

export const MessageService = {
  getByConversationId: async (conversationId: string, skip = 0, limit = 20) => {
    return HttpRequest.get(`/message/by_conversation_id/${conversationId}/?skip=${skip}&limit=${limit}`);
  },
};
