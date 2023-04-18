import React, { useState, useEffect } from 'react';
import * as s from './Tables.styles';
import { Button, Col, Row, Space, Tabs } from 'antd';
import { Avatar, Card } from 'antd';
import ProfilePageService from './ProfilePageServicce';
import Post from './PostProfileComponent';
import FriendList from './FriendListProfileComponent';
const { Meta } = Card;
import { useParams } from 'react-router-dom';
const items = [
  { label: 'Post', key: 'post-item', children: 'this is post component' }, // remember to pass the key prop
  { label: 'Profile', key: 'profile-item', children: 'this is profile component' },
];

export class ApiResponseEntity {
  data?: any;
  errorList?: String[];
  status?: Number;
}

export class UserInfo {
  id?: Number;
  name?: String;
  email?: String;
  imageUrl?: String;
  status?: Number;
  isExpert?: Boolean;
  rating?: Number;
  lastTime?: Date;
}

const Profile: React.FC = () => {
  let { id } = useParams();
  const userId = parseInt(id!);
  const [userInfo, setUserInfo] = useState<UserInfo>(new UserInfo());
  const [currentUserInfo] = useState<UserInfo>(JSON.parse(localStorage.getItem('UserData') || ''));
  useEffect(() => {
    const currentUserId = currentUserInfo.id;
    console.log(userId);
    if (currentUserId === userId) {
      setUserInfo(currentUserInfo);
    } else {
      ProfilePageService.findUserById(userId).then((res: ApiResponseEntity) => {
        setUserInfo(res.data);
      });
    }
  }, []);

  return (
    <>
      <div style={{ width: '100%' }}>
        <Card
          bordered={false}
          cover={
            <div
              style={{
                height: 120,
                background: 'linear-gradient(to right, #ffafbd, #ffc3a0)',
                borderRadius: 5,
              }}
            ></div>
          }
          bodyStyle={{ background: 'var(--layout-body-bg-color)' }}
        >
          <Row style={{ width: '100%' }} wrap={false}>
            <Col flex="none">
              <Card.Meta
                style={{ display: 'flex', flexDirection: 'row', marginTop: -60, alignItems: 'center' }}
                avatar={
                  <Avatar
                    size={150}
                    src="https://joesch.moe/api/v1/random"
                    style={{ marginBottom: 20, border: '2px solid' }}
                  />
                }
              />
            </Col>
            <Col flex="auto">
              <Row wrap={false} style={{ height: '100%' }}>
                <Col flex="none">
                  <div style={{ display: 'flex', flexDirection: 'column', padding: 20, fontFamily: 'inherit' }}>
                    <h1>{userInfo.name}</h1>
                  </div>
                </Col>
                <Col flex="auto" style={{ display: 'flex', justifyContent: 'end', alignItems: 'end' }}>
                  <Space wrap>
                    <Button type="primary">Đăng bài</Button>
                    <Button type="dashed">Chỉnh sửa trang cá nhân</Button>
                  </Space>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Bài Đăng" key="1">
            <Post {...userInfo} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Bạn bè" key="2">
            <FriendList />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Thông tin chi tiết" key="3">
            Content of Tab Pane 3
          </Tabs.TabPane>
        </Tabs>
      </div>
    </>
  );
};

export default Profile;
