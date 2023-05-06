import BaseService from '../../config/_BaseService';

export interface IScenario {
  id: number;
  name: string;
}

export interface ICreateScenario {
  workFlowId?: number;
  name: string;
}

class TopicService extends BaseService<any> {
  protected baseUri = 'data/setting';

  public GetTopics(tagname: string) {
    return this.fetch.post(`/topic-tag/external/getAllTopicTag?tag-name=${tagname}`);
  }
  public AddTopics(data: any) {
    return this.fetch.post(`/topic-tag/external/create`, data);
  }
  public UpdateTopics(data: any) {
    return this.fetch.post(`/topic-tag/external/update`, data);
  }
}

const topicService = new TopicService();
export default topicService;
