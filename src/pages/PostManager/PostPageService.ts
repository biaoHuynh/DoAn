import BaseService from '../../config/_BaseService';

export interface IScenario {
  id: number;
  name: string;
}

export interface ICreateScenario {
  workFlowId?: number;
  name: string;
}

class PostService extends BaseService<any> {
  protected baseUri = 'data/setting';

  public GetPosts(title: string, offset: number) {
    return this.fetch.post(`/post/external/findByTitle?title=${title}&offset=${offset}`);
  }
}

const postService = new PostService();
export default postService;
