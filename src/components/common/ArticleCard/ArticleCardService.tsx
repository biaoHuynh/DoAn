import BaseService from '../../../config/_BaseService';

export interface IScenario {
  id: number;
  name: string;
}

export interface ICreateScenario {
  workFlowId?: number;
  name: string;
}

class ScenarioService extends BaseService<any> {
  protected baseUri = 'data/setting';

  public getTitle(title: string) {
    return this.fetch.get(`/v1/get_user_info_by_sid?sid=${title}`);
  }
}

const scenarioService = new ScenarioService();
export default scenarioService;
