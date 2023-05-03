import React, { useState, useEffect, useLayoutEffect } from 'react';
import * as s from './Tables.styles';
import { Button, Col, Modal, Rate, Row, Space, Tabs } from 'antd';
import { Avatar, Card } from 'antd';
import ProfilePageService from './ProfilePageServicce';
import Post from './PostProfileComponent';
import FriendList from './FriendListProfileComponent';
import dfavt from '@app/assets/DefaultAvatar.png';
const { Meta } = Card;
import { useParams } from 'react-router-dom';
import ExpertInfoPage from './ExpertInfo';
import profilePageService from './ProfilePageServicce';
import { notificationController } from '@app/controllers/notificationController';
import { ValidationForm } from '@app/components/forms/ValidationForm/ValidationForm';
import { UpdateInfor } from '@app/components/forms/ValidationForm/UpdateInfor';
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
  expertInfo?: ExpertInfo;
}

export class ExpertInfo {
  jobTitle?: String;
  specialist?: String;
  workPlace?: String;
  rating?: number;
  ratingCount?: number;
}

const Profile: React.FC = () => {
  let { id } = useParams();
  const userId = parseInt(id!);
  const [userInfo, setUserInfo] = useState<UserInfo>(new UserInfo());
  const [isCurrent, setIsCurrent] = useState<Boolean>(false);
  const [isExpert, setIsExpert] = useState<Boolean>(false);
  const [openUpdateInfor, setOpenUpdateInfor] = useState<Boolean>(false);

  const [currentUserInfo] = useState<UserInfo>(JSON.parse(localStorage.getItem('UserData') || ''));
  const [defaultActiveKey, setDefaultActiveKey] = useState('1');

  useEffect(() => {
    const currentUserId = currentUserInfo.id;
    if (id) {
      setIsCurrent(false);
      ProfilePageService.findUserById(userId).then((res: ApiResponseEntity) => {
        setUserInfo(res.data);
      });
    } else {
      setIsCurrent(true);
      ProfilePageService.findUserById(currentUserId!).then((res: ApiResponseEntity) => {
        setUserInfo(res.data);
      });
    }
  }, []);

  useEffect(() => {
    setIsExpert(userInfo.isExpert!);
    if (userInfo.isExpert!) {
      setDefaultActiveKey('3');
    }
  }, [userInfo]);
  const onChange = (key: string) => {
    setDefaultActiveKey(key);
  };
  const onUpdateSuccess = (key: boolean) => {
    const currentUserId = currentUserInfo.id;
    if (key) {
      setIsCurrent(true);
      ProfilePageService.findUserById(currentUserId!).then((res: ApiResponseEntity) => {
        setUserInfo(res.data);
        setOpenUpdateInfor(false);
      });
    }
  };
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
                    src={userInfo?.imageUrl ? `http://149.51.37.29:8081/local-store/${userInfo?.imageUrl}` : dfavt}
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
                {isExpert ? (
                  <Col flex="none">
                    <span style={{ display: 'flex', flexDirection: 'row', padding: 15, fontFamily: 'inherit' }}>
                      <Rate
                        disabled={isCurrent}
                        onChange={(event) =>
                          profilePageService
                            .rating({ expertId: userId, rate: event })
                            .then((res: ApiResponseEntity) => {
                              if (res.status === 1) {
                                notificationController.success({
                                  message: `Đánh giá thành công`,
                                });
                                if (id) {
                                  setIsCurrent(false);
                                  ProfilePageService.findUserById(userId).then((res: ApiResponseEntity) => {
                                    setUserInfo(res.data);
                                  });
                                } else {
                                  setIsCurrent(true);
                                  ProfilePageService.findUserById(currentUserInfo.id!).then(
                                    (res: ApiResponseEntity) => {
                                      setUserInfo(res.data);
                                    },
                                  );
                                }
                              }
                            })
                        }
                        style={{ fontSize: '1.5rem' }}
                        defaultValue={userInfo?.expertInfo?.rating}
                      />
                      {userInfo?.expertInfo?.ratingCount ? (
                        <span style={{ fontSize: '1.5rem' }} className="ant-rate-text">
                          {userInfo?.expertInfo?.ratingCount}
                        </span>
                      ) : (
                        ''
                      )}
                    </span>
                  </Col>
                ) : null}
                <Col flex="auto" style={{ display: 'flex', justifyContent: 'end', alignItems: 'end' }}>
                  {isCurrent && (
                    <Space wrap>
                      <Button type="primary">Đăng bài</Button>
                      <Button type="dashed" onClick={() => setOpenUpdateInfor(true)}>
                        Chỉnh sửa trang cá nhân
                      </Button>
                    </Space>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
        <Tabs activeKey={defaultActiveKey} onChange={onChange}>
          <Tabs.TabPane tab="Bài Đăng" key="1">
            <Post {...userInfo} />
          </Tabs.TabPane>
          {isCurrent && (
            <Tabs.TabPane tab="Bạn bè" key="2">
              <FriendList />
            </Tabs.TabPane>
          )}
          {isExpert && (
            <Tabs.TabPane tab="Thông tin chi tiết" key="3">
              <ExpertInfoPage {...userInfo.expertInfo} />
            </Tabs.TabPane>
          )}
        </Tabs>
      </div>
      <Modal
        title="Cập nhập thông tin"
        visible={openUpdateInfor}
        onCancel={() => setOpenUpdateInfor(false)}
        footer={[
          <>
            <Button style={{ display: 'inline' }} onClick={() => setOpenUpdateInfor(false)}>
              Đóng
            </Button>
          </>,
        ]}
      >
        <UpdateInfor id={currentUserInfo.id!} isExpert={isExpert} onUpdateSuccess={onUpdateSuccess} />
      </Modal>
    </>
  );
};

export default Profile;
