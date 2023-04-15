import fetch from './FetchInterceptor';
import { TablePaginationConfig } from 'antd';

export default abstract class BaseService<T> {
  // - properties
  protected baseUri = '';
  protected fetch = fetch;

  // - apis
  public create(data: T): Promise<any> {
    return this.fetch.post(this.baseUri, data);
  }

  public delete(id: number | string): Promise<any> {
    return this.fetch.delete(`${this.baseUri}/${id}`);
  }

  public getAll(): Promise<[T]> {
    return this.fetch.get(this.baseUri);
  }

  public getById(id: number | string): Promise<T> {
    return this.fetch.get(`${this.baseUri}/${id}`);
  }

  public getPaging(param: TablePaginationConfig): Promise<any> {
    const params = this.createQueryParams(param);
    return this.fetch.get(this.baseUri, { params });
  }

  public update(id: number | string, data: T): Promise<any> {
    return this.fetch.put(`${this.baseUri}/${id}`, data);
  }

  // - methods
  protected createQueryParams(param: TablePaginationConfig): any {
    return { page: param?.current, pageSize: param?.pageSize };
  }
}
