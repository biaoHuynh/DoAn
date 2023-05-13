import React, { useEffect, useState } from 'react';
import { BellOutlined } from '@ant-design/icons';
import { Dropdown } from '@app/components/common/Dropdown/Dropdown';
import { Button } from '@app/components/common/buttons/Button/Button';
import { Badge } from '@app/components/common/Badge/Badge';
import { NotificationsOverlay } from '@app/components/header/components/notificationsDropdown/NotificationsOverlay/NotificationsOverlay';
import { notifications as fetchedNotifications, Notification } from '@app/api/notifications.api';
import { HeaderActionWrapper } from '@app/components/header/Header.styles';
import notificationsService from './NotificationsService';
import DefaultAvatar from '@app/assets/DefaultAvatar.png';
import { useSubscription } from 'react-stomp-hooks';
import { useTranslation } from 'react-i18next';
export const NotificationsDropdown: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpened, setOpened] = useState(false);
  const UserDataNew = localStorage.getItem('UserData');
  const [userInfo, setUserInfo] = useState(UserDataNew ? JSON.parse(UserDataNew)?.topicId : '');
  const { t } = useTranslation();
  useEffect(() => {
    const UserData = localStorage.getItem('UserData');
    const UserInfo = JSON.parse(UserData);
    setUserInfo(UserInfo?.topicId);
  }, []);

  useSubscription(`/topic/user/${userInfo}`, (message: any) => {
    console.log(message);
    const body = JSON.parse(message.body);
    const actionSender = JSON.parse(body.value);
    const senderInfo = JSON.parse(actionSender.user);
    let action = '';
    switch (actionSender.action) {
      case 'post-like':
        action = 'vb.likepost';
        break;
      case 'post-comment':
        action = 'vb.cmtpost';
        break;
      case 'request-friend':
        action = 'vb.sendfrreq';
        break;
      case 'accept-friend':
        action = 'vb.acptfrreq';
        break;
      case 'subscriber':
        action = 'vb.subex';
        break;
      case 'post-new':
        action = 'vb.newpost';
        break;
      default:
        break;
    }
    if (actionSender.action !== 'new-message') {
      setNotifications([
        ...notifications,
        {
          id: body.id,
          description: action,
          userName: senderInfo.name,
          name: 'mention',
          userIcon: senderInfo.imageUrl ? `http://149.51.37.29:8081/local-store/${senderInfo.imageUrl}` : DefaultAvatar,
          status: body.status,
          param: body.param,
          typePost: body.type,
        },
      ]);
    }
  });

  useEffect(() => {
    notificationsService.getNotifiCations().then((data: any) => {
      if (data.data) {
        const noti = data.data?.map((noti: any) => {
          const value = JSON.parse(noti.value);
          const userInfo = JSON.parse(value.user);
          let action = '';
          switch (value.action) {
            case 'post-like':
              action = 'vb.likepost';
              break;
            case 'post-comment':
              action = 'vb.cmtpost';
              break;
            case 'request-friend':
              action = 'vb.sendfrreq';
              break;
            case 'accept-friend':
              action = 'vb.acptfrreq';
              break;
            case 'subscriber':
              action = 'vb.subex';
              break;
            case 'post-new':
              action = 'vb.newpost';
              break;
            default:
              break;
          }
          return {
            id: noti.id,
            description: action,
            userName: userInfo.name,
            name: 'mention',
            userIcon: userInfo.imageUrl ? `http://149.51.37.29:8081/local-store/${userInfo.imageUrl}` : DefaultAvatar,
            status: noti.status,
            param: noti.param,
            typePost: noti.type,
          };
        });
        setNotifications(noti);
      }
    });
  }, []);

  return (
    <Dropdown
      trigger={['click']}
      overlay={<NotificationsOverlay notifications={notifications} setNotifications={setNotifications} />}
      onVisibleChange={setOpened}
      placement="bottomLeft"
    >
      <HeaderActionWrapper>
        <Button
          type={isOpened ? 'ghost' : 'text'}
          icon={
            <Badge count={notifications.length}>
              <BellOutlined />
            </Badge>
          }
        />
      </HeaderActionWrapper>
    </Dropdown>
  );
};
