import React, { useEffect, useState } from 'react';
import ProfilePageService from './ProfilePageServicce';
import { Avatar, Button, Card, Col, Divider, Row, Space, Tabs } from 'antd';
import Friend from './FriendProfileComponen';
import * as s from './Tables.styles';
import RecentActivityFeed from './RecentActivityFeed';
import profilePageService from './ProfilePageServicce';
import { notificationController } from '@app/controllers/notificationController';
import { Text } from '@app/components/layouts/AuthLayout/AuthLayout.styles';
import { Title } from '../DashBoard/Tables.styles';
import { useTranslation } from 'react-i18next';

const FriendList: React.FC = () => {
  const [friendList, setFriendList] = useState([]);
  const [friendListRequest, setFriendListRequest] = useState<any[]>([]);
  const [activity, setActivity] = useState<any[]>([]);
  const [filteredActivity, setFilteredActivity] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const { t } = useTranslation();
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
      ProfilePageService.getListRequest().then((res: any) => {
        setFriendListRequest(res.data.Reciver);
      });
    });
  }, []);
  const unfriendById = (id: number) => {
    ProfilePageService.updateFriend(id, 'unfriend').then((res) => {
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
  const acpfriendById = (id: number) => {
    ProfilePageService.updateFriend(id, 'friend').then((res) => {
      if (res.data) {
        setTimeout(() => {
          notificationController.success({ message: 'Add friend success' });
          ProfilePageService.getListRequest().then((res) => {
            console.log(res.data);
            setHasMore(false);
            setFriendListRequest(res.data.Reciver);
          });
        }, 1000);
      }
    });
  };
  const cancelAcpfriendById = (id: number) => {
    ProfilePageService.updateFriend(id, 'unfriend').then((res) => {
      if (res.data) {
        setTimeout(() => {
          notificationController.success({ message: 'Unfriend success' });
          ProfilePageService.getListRequest().then((res) => {
            console.log(res.data);
            setHasMore(false);
            setFriendListRequest(res.data.Reciver);
          });
        }, 1000);
      }
    });
  };
  return (
    <s.Card>
      <Row style={{ width: '100%', display: 'flex', justifyContent: 'space-around' }}>
        <Col span={8}>
          <Title level={3}>{t('vb.friendList')}</Title>
          <RecentActivityFeed
            unfriend={unfriendById}
            activity={activity}
            hasMore={hasMore}
            next={next}
            acpfriend={acpfriendById}
            cancelacpfriend={cancelAcpfriendById}
          />
        </Col>
        <Col span={8}>
          <Title level={3}>{t('vb.friendListReq')}</Title>
          <RecentActivityFeed
            unfriend={unfriendById}
            activity={friendListRequest}
            hasMore={hasMore}
            next={next}
            acpfriend={acpfriendById}
            cancelacpfriend={cancelAcpfriendById}
          />
        </Col>
      </Row>
    </s.Card>
  );
};

export default FriendList;
