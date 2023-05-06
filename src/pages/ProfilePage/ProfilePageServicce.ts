import BaseService from '../../config/_BaseService';

class ProfilePageService extends BaseService<any> {
  protected postBaseUri = '/post/external/';
  protected contactBaseUri = '/contact/external/';
  protected userBaseUri = '/user/external/';

  public getAllPost(userId: Number, offset: Number) {
    return this.fetch.post(`${this.postBaseUri}findAllPostByUserId?user-id=${userId}&offset=${offset}`);
  }

  public getListFriend() {
    return this.fetch.post(`${this.contactBaseUri}getListFriend`);
  }
  public getListRequest() {
    return this.fetch.post(`${this.contactBaseUri}getListContactRequest`);
  }

  public findUserById(id: Number) {
    return this.fetch.post(`${this.userBaseUri}findById?id=${id}`);
  }
  public updateFriend(id: number, action: string) {
    return this.fetch.post(`/contact/external/update?user_id=${id}&action=${action}`);
  }
  public rating(data: any) {
    return this.fetch.post(`/rating/external/doRating`, data);
  }
  public report(Id: Number) {
    return this.fetch.post(`/user/external/report/${Id}`);
  }
}

const profilePageService = new ProfilePageService();
export default profilePageService;
