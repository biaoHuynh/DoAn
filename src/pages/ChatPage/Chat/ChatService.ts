import BaseService from '@app/config/_BaseService';
class ChatService extends BaseService<any> {
  public getListFriends() {
    return this.fetch.post(`/contact/external/getListFriend`);
  }
  public getAllMessages(topicId: string) {
    const data = {
      topicId: topicId,
      limit: 20,
      offset: 0,
    };
    return this.fetch.post(`/chat/external/getAllChat`, data);
  }
}
const chatService = new ChatService();
export default chatService;
