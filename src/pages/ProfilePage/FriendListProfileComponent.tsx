import React, { useEffect, useState } from 'react';
import ProfilePageService from './ProfilePageServicce';
import { Avatar, Button, Card, Col, Divider, Row, Space, Tabs } from 'antd';
import Friend from './FriendProfileComponen';

const FriendList: React.FC = () => {
  const [friendList, setFriendList] = useState([]);

  useEffect(() => {
    ProfilePageService.getListFriend().then((res: any) => {
      setFriendList(res.data);
    });
  }, []);

  return (
    <>
      <Row gutter={[16, 16]}></Row>
    </>
  );
};

export default FriendList;
