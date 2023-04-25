import BaseService from '../../config/_BaseService';
class ProfileService extends BaseService<any> {
  public get10Post(offset: number) {
    return this.fetch.post(`/post/external/getAllPost?offset=${offset}`);
  }
}

const profileService = new ProfileService();
export default profileService;
