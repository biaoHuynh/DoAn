import BaseService from '../../config/_BaseService';

class AuthService extends BaseService<any> {
  protected baseUri = '/auth';

  public login(data: any) {
    return this.fetch.post(`${this.baseUri}/login`, data);
  }
  public register(data: any) {
    return this.fetch.post(`${this.baseUri}/signup`, data);
  }
  public verifyToken() {
    return this.fetch.post(`${this.baseUri}/getUserInfoByToken`);
  }
}

const scenarioService = new AuthService();
export default scenarioService;
