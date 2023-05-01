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
  public getListContact(offset: number, keyname: string) {
    return this.fetch.post(`/user/external/findByName?offset=${offset}&name=${keyname}`);
  }

  public subunsub(id: number) {
    return this.fetch.post(`/subscriber/external/doSub?expertId=${id}`);
  }
  public addFriend(id: number, action: string) {
    return this.fetch.post(`/contact/external/create?reciver_id=${id}&action=${action}`);
  }
  public updateFriend(id: number, action: string) {
    return this.fetch.post(`/contact/external/update?user_id=${id}&action=${action}`);
  }
}

const listContactService = new ListContactService();
export default listContactService;
