import React, { useEffect, useState } from 'react';
import { Button, Col, Row, DatePicker, Space, Empty, Modal, Collapse, Carousel, Rate, Image, Tag } from 'antd';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { Panel } from '@app/components/common/Collapse/Collapse';
import dfavt from '@app/share/dfavt.png';
import ConfigSetting from './ListFriendPageService';
import * as s from './Tables.styles';

import logoDark from 'assets/logo-dark.png';

import AnoScroll from './AnoScroll';
import { CheckCircleTwoTone } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const AnoPage: React.FC = () => {
  const [contacts, setContacts] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);

  const [experts, setExperts] = useState<any[]>([]);
  const [topPost, setTopPost] = useState<any[]>([]);
  const [mostComment, setMostComment] = useState<any[]>([]);
  const [mostView, setMostView] = useState<any[]>([]);
  const [mostLike, setMostLike] = useState<any[]>([]);

  useEffect(() => {
    ConfigSetting.get10Post().then((data: any) => {
      if (data !== null) {
        setContacts(data.data);
      }
    });
    ConfigSetting.getAllExpert().then((res: any) => {
      if (res?.data?.length > 0) {
        setExperts(res.data);
      }
    });
    ConfigSetting.getAllTop().then((res: any) => {
      if (res?.data !== null) {
        setTopPost(res.data);
        setMostComment(res.data?.mostComment);
        setMostView(res.data?.mostView);
        setMostLike(res.data?.mostLike);
      }
    });
  }, []);
  const next = () => {
    console.log(123);
  };

  return (
    <>
      <PageTitle>VBBC-Page</PageTitle>
      <Row
        align="middle"
        justify="space-between"
        style={{
          background: 'linear-gradient(90deg, rgba(2,81,153,1) 0%, rgba(0,108,207,1) 100%)',
        }}
      >
        <s.SiderLogoLink to="/auth/login" style={{ margin: '1%' }}>
          <img src={logoDark} alt="VBKidsCare" width={48} height={48} />
          <s.BrandSpan>VB Kids Care</s.BrandSpan>
        </s.SiderLogoLink>
        <Button style={{ margin: '1%' }}>
          <Link to="/auth/login">Login</Link>
        </Button>
      </Row>
      <s.Card bodyStyle={{ height: '60.3rem', padding: '20px 60px' }}>
        <Row justify="end">
          <Col span={9}>
            <Carousel autoplay>
              {experts?.map((expert) => {
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
            <Collapse defaultActiveKey={['1']}>
              <Panel header="Top bài viết nhiều bình luận nhất" key="1">
                {mostComment?.map((post: any) => {
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
                {mostView?.map((post: any) => {
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
                              preview={false}
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
                {mostLike?.map((post: any) => {
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
          <Col span={14} style={{ height: '60.3rem', display: 'flex', justifyContent: 'center' }}>
            <AnoScroll activity={contacts} hasMore={hasMore} next={next} />
          </Col>
        </Row>
      </s.Card>
    </>
  );
};

export default AnoPage;
