import React, { useEffect, useState } from 'react';
import { DesktopHeader } from './layouts/DesktopHeader';
import { MobileHeader } from './layouts/MobileHeader';
import { useResponsive } from '@app/hooks/useResponsive';
import { useSubscription } from 'react-stomp-hooks';
import { notificationController } from '@app/controllers/notificationController';

interface HeaderProps {
  toggleSider: () => void;
  isSiderOpened: boolean;
  isTwoColumnsLayout: boolean;
}

export const Header: React.FC<HeaderProps> = ({ toggleSider, isSiderOpened, isTwoColumnsLayout }) => {
  const { isTablet } = useResponsive();
  const UserDataNew = localStorage.getItem('UserData');
  const [userInfo, setUserInfo] = useState(UserDataNew ? JSON.parse(UserDataNew)?.topicId : '');
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
        action = 'thích bài viết';
        break;
      case 'post-comment':
        action = 'bình luận bài viết';
        break;
      case 'request-friend':
        action = 'gửi lời mời kết bạn';
        break;
      case 'accept-friend':
        action = 'chấp nhận lời mời kết bạn';
        break;
      case 'subscriber':
        action = 'đăng ký';
        break;
      case 'new-message':
        action = 'gửi tin nhắn';
        break;
      default:
        break;
    }

    notificationController.success({
      message: `${senderInfo.name} đã ${action} của bạn ${body.user.name}`,
    });
  });
  return isTablet ? (
    <DesktopHeader isTwoColumnsLayout={isTwoColumnsLayout} />
  ) : (
    <MobileHeader toggleSider={toggleSider} isSiderOpened={isSiderOpened} />
  );
};
