import React, { useEffect, useState } from 'react';
import { DesktopHeader } from './layouts/DesktopHeader';
import { MobileHeader } from './layouts/MobileHeader';
import { useResponsive } from '@app/hooks/useResponsive';
import { useSubscription } from 'react-stomp-hooks';
import { notificationController } from '@app/controllers/notificationController';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  useSubscription(`/topic/user/${userInfo}`, (message: any) => {
    console.log(message);
    const body = JSON.parse(message.body);
    const actionSender = JSON.parse(body.value);
    const senderInfo = JSON.parse(actionSender.user);
    let action = '';
    switch (actionSender.action) {
      case 'post-like':
        action = `${t('vb.likepost')}`;
        break;
      case 'post-comment':
        action = `${t('vb.cmtpost')}`;
        break;
      case 'request-friend':
        action = `${t('vb.sendfrreq')}`;
        break;
      case 'accept-friend':
        action = `${t('vb.acptfrreq')}`;
        break;
      case 'subscriber':
        action = `${t('vb.subex')}`;
        break;
      case 'post-new':
        action = `${t('vb.newpost')}`;
        break;
      case 'new-chat':
        action = `${t('vb.newchat')}`;
        break;
      default:
        break;
    }

    notificationController.success({
      message: `${senderInfo.name} ${t('vb.had')} ${action}`,
    });
  });
  return isTablet ? (
    <DesktopHeader isTwoColumnsLayout={isTwoColumnsLayout} />
  ) : (
    <MobileHeader toggleSider={toggleSider} isSiderOpened={isSiderOpened} />
  );
};
