import BaseService from '../../config/_BaseService';

export interface PostParam {
  user_id: number;
  offset: number;
}

class ProfilePageService extends BaseService<any> {
  protected postBaseUri = '/post/external/';
  protected contactBaseUri = '/contact/external/';
  protected userBaseUri = '/user/external/';

  public getAllPost(data: PostParam) {
    return this.fetch.post(`${this.postBaseUri}findAllPostByUserId?user-id=${data.user_id}&offset=${data.offset}`);
  }

  public getListFriend(){
    return this.fetch.post(`${this.contactBaseUri}getListFriend`);
  }

}

const scenarioService = new ProfilePageService();
export default scenarioService;
