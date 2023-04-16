import BaseService from '../../config/_BaseService';
class DBService extends BaseService<any> {
  public get10Post(offset: number) {
    return this.fetch.post(`/post/external/getAllPost?offset=${offset}`);
  }
}

const dbService = new DBService();
export default dbService;
