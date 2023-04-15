import BaseService from '../../config/_BaseService';
class DBService extends BaseService<any> {
  public get10Post() {
    return this.fetch.post(`/post/external/getAllPost?offset=0`);
  }
}

const dbService = new DBService();
export default dbService;
