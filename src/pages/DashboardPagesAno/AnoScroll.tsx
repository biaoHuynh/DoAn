import React, { useEffect, useMemo, useRef } from 'react';

import * as S from './Detail.styles';
import { NotFound } from '@app/components/common/NotFound/NotFound';

import { Spin, Image, Avatar } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Tag } from '@app/components/common/Tag/Tag';
import { CheckCircleTwoTone } from '@ant-design/icons';
import moment from 'moment';
import dfavt from '@app/share/dfavt.png';
interface RecentActivityFeedProps {
  activity: any[];
  hasMore: boolean;
  next: () => void;
}

const AnoScroll: React.FC<RecentActivityFeedProps> = ({ activity, hasMore, next }) => {
  const activityItems = useMemo(
    () =>
      activity?.map((item, index) => {
        console.log(activity);
        return (
          <S.Wrapper className={'article-card'} style={{ marginBottom: '2%' }} key={index}>
            <S.Header>
              <S.InfoAvt>
                <Avatar
                  src={item?.user?.imageUrl ? `http://149.51.37.29:8081/local-store/${item?.user?.imageUrl}` : dfavt}
                  alt="author"
                  size={43}
                />{' '}
                <S.UserName>
                  {item?.user?.name} {item?.user?.isExpert ? <CheckCircleTwoTone /> : null}
                </S.UserName>
              </S.InfoAvt>
              <S.InfoHeader>
                <S.Description>{moment(new Date(item?.createAt)).locale('vi').format('lll')}</S.Description>
              </S.InfoHeader>
            </S.Header>
            <S.InfoWrapper>
              <S.Title>{item?.title}</S.Title>
              {!!item.topicTag && (
                <S.TagsWrapper>
                  <Tag key={item.topicTag.id} title={item.topicTag.tagName} bgColor={item.topicTag.color} />
                </S.TagsWrapper>
              )}
              <S.Description>{item.context}</S.Description>
              <S.Hashtag>#{item.hashTag}</S.Hashtag>
            </S.InfoWrapper>

            <S.ImageWrap>
              {item.imageList?.map((img: string) => (
                <Image
                  src={`http://149.51.37.29:8081/local-store/${img}`}
                  key={`${img}123`}
                  alt="article"
                  preview={false}
                  style={{ objectFit: 'contain', width: '99%' }}
                />
              ))}
            </S.ImageWrap>
          </S.Wrapper>
        );
      }),
    [activity],
  );

  const feedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // if (activity.length < 4) {
    //   feedRef.current?.dispatchEvent(new CustomEvent('scroll'));
    // }
    console.log(activity);
  }, [activity]);

  return activityItems.length > 0 ? (
    <S.FeedWrapper ref={feedRef} id="recent-activity-feed">
      <InfiniteScroll
        dataLength={activityItems.length}
        next={next}
        hasMore={hasMore}
        loader={
          <S.SpinnerWrapper>
            <Spin size="large" />
          </S.SpinnerWrapper>
        }
        style={{ overflow: 'hidden' }}
        scrollableTarget="recent-activity-feed"
      >
        {activityItems}
      </InfiniteScroll>
    </S.FeedWrapper>
  ) : (
    <NotFound />
  );
};
export default AnoScroll;
