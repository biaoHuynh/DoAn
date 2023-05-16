import React, { useState, useEffect, useLayoutEffect } from 'react';
import * as s from './Tables.styles';
import { Button, Col, Input, Modal, Rate, Row, Space, Tabs } from 'antd';
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
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { useTranslation } from 'react-i18next';
const items = [
  { label: 'Post', key: 'post-item', children: 'this is post component' }, // remember to pass the key prop
  { label: 'Profile', key: 'profile-item', children: 'this is profile component' },
];

export class ApiResponseEntity {
  data?: any;
  errorList?: string[];
  status?: number;
}

export class UserInfo {
  id?: number;
  name?: string;
  email?: string;
  imageUrl?: string;
  status?: number;
  isExpert?: boolean;
  rating?: number;
  lastTime?: Date;
  expertInfo?: ExpertInfo;
}

export class ExpertInfo {
  jobTitle?: string;
  specialist?: string;
  workPlace?: string;
  rating?: number;
  ratingCount?: number;
}

const Profile: React.FC = () => {
  const { id } = useParams();
  const userId = parseInt(id!);
  const [userInfo, setUserInfo] = useState<UserInfo>(new UserInfo());
  const [isCurrent, setIsCurrent] = useState<boolean>(false);
  const [isExpert, setIsExpert] = useState<boolean>(false);
  const [openUpdateInfor, setOpenUpdateInfor] = useState<boolean>(false);
  const [isOpenRP, setIsOpenRP] = useState<boolean>(false);
  const [reason, setReason] = useState<string>('');
  const { t } = useTranslation();
  const [currentUserInfo] = useState<UserInfo>(JSON.parse(localStorage.getItem('UserData') || ''));
  const [defaultActiveKey, setDefaultActiveKey] = useState('1');
  const [form] = BaseForm.useForm();
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
  const handleReport = () => {
    ProfilePageService.report;
    const currentUserId = currentUserInfo.id;
    if (id) {
      ProfilePageService.report(userId, reason).then((res: ApiResponseEntity) => {
        if (res.status === 1) {
          notificationController.success({
            message: `Báo cáo thành công`,
          });
        }
      });
    } else {
      ProfilePageService.report(currentUserId!, reason).then((res: ApiResponseEntity) => {
        if (res.status === 1) {
          notificationController.success({
            message: `Báo cáo thành công`,
          });
        }
      });
    }
    setIsOpenRP(false);
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
                      <Button type="dashed" onClick={() => setOpenUpdateInfor(true)}>
                        {t('vb.updateinfo')}
                      </Button>
                    </Space>
                  )}
                  {!isCurrent && (
                    <Space wrap>
                      <Button
                        danger
                        type="primary"
                        onClick={() => {
                          setIsOpenRP(true);
                        }}
                      >
                        {t('vb.report')}
                      </Button>
                    </Space>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
        <Tabs activeKey={defaultActiveKey} onChange={onChange}>
          <Tabs.TabPane tab={t('vb.mypost')} key="1">
            <Post {...userInfo} />
          </Tabs.TabPane>
          {isCurrent && (
            <Tabs.TabPane tab={t('vb.friend')} key="2">
              <FriendList />
            </Tabs.TabPane>
          )}
          {isExpert && (
            <Tabs.TabPane tab={t('vb.detailinfo')} key="3">
              <ExpertInfoPage {...userInfo.expertInfo} />
            </Tabs.TabPane>
          )}
        </Tabs>
      </div>
      <Modal
        title={t('vb.updateinfo')}
        visible={openUpdateInfor}
        onCancel={() => setOpenUpdateInfor(false)}
        footer={[
          <>
            <Button style={{ display: 'inline' }} onClick={() => setOpenUpdateInfor(false)}>
              {t('common.close')}
            </Button>
          </>,
        ]}
      >
        <UpdateInfor id={currentUserInfo.id!} isExpert={isExpert} onUpdateSuccess={onUpdateSuccess} />
      </Modal>
      <Modal title={t('vb.report')} visible={isOpenRP} onCancel={() => setIsOpenRP(false)} footer={<div />}>
        <BaseForm form={form} layout="vertical" name="contentForm" onFinish={handleReport}>
          <BaseForm.Item name="name" label={t('vb.resoneReport')} required>
            <Input onChange={(event) => setReason(event.target.value)} required />
          </BaseForm.Item>
          <Button style={{ display: 'inline' }} type="primary" className="btn btn-primary" htmlType="submit" danger>
            {t('vb.report')}
          </Button>
        </BaseForm>
      </Modal>
    </>
  );
};

export default Profile;
