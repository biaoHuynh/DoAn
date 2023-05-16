import React, { useEffect, useState } from 'react';
import { Col, Input, Row, Image, Space, Select } from 'antd';

const { Search } = Input;

import * as s from '../FindPostPage/Tables.styles';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import fpService from '../FindPostPage/PostFindService';
import FindPortScroll from './FindPortScroll';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
const FindPost: React.FC = () => {
  const { state } = useLocation();
  const [keyword, setKeyWord] = useState<string>(' ');
  const [findPost, setFindPost] = useState<any[]>([]);
  const [topics, setTopics] = useState<any[]>([{ value: 0, label: 'All' }]);
  const [topicVal, setTopicVal] = useState<number>(state ? parseInt(state.toString()) : 0);

  const [hasMore, setHasMore] = useState<boolean>(true);
  const { t } = useTranslation();
  const onSearch = (value: string) => {
    setKeyWord(value.trim());

    fpService.get10PostWithTitle(value.trim(), 0, topicVal).then((res: any) => {
      if (res?.data !== null) {
        setFindPost(res.data);
      }
    });
  };
  useEffect(() => {
    fpService.get10PostWithTitle(keyword, findPost.length, topicVal).then((res: any) => {
      if (res?.data !== null) {
        setFindPost(res.data);
      }
      if (res?.data?.length < 10) {
        setHasMore(false);
      }
    });
    fpService.getTopics().then((res: any) => {
      if (res?.data !== null) {
        const topic = res?.data?.map((item: any) => {
          return { value: item.id, label: item.tagName };
        });
        setTopics([...topics, ...topic]);
      }
    });
  }, []);
  const getAllData = () => {
    fpService.get10PostWithTitle(keyword, findPost.length, topicVal).then((data: any) => {
      if (data?.data?.length === 0) {
        setHasMore(false);
      } else {
        setHasMore(true);
        if (data !== null) {
          setFindPost([...findPost, ...data.data]);
        }
      }
    });
  };

  const next = () => {
    getAllData();
  };
  const handleChange = (value: number) => {
    setTopicVal(value);
  };
  return (
    <>
      <PageTitle>{t('vb.findPort')}</PageTitle>
      <s.Card title={t('vb.findPort')} bodyStyle={{ height: '48rem', padding: '20px 60px' }}>
        <Space wrap>
          <Search placeholder={t('vb.findpost')} enterButton onSearch={onSearch} />
          <Select value={topicVal} style={{ width: 120 }} onChange={handleChange} options={topics} />
        </Space>
        <FindPortScroll activity={findPost} hasMore={hasMore} next={next} />
      </s.Card>
    </>
  );
};

export default FindPost;
