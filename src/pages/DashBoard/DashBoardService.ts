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
}

const dbService = new DBService();
export default dbService;
