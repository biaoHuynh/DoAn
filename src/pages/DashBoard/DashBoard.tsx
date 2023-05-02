import React, { useEffect, useState } from 'react';
import { Button, Col, Row, DatePicker, Space, Empty, Modal, Collapse, Carousel, Rate } from 'antd';
import { Table } from 'components/common/Table/Table';
import { useTranslation } from 'react-i18next';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import * as S from '@app/pages/uiComponentsPages//UIComponentsPage.styles';
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
import { Card } from 'components/common/Card/Card';
import * as s from './Tables.styles';
import moment from 'moment';

import { ArticleCard } from '@app/components/common/ArticleCard/ArticleCard';
import { NewsFilter } from '@app/components/apps/newsFeed/NewsFilter/NewsFilter';
import { Feed } from '@app/components/common/Feed/Feed';
import { ValidationForm } from '@app/components/forms/ValidationForm/ValidationForm';
import dbService from './DashBoardService';
import { number } from 'echarts';
import { Panel } from '@app/components/common/Collapse/Collapse';
import dfavt from '@app/share/dfavt.png';
import { CheckCircleTwoTone } from '@ant-design/icons';

const Dashboard: React.FC = () => {
  const [news, setNews] = useState<any[]>([]);
  const [experts, setExperts] = useState<any[]>([]);
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
    dbService.getAllExpert().then((res: any) => {
      if (res?.data !== null) {
        setExperts(res.data);
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
  const onChange = (key: string | string[]) => {
    console.log(key);
  };
  const onChangeSlider = (currentSlide: number) => {
    console.log(currentSlide);
  };
  return (
    <>
      <s.TablesWrapper>
        <div
          style={{
            position: 'fixed',
            top: '9rem',
            right: '5rem',

            zIndex: 2,
          }}
        >
          <Button
            style={{ float: 'right', marginBottom: '10px', width: '100px' }}
            onClick={() => setOpenPostUpload(true)}
          >
            Đăng bài
          </Button>
        </div>

        <s.Card title="Trang tin tức" style={{ zIndex: 1 }}>
          <Row style={{ display: 'flex', justifyContent: 'center' }}>
            <Col span={9}>
              <Carousel afterChange={onChangeSlider}>
                {experts.map((expert) => {
                  <s.ActivityCard bodyStyle={{ padding: '25px  10px' }}>
                    <s.Wrapper>
                      <s.ImgWrapper>
                        <img
                          src={expert.imageUrl ? `http://149.51.37.29:8081/local-store/${expert.imageUrl}` : dfavt}
                          alt={`title ${expert.imageUrl ? expert.imageUrl : 'dfavt'}`}
                          width={84}
                          height={84}
                        />
                      </s.ImgWrapper>

                      <s.InfoWrapper>
                        <s.InfoHeaderWrapper>
                          <s.TitleWrapper>
                            <s.Title level={5}>
                              {expert.name} {expert.isExpert ? <CheckCircleTwoTone /> : null}
                            </s.Title>
                          </s.TitleWrapper>
                          <s.TextCard>{expert.email}</s.TextCard>\
                          <span>
                            <Rate disabled style={{ fontSize: '1rem' }} defaultValue={expert.expertInfo.rating} />
                            {expert.expertInfo.ratingCount ? (
                              <span style={{ fontSize: '0.8rem' }} className="ant-rate-text">
                                {expert.expertInfo.ratingCount}
                              </span>
                            ) : (
                              ''
                            )}
                          </span>
                        </s.InfoHeaderWrapper>
                      </s.InfoWrapper>
                    </s.Wrapper>
                  </s.ActivityCard>;
                })}
              </Carousel>
              <Collapse defaultActiveKey={['1']} onChange={onChange}>
                <Panel header="This is panel header 1" key="1">
                  <p>cc</p>
                </Panel>
                <Panel header="This is panel header 2" key="2">
                  <p>cc</p>
                </Panel>
                <Panel header="This is panel header 3" key="3">
                  <p>ccc</p>
                </Panel>
              </Collapse>
            </Col>
            <Col span={15}>
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
            </Col>
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
