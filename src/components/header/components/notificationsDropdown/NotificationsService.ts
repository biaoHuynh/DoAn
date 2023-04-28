import BaseService from '@app/config/_BaseService';
class NotificationsService extends BaseService<any> {
  public getNotifiCations() {
    return this.fetch.post(`/notify/external/findByUserId`);
  }
  public DeleteNotifiCations() {
    return this.fetch.post(`/notify/external/deleteAll`);
  }
}

const notificationsService = new NotificationsService();
export default notificationsService;
