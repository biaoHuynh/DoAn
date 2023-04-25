import React, { useEffect, useState } from 'react';
import ProfilePageService from './ProfilePageServicce';
import { Button, Card, Col, Empty, Row, Space, Tabs } from 'antd';

import { UserInfo } from './ProfilePage';
import { NewsFilter } from '@app/components/apps/newsFeed/NewsFilter/NewsFilter';
import { ArticleCard } from '@app/components/common/ArticleCard/ArticleCard';
import { Feed } from '@app/components/common/Feed/Feed';
import profileService from './ProfileService';
import * as s from './Tables.styles';

const Post: React.FC<UserInfo> = ({ id, name, email, imageUrl, status, isExpert, rating, lastTime }: UserInfo) => {
  const [post, setPost] = useState([]);
  const [news, setNews] = useState<any[]>([]);

  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [nextOffset, setNextOffset] = useState<number>(0);

  useEffect(() => {
    if (id) {
      console.log(id);
      ProfilePageService.getAllPost(id, 0).then((res: any) => {
        setPost(res.data);
      });
    }
    console.log(id);
  }, [id]);
  const getAllData = () => {
    setLoaded(true);
    profileService.get10Post(nextOffset).then((data: any) => {
      if (data.data.length === 0) {
        setHasMore(false);
      } else {
        setHasMore(true);
        setNews((oldNews) => [...oldNews, ...data.data]);
        setLoaded(false);
        setNextOffset([...news, ...data.data].length);
      }
    });
  };
  useEffect(() => {
    setLoaded(true);
    profileService.get10Post(nextOffset).then((data: any) => {
      setNews((oldNews) => [...oldNews, ...data.data]);
      setLoaded(false);
      setNextOffset([...news, ...data.data].length);
    });
  }, []);
  const getnew = () => {
    setLoaded(true);
    profileService.get10Post(0).then((data: any) => {
      if (data !== null) {
        setNews((oldNews) => [...oldNews, ...data.data]);
      }
      setLoaded(false);
      setNextOffset(0);
    });
  };
  const next = () => {
    getAllData();
  };

  return (
    <>
      <s.Card title="Trang của tôi">
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
                      hashTags={post.hashTag}
                      disLikeCount={post.disLikeCount}
                      likeCount={post.likeCount}
                      shareCount={post.shareCount}
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
    </>
  );
};

export default Post;
