import React, { useEffect, useState } from 'react';
import { Button, Col, Row, DatePicker, Space, Empty } from 'antd';
import { Table } from 'components/common/Table/Table';
import { useTranslation } from 'react-i18next';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import * as S from '@app/pages/uiComponentsPages//UIComponentsPage.styles';
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
import { Card } from 'components/common/Card/Card';
import * as s from './Tables.styles';
import moment from 'moment';
import { ColumnsType } from 'antd/es/table';
import { ArticleCard } from '@app/components/common/ArticleCard/ArticleCard';
import { NewsFilter } from '@app/components/apps/newsFeed/NewsFilter/NewsFilter';
import { Feed } from '@app/components/common/Feed/Feed';
import { ValidationForm } from '@app/components/forms/ValidationForm/ValidationForm';
import dbService from './DashBoardService';

const Dashboard: React.FC = () => {
  const [news, setNews] = useState<any[]>([]);

  const [hasMore] = useState<boolean>(true);
  const [loaded, setLoaded] = useState<boolean>(false);
  const { t } = useTranslation();

  const getAllData = () => {
    setLoaded(true);
    dbService.get10Post().then((data: any) => {
      setNews((oldNews) => [...oldNews, ...data.data]);
      setLoaded(false);
    });
  };
  useEffect(() => {
    setLoaded(true);
    dbService.get10Post().then((data: any) => {
      setNews((oldNews) => [...oldNews, ...data.data]);
      setLoaded(false);
    });
  }, []);
  const getnew = () => {
    setLoaded(true);
    dbService.get10Post().then((data: any) => {
      setNews(data.data);
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
            <ValidationForm getnew={getnew} />
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
                        title={post.title}
                        description={post.context}
                        date={post.createAt}
                        imgUrl={post.imageList}
                        author={post.user.name}
                        avatar={post.user.imageUrl}
                        tags={post.topicTag}
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
    </>
  );
};

export default Dashboard;
