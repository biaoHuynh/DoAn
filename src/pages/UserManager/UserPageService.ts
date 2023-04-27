import BaseService from '../../config/_BaseService';

export interface IScenario {
  id: number;
  name: string;
}

export interface ICreateScenario {
  workFlowId?: number;
  name: string;
}

class UserService extends BaseService<any> {
  protected baseUri = 'data/setting';

  public GetUsers(data: any) {
    return this.fetch.post(`/user/external/findAll?offset=0`, data);
  }
}

const userService = new UserService();
export default userService;
