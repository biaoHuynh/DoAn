import BaseService from '../../../config/_BaseService';

class FromService extends BaseService<any> {
  protected baseUri = '/v1';

  public upLoadPost(data: any) {
    return this.fetch.post(`/post/external/create`, data);
  }
  public updateInfor(data: any) {
    return this.fetch.post(`/user/external/update`, data);
  }
  public getAllTopicTag() {
    return this.fetch.post(`/topic-tag/external/getAllTopicTag?tag-name=`);
  }
}

const fromService = new FromService();
export default fromService;
