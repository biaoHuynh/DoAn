import BaseService from '../../config/_BaseService';

export interface IScenario {
  id: number;
  name: string;
}

export interface ICreateScenario {
  workFlowId?: number;
  name: string;
}

class ScenarioService extends BaseService<any> {
  protected baseUri = 'api/v2/admin/setting';

  public getSetting() {
    return this.fetch.get(`${this.baseUri}`);
  }

  public updateSetting(data: any) {
    return this.fetch.post(`api/v2/admin/setting`, data);
  }

  public createNotDuplicate(data: ICreateScenario) {
    return this.fetch.post(`${this.baseUri}/duplicate`, data);
  }

  public getScenarioGenerators() {
    return this.fetch.get(`/scenarioGenerators`);
  }

  public getSchedules() {
    return this.fetch.get(`${this.baseUri}`);
  }

  public getDetail(id: number) {
    return this.fetch.get(`/generators/scenario/${id}`);
  }

  public createScenario(data: { name: string }) {
    return this.fetch.post(`/scenarioGenerators/create`, data);
  }

  public deleteScenario(id: number) {
    return this.fetch.delete(`/generators/scenario/${id}`);
  }
}

const scenarioService = new ScenarioService();
export default scenarioService;
