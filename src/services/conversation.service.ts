import HttpRequest from "./axiosClient";

export const ConversationService = {
    getAllConversations: async () => HttpRequest.get('/conversation/all_conversations')
}