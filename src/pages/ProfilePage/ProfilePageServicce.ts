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

  public findUserById(id: number) {
    return this.fetch.post(`${this.userBaseUri}findById?id=${id}`);
  }
}

const scenarioService = new ProfilePageService();
export default scenarioService;
