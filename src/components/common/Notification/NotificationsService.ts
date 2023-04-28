import BaseService from '@app/config/_BaseService';
class NotificationService extends BaseService<any> {
  public read(id: number) {
    return this.fetch.post(`/notify/external/updateStatus?notifyId=${id}`);
  }
}

const notificationService = new NotificationService();
export default notificationService;
