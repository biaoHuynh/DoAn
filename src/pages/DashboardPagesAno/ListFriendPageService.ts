import BaseService from '../../config/_BaseService';

export interface IScenario {
  id: number;
  name: string;
}

export interface ICreateScenario {
  workFlowId?: number;
  name: string;
}

class ListContactService extends BaseService<any> {
  public get10Post() {
    return this.fetch.post(`/post/findAllPost?offset=0`);
  }
  public getAllExpert() {
    return this.fetch.post(`/user/findAllExpert?offset=0`);
  }
  public getAllTop() {
    return this.fetch.post(`/post/findPostAllMost`);
  }
}

const listContactService = new ListContactService();
export default listContactService;
