import React, { useEffect, useState } from 'react';
import { Button, Col, Row, DatePicker, Space, Empty, Modal } from 'antd';
import { Table } from 'components/common/Table/Table';
import { useTranslation } from 'react-i18next';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import * as S from '@app/pages/uiComponentsPages//UIComponentsPage.styles';
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
import { Card } from 'components/common/Card/Card';
import * as s from './Tables.styles';
import moment from 'moment';
import 'moment/locale/vi';

import { ArticleCard } from '@app/components/common/ArticleCard/ArticleCard';
import { NewsFilter } from '@app/components/apps/newsFeed/NewsFilter/NewsFilter';
import { Feed } from '@app/components/common/Feed/Feed';
import { ValidationForm } from '@app/components/forms/ValidationForm/ValidationForm';
import dbService from './DashBoardService';
import { number } from 'echarts';

const Dashboard: React.FC = () => {
  const [news, setNews] = useState<any[]>([]);

  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [nextOffset, setNextOffset] = useState<number>(0);
  const [openPostUpload, setOpenPostUpload] = useState<boolean>(false);

  const { t } = useTranslation();

  const getAllData = () => {
    setLoaded(true);
    dbService.get10Post(nextOffset).then((data: any) => {
      if (data?.data?.length === 0) {
        setHasMore(false);
      } else {
        setHasMore(true);
        if (data !== null) {
          setNews((oldNews) => [...oldNews, ...data.data]);
          setLoaded(false);
          setNextOffset([...news, ...data.data].length);
        }
      }
    });
  };
  useEffect(() => {
    setLoaded(true);
    dbService.get10Post(nextOffset).then((data: any) => {
      if (data !== null) {
        setNews((oldNews) => [...oldNews, ...data.data]);
        setLoaded(false);
        setNextOffset([...news, ...data.data].length);
      }
    });
    return () => {
      setNews([]);
    };
  }, []);
  const getnew = () => {
    setLoaded(true);
    dbService.get10Post(0).then((data: any) => {
      if (data !== null) {
        setNews((oldNews) => [...oldNews, ...data.data]);
      }
      setLoaded(false);
    });
  };
  const next = () => {
    getAllData();
  };

  return (
    <>
      <s.TablesWrapper>
        <s.Card title="Upload Post">
          <Row style={{ width: '100%', margin: '-30px 0px' }}>
            <Button
              style={{ float: 'right', marginBottom: '10px', width: '100px' }}
              onClick={() => setOpenPostUpload(true)}
            >
              Đăng bài
            </Button>
          </Row>
        </s.Card>
        <s.Card title="Trang tin tức">
          <Row style={{ display: 'flex', justifyContent: 'center' }}>
            <NewsFilter news={news}>
              {({ filteredNews }) =>
                filteredNews?.length || !loaded ? (
                  <Feed next={next} hasMore={hasMore}>
                    {filteredNews?.map((post) => (
                      <ArticleCard
                        key={post.id}
                        idPost={post.id}
                        title={post.title}
                        description={post.context}
                        date={post.createAt}
                        imgUrl={post.imageList}
                        author={post.user.name}
                        avatar={post.user.imageUrl}
                        tags={post.topicTag}
                        hashTags={post.hashTag}
                        disLikeCount={post.dislikeCount}
                        likeCount={post.likeCount}
                        isLike={post.isLike}
                        isDisLike={post.isDislike}
                        commentCount={post.commentCount}
                        isExpert={post.user.isExpert}
                      />
                    ))}
                  </Feed>
                ) : (
                  <Empty />
                )
              }
            </NewsFilter>
          </Row>
        </s.Card>
      </s.TablesWrapper>
      <Modal
        title="Upload Post"
        visible={openPostUpload}
        onCancel={() => setOpenPostUpload(false)}
        footer={[
          <>
            <Button style={{ display: 'inline' }} onClick={() => setOpenPostUpload(false)}>
              {t('common.close')}
            </Button>
          </>,
        ]}
      >
        <ValidationForm getnew={getnew} />
      </Modal>
    </>
  );
};

export default Dashboard;
