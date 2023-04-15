import React, { useEffect, useMemo, useRef, useState } from 'react';

import * as s from './Tables.styles';

import { Feed } from '@app/components/common/Feed/Feed';
import { NotFound } from '@app/components/common/NotFound/NotFound';
import { RecentActivityItem } from './RecentActivityItem/RecentActivityItem';

interface RecentActivityFeedProps {
  activity: any[];
  hasMore: boolean;
  next: () => void;
}

const RecentActivityFeed: React.FC<RecentActivityFeedProps> = ({ activity, hasMore, next }) => {
  const activityItems = useMemo(
    () =>
      activity.map((item, index) => (
        <RecentActivityItem key={index} {...item.userFriend} topicContactId={item.topicContactId} />
      )),
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
      <Feed hasMore={hasMore} next={next} target="recent-activity-feed">
        {activityItems}
      </Feed>
    </s.FeedWrapper>
  ) : (
    <NotFound />
  );
};
export default RecentActivityFeed;
