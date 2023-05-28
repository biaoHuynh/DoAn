import BaseService from '@app/config/_BaseService';
class ChatService extends BaseService<any> {
  public getListFriends() {
    return this.fetch.post(`/contact/external/getListFriendChat`);
  }
  public getAllMessages(topicId: string) {
    const data = {
      topicId: topicId,
      limit: 100,
      offset: 0,
    };
    return this.fetch.post(`/chat/external/getAllChat`, data);
  }
  public block(topicId: string, userBlockId: string) {
    const data = {
      topicId: topicId,
      userBlockedId: userBlockId,
    };
    return this.fetch.post(`/contact/external/create-chat-block`, data);
  }
  public unblock(topicId: string, userBlockedId: string) {
    const data = {
      topicId: topicId,
      userBlockedId: userBlockedId,
    };
    return this.fetch.post(`/contact/external/delete-chat-block`, data);
  }
}
const chatService = new ChatService();
export default chatService;
