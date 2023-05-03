import BaseService from '../../config/_BaseService';
class FPService extends BaseService<any> {
  public get10PostWithTitle(title: string, offset: number) {
    return this.fetch.post(`/post/external/findByTitle?title=${title}&offset=${offset}`);
  }
  public getByID(id: any) {
    return this.fetch.post(`/post/external/findById?postId=${id}`);
  }
  public getComment(id: any) {
    return this.fetch.post(`/comment/external/getAllComment?postId=${id}`);
  }
  public sendComment(data: any) {
    return this.fetch.post(`/comment/external/create`, data);
  }
}

const fpService = new FPService();
export default fpService;
