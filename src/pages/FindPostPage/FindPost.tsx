import React, { useEffect, useState } from 'react';
import { Col, Input, Row, Image } from 'antd';

const { Search } = Input;

import * as s from '../FindPostPage/Tables.styles';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import fpService from '../FindPostPage/PostFindService';
import FindPortScroll from './FindPortScroll';
const FindPost: React.FC = () => {
  const [keyword, setKeyWord] = useState<string>(' ');
  const [findPost, setFindPost] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const onSearch = (value: string) => {
    setKeyWord(value.trim());

    fpService.get10PostWithTitle(value.trim(), 0).then((res: any) => {
      if (res?.data !== null) {
        setFindPost(res.data);
      }
    });
  };
  useEffect(() => {
    fpService.get10PostWithTitle(keyword, findPost.length).then((res: any) => {
      if (res?.data !== null) {
        setFindPost(res.data);
      }
      if (res?.data?.length < 10) {
        setHasMore(false);
      }
    });
  }, []);
  const getAllData = () => {
    fpService.get10PostWithTitle(keyword, findPost.length).then((data: any) => {
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
  return (
    <>
      <PageTitle>Tìm Kiếm Bài Viết</PageTitle>

      <s.Card title="Tìm Kiếm Bài Viết" bodyStyle={{ height: '48rem', padding: '20px 60px' }}>
        <Search style={{ width: '30%' }} placeholder="Tìm kiếm bài viết" enterButton onSearch={onSearch} />
        <FindPortScroll activity={findPost} hasMore={hasMore} next={next} />
      </s.Card>
    </>
  );
};

export default FindPost;