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
  protected baseUri = 'data/setting';

  public getComputerRunning() {
    return this.fetch.get(`data/computer/running`);
  }

  public getSubscribeByDays(startDay: any, endDay: any) {
    return this.fetch.get(`/data/report?from=${startDay}&to=${endDay}`);
  }

  public getChannelRunning() {
    return this.fetch.get(`/api/v2/order/list?state=running`);
  }

  public getChannelCompleted() {
    return this.fetch.get(`/api/v2/order/list?state=completed`);
  }

  public getChannelCancel() {
    return this.fetch.get(`/api/v2/order/list?state=cancel`);
  }

  public getChannelPending() {
    return this.fetch.get(`/api/v2/order/list?state=pending`);
  }

  public updateMultiOrder(data: any) {
    return this.fetch.post(`/api/v2/order/updateMulti`, data);
  }
  public updateOrder(data: any, id: number) {
    return this.fetch.post(`/api/v2/order/update/${id}`, data);
  }
  public insertOrder(data: any) {
    return this.fetch.post(`/api/v2/order/add`, data);
  }

  public deleteMultiOrder(data: any) {
    return this.fetch.post(`/api/v2/order/deleteMulti`, data);
  }

  public CancelOrder(id: any) {
    return this.fetch.get(`/api/v2/order/cancel/${id}`);
  }

  public ConfirmCancelOrder(id: any, refund: number) {
    return this.fetch.get(`/subscribe/confirmCancel?channel_id=${id}&refund${refund}`);
  }
}

const scenarioService = new ScenarioService();
export default scenarioService;
