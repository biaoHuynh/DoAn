import BaseService from '../../config/_BaseService';
class DBService extends BaseService<any> {
  public get10Post(offset: number) {
    return this.fetch.post(`/post/external/findAllPost?offset=${offset}`);
  }
  public callLike(id: number) {
    return this.fetch.post(`/post/external/${id}/like`);
  }
  public callDisLike(id: number) {
    return this.fetch.post(`/post/external/${id}/dislike`);
  }
  public sendComment(data: any) {
    return this.fetch.post(`/comment/external/create`, data);
  }
  public getComment(id: number) {
    return this.fetch.post(`/comment/external/getAllComment?postId=${id}`);
  }
  public getAllExpert() {
    return this.fetch.post(`/user/external/findAllExpert?offset=0`);
  }
}

const dbService = new DBService();
export default dbService;
