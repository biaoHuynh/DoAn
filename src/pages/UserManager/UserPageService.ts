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

  public AddUser(data: any) {
    return this.fetch.post(`/user/external/create`, data);
  }
  public UpdateUser(data: any) {
    return this.fetch.post(`/user/external/update`, data);
  }

  public DelUsers(id: number) {
    return this.fetch.post(`/user/external/delete?id=${id}`);
  }
}

const userService = new UserService();
export default userService;
