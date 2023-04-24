import React, { useEffect, useState } from 'react';
import ProfilePageService from './ProfilePageServicce';
import { Avatar, Button, Card, Col, Divider, Row, Space, Tabs } from 'antd';
import Friend from './FriendProfileComponen';
import * as s from './Tables.styles';
import RecentActivityFeed from '../HistoryPage/RecentActivityFeed';
import ConfigSetting from '@app/pages/HistoryPage/ListFriendPageService';

const FriendList: React.FC = () => {
  const [friendList, setFriendList] = useState([]);
  const [activity, setActivity] = useState<any[]>([]);
  const [filteredActivity, setFilteredActivity] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const [filters, setFilters] = useState<any>({
    status: [],
  });

  useEffect(() => {
    ConfigSetting.getListFriends().then((res) => {
      console.log(res.data);
      setHasMore(false);
      setActivity(res.data);
    });
  }, []);

  const next = () => {
    ConfigSetting.getListFriends().then((newActivity: any) => setActivity(activity.concat(newActivity)));
  };

  useEffect(() => {
    if (filters.status.length > 0) {
      setFilteredActivity(activity.filter((item) => filters.status.some((filter: any) => filter === item.status)));
    } else {
      setFilteredActivity(activity);
    }
  }, [filters.status]);

  useEffect(() => {
    ProfilePageService.getListFriend().then((res: any) => {
      setFriendList(res.data);
    });
  }, []);

  return (
    <s.Card title="List Friend">
      <Row style={{ width: '100%' }}>
        <RecentActivityFeed activity={activity} hasMore={hasMore} next={next} />
      </Row>
    </s.Card>
  );
};

export default FriendList;
