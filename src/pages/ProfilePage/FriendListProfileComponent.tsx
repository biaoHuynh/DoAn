import React, { useEffect, useState } from 'react';
import ProfilePageService from './ProfilePageServicce';
import { Avatar, Button, Card, Col, Divider, Row, Space, Tabs } from 'antd';
import Friend from './FriendProfileComponen';
import * as s from './Tables.styles';
import RecentActivityFeed from './RecentActivityFeed';
import profilePageService from './ProfilePageServicce';
import { notificationController } from '@app/controllers/notificationController';

const FriendList: React.FC = () => {
  const [friendList, setFriendList] = useState([]);
  const [activity, setActivity] = useState<any[]>([]);
  const [filteredActivity, setFilteredActivity] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const [filters, setFilters] = useState<any>({
    status: [],
  });

  useEffect(() => {
    profilePageService.getListFriend().then((res) => {
      console.log(res.data);
      setHasMore(false);
      setActivity(res.data);
    });
  }, []);

  const next = () => {
    profilePageService.getListFriend().then((newActivity: any) => setActivity(activity.concat(newActivity)));
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
  const unfriendById = (id: number) => {
    ProfilePageService.unFriend(id, 'unfriend').then((res) => {
      if (res.data) {
        setTimeout(() => {
          notificationController.success({ message: 'Unfriend success' });
          ProfilePageService.getListFriend().then((res) => {
            console.log(res.data);
            setHasMore(false);
            setActivity(res.data);
          });
        }, 1000);
      }
    });
  };
  return (
    <s.Card title="List Friend">
      <Row style={{ width: '100%' }}>
        <RecentActivityFeed unfriend={unfriendById} activity={activity} hasMore={hasMore} next={next} />
      </Row>
    </s.Card>
  );
};

export default FriendList;
