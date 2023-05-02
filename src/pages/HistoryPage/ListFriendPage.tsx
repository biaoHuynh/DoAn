import React, { useEffect, useState } from 'react';
import { Button, Col, Row, DatePicker, Space, Input } from 'antd';

const { Search } = Input;

import { Table } from 'components/common/Table/Table';
import { Line } from '@ant-design/plots';
import { useTranslation } from 'react-i18next';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';

import ConfigSetting from './ListFriendPageService';
import * as s from './Tables.styles';

import { notificationController } from '@app/controllers/notificationController';
import ListFriendScroll from './ListFriendScroll';
import listContactService from './ListFriendPageService';
import AudioOutlined from '@ant-design/icons/lib/icons/AudioOutlined';
import { useSubscription } from 'react-stomp-hooks';

const ListFriendPage: React.FC = () => {
  const [contacts, setContacts] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [filteredActivity, setFilteredActivity] = useState<any[]>([]);
  const [filters, setFilters] = useState<any>({
    status: [],
  });
  const [keyword, setKeyWord] = useState<string>('');
  const UserDataNew = localStorage.getItem('UserData');
  const [userInfo, setUserInfo] = useState(UserDataNew ? JSON.parse(UserDataNew)?.topicId : '');
  useEffect(() => {
    if (filters.status.length > 0) {
      setFilteredActivity(contacts.filter((item) => filters.status.some((filter: any) => filter === item.status)));
    } else {
      setFilteredActivity(contacts);
    }
  }, [filters.status]);

  const getAllData = () => {
    setLoaded(true);
    ConfigSetting.getListContact(contacts.length, keyword).then((data: any) => {
      if (data?.data?.length === 0) {
        setHasMore(false);
      } else {
        setHasMore(true);
        if (data !== null) {
          setContacts((oldNews) => [...oldNews, ...data.data]);
          setLoaded(false);
        }
      }
    });
  };
  const RegetAllData = () => {
    setLoaded(true);
    ConfigSetting.getListContact(contacts.length, keyword).then((data: any) => {
      if (data?.data?.length === 0) {
        setHasMore(false);
      } else {
        setHasMore(true);
        if (data !== null) {
          setContacts(data.data);
          setLoaded(false);
        }
      }
    });
  };
  useEffect(() => {
    setLoaded(true);
    ConfigSetting.getListContact(contacts.length, keyword).then((res: any) => {
      if (res.data !== null) {
        setHasMore(false);
        setContacts(res.data);
      }
    });
    setLoaded(false);
  }, []);

  const next = () => {
    getAllData();
  };
  const unfriend = (id: number) => {
    listContactService.updateFriend(id, 'unfriend').then((res: any) => {
      if (res.status) {
        RegetAllData();
      }
    });
  };

  const addfriend = (id: number) => {
    listContactService.addFriend(id, 'request').then((res: any) => {
      if (res.status) {
        RegetAllData();
      }
    });
  };
  const acpfriend = (id: number) => {
    listContactService.updateFriend(id, 'friend').then((res: any) => {
      if (res.status) {
        RegetAllData();
      }
    });
  };
  const cancelacpfriend = (id: number) => {
    listContactService.updateFriend(id, 'unfriend').then((res: any) => {
      if (res.status) {
        RegetAllData();
      }
    });
  };
  const subexpert = (id: number) => {
    listContactService.subunsub(id).then((res: any) => {
      if (res.status) {
        RegetAllData();
      }
    });
  };

  const onSearch = (value: string) => {
    setKeyWord(value.trim());
    setLoaded(true);
    ConfigSetting.getListContact(contacts.length, value.trim()).then((res: any) => {
      if (res.data !== null) {
        setHasMore(false);
        setContacts(res.data);
      }
    });
    setLoaded(false);
  };

  useEffect(() => {
    const UserData = localStorage.getItem('UserData');
    const UserInfo = JSON.parse(UserData);
    setUserInfo(UserInfo?.topicId);
  }, [localStorage.getItem('UserData')]);

  useSubscription(`/topic/user/${userInfo}`, (message: any) => {
    console.log(message);
    const body = JSON.parse(message.body);
    const actionSender = JSON.parse(body.value);

    let action = false;
    switch (actionSender.action) {
      case 'request-friend':
        action = true;
        break;
      case 'accept-friend':
        action = true;
        break;
      case 'subscriber':
        action = true;
        break;
      default:
        break;
    }

    if (action) {
      RegetAllData();
    }
  });
  return (
    <>
      <PageTitle>Cộng đồng</PageTitle>

      <s.Card title="Cộng đồng" bodyStyle={{ height: '48rem', padding: '20px 60px' }}>
        <Search style={{ width: '30%' }} placeholder="Tìm kiếm người dùng" enterButton onSearch={onSearch} />
        <ListFriendScroll
          activity={contacts}
          hasMore={hasMore}
          next={next}
          unfriend={unfriend}
          addfriend={addfriend}
          acpfriend={acpfriend}
          cancelacpfriend={cancelacpfriend}
          subexpert={subexpert}
        />
      </s.Card>
    </>
  );
};

export default ListFriendPage;
