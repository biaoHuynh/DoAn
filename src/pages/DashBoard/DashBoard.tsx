import React, { useEffect, useState } from 'react';
import { Button, Col, Row, DatePicker, Space, Empty, Modal, Collapse, Carousel, Rate, Image, Tag } from 'antd';
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
import { Panel } from '@app/components/common/Collapse/Collapse';
import dfavt from '@app/share/dfavt.png';
import { CheckCircleTwoTone } from '@ant-design/icons';

const Dashboard: React.FC = () => {
  const [news, setNews] = useState<any[]>([]);
  const [experts, setExperts] = useState<any[]>([]);
  const [topPost, setTopPost] = useState<any[]>([]);
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
    dbService.getAllTop().then((res: any) => {
      if (res?.data !== null) {
        setTopPost(res.data);
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
            <Col span={10}>
              <Carousel autoplay>
                {experts.map((expert) => {
                  return (
                    <s.ActivityCard bodyStyle={{ padding: '25px  10px' }}>
                      <s.Wrapper>
                        <s.ImgWrapper>
                          <img
                            src={expert.imageUrl ? `http://149.51.37.29:8081/local-store/${expert.imageUrl}` : dfavt}
                            alt={`title ${expert.imageUrl ? expert.imageUrl : 'dfavt'}`}
                            width={150}
                            height={150}
                          />
                        </s.ImgWrapper>

                        <s.InfoWrapper>
                          <s.InfoHeaderWrapper>
                            <s.TitleWrapper>
                              <s.Title level={5}>
                                {expert.name} {expert.isExpert ? <CheckCircleTwoTone /> : null}
                              </s.Title>
                            </s.TitleWrapper>
                            <s.TextCard>{expert.email}</s.TextCard>
                            <s.TextCard>{expert.expertInfo?.jobTitle}</s.TextCard>
                            <s.TextCard>{expert.expertInfo?.specialist}</s.TextCard>
                            <s.TextCard>{expert.expertInfo?.workPlace}</s.TextCard>
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
                    </s.ActivityCard>
                  );
                })}
              </Carousel>
              <Collapse defaultActiveKey={['1']} onChange={onChange}>
                <Panel header="Top bài viết nhiều bình luận nhất" key="1">
                  {topPost?.mostComment?.map((post: any) => {
                    return (
                      <s.ActivityCard bodyStyle={{ padding: '0px  10px' }}>
                        <s.Wrapper>
                          <s.ImgWrapper>
                            {post.imageList?.map((img: string) => (
                              <Image
                                src={`http://149.51.37.29:8081/local-store/${img}`}
                                alt={`title ${img ? img : 'dfavt'}`}
                                width={100}
                                height={100}
                              />
                            ))}
                          </s.ImgWrapper>

                          <s.InfoWrapper>
                            <s.InfoHeaderWrapper>
                              <s.Title2>{post.title}</s.Title2>

                              <s.Description>{post.context}</s.Description>
                              <s.Hashtag>#{post.hashTag}</s.Hashtag>
                            </s.InfoHeaderWrapper>
                          </s.InfoWrapper>
                        </s.Wrapper>
                      </s.ActivityCard>
                    );
                  })}
                </Panel>
                <Panel header="Top bài viết nhiều lượt xem nhất" key="2">
                  {topPost?.mostView?.map((post: any) => {
                    return (
                      <s.ActivityCard bodyStyle={{ padding: '0px  10px' }}>
                        <s.Wrapper>
                          <s.ImgWrapper>
                            {post.imageList?.map((img: string) => (
                              <Image
                                src={`http://149.51.37.29:8081/local-store/${img}`}
                                alt={`title ${img ? img : 'dfavt'}`}
                                width={100}
                                height={100}
                              />
                            ))}
                          </s.ImgWrapper>

                          <s.InfoWrapper>
                            <s.InfoHeaderWrapper>
                              <s.Title2>{post.title}</s.Title2>

                              <s.Description>{post.context}</s.Description>
                              <s.Hashtag>#{post.hashTag}</s.Hashtag>
                            </s.InfoHeaderWrapper>
                          </s.InfoWrapper>
                        </s.Wrapper>
                      </s.ActivityCard>
                    );
                  })}
                </Panel>
                <Panel header="Top bài viết nhiều lượt thích nhất" key="3">
                  {topPost?.mostLike?.map((post: any) => {
                    return (
                      <s.ActivityCard bodyStyle={{ padding: '0px  10px' }}>
                        <s.Wrapper>
                          <s.ImgWrapper>
                            {post.imageList?.map((img: string) => (
                              <Image
                                src={`http://149.51.37.29:8081/local-store/${img}`}
                                alt={`title ${img ? img : 'dfavt'}`}
                                width={100}
                                height={100}
                              />
                            ))}
                          </s.ImgWrapper>

                          <s.InfoWrapper>
                            <s.InfoHeaderWrapper>
                              <s.Title2>{post.title}</s.Title2>

                              <s.Description>{post.context}</s.Description>
                              <s.Hashtag>#{post.hashTag}</s.Hashtag>
                            </s.InfoHeaderWrapper>
                          </s.InfoWrapper>
                        </s.Wrapper>
                      </s.ActivityCard>
                    );
                  })}
                </Panel>
              </Collapse>
            </Col>
            <Col span={14}>
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
