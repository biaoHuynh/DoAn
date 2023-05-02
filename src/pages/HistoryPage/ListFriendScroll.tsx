import React, { useEffect, useMemo, useRef, useState } from 'react';

import * as s from '../HistoryPage/Tables.styles';

import { Feed } from '@app/components/common/Feed/Feed';
import { NotFound } from '@app/components/common/NotFound/NotFound';
import { ListFriendItem } from './ListFriendItem';
import { Col, Row, Spin } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';

interface RecentActivityFeedProps {
  activity: any[];
  hasMore: boolean;
  next: () => void;
  unfriend: any;
  addfriend: any;
  acpfriend: any;
  cancelacpfriend: any;
  subexpert: any;
}

const ListFriendScroll: React.FC<RecentActivityFeedProps> = ({
  activity,
  hasMore,
  next,
  unfriend,
  addfriend,
  acpfriend,
  cancelacpfriend,
  subexpert,
}) => {
  const activityItems = useMemo(
    () =>
      activity?.map((item, index) => {
        console.log(activity);
        return (
          <Col className="gutter-row" span={6} xxl={6} xl={8} md={12} xs={24}>
            <ListFriendItem
              key={index}
              {...item}
              unfriend={unfriend}
              addfriend={addfriend}
              acpfriend={acpfriend}
              cancelacpfriend={cancelacpfriend}
              subexpert={subexpert}
            />
          </Col>
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
    <s.FeedWrapper ref={feedRef} id="recent-activity-feed">
      <InfiniteScroll
        dataLength={activityItems.length}
        next={next}
        hasMore={hasMore}
        loader={
          <s.SpinnerWrapper>
            <Spin size="large" />
          </s.SpinnerWrapper>
        }
        style={{ overflow: 'hidden' }}
        scrollableTarget="recent-activity-feed"
      >
        <Row gutter={[16, 24]}>{activityItems}</Row>
      </InfiniteScroll>
    </s.FeedWrapper>
  ) : (
    <NotFound />
  );
};
export default ListFriendScroll;
