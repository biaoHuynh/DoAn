import React, { useEffect, useState } from 'react';
import { ConfigProvider } from 'antd';
import viVN from 'antd/lib/locale/vi_VN';
import enUS from 'antd/lib/locale/en_US';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { StompSessionProvider, useSubscription } from 'react-stomp-hooks';
import GlobalStyle from './styles/GlobalStyle';
import 'typeface-montserrat';
import 'typeface-lato';
import { AppRouter } from './components/router/AppRouter';
import { useLanguage } from './hooks/useLanguage';
import { useAutoNightMode } from './hooks/useAutoNightMode';
import { usePWA } from './hooks/usePWA';
import { useThemeWatcher } from './hooks/useThemeWatcher';
import { useAppSelector } from './hooks/reduxHooks';
import { themeObject } from './styles/themes/themeVariables';
import { notificationController } from '@app/controllers/notificationController';
import { setUser } from './store/slices/userSlice';
const App: React.FC = () => {
  const { language } = useLanguage();
  const theme = useAppSelector((state) => state.theme.theme);

  const [accessToken, setAccessToken] = useState('');
  const [userInfo, setUserInfo] = useState('');

  usePWA();

  useAutoNightMode();

  useThemeWatcher();
  useEffect(() => {
    const UserData = localStorage.getItem('UserData');
    const UserInfo = JSON.parse(UserData);
    const AccessToken = localStorage.getItem('AccessToken');

    if (UserInfo && AccessToken) {
      setUserInfo(UserInfo?.id.toString());
      setAccessToken(AccessToken);
    }

    // if (AccessToken && userInfo) {
    //   const socket = new SockJS('http://localhost:8081/system/ws');
    //   const stompClient = Stomp.over(socket);
    //   stompClient.connect({ Authorization: AccessToken, userId: userInfo?.id }, function (frame: any) {
    //     console.log('Connected: ' + frame);
    //     console.log(userInfo?.topicId);
    //     if (userInfo.topicId)
    //       stompClient.subscribe(`/topic/user/${userInfo?.topicId}`, (messenger: any) => {
    //         console.log(messenger);
    //         const body = JSON.parse(messenger.body);
    //         const actionSender = JSON.parse(body.value);
    //         const senderInfo = JSON.parse(actionSender.userSender);
    //         let action = '';
    //         switch (actionSender.action) {
    //           case 'unfiend':
    //             action = 'Unfiend';
    //             break;
    //           case 'request-friend':
    //             action = 'Send Request Friend';
    //             break;
    //           case 'accept-friend':
    //             action = 'Accept Friend';
    //             break;
    //           case 'subscribed':
    //             action = 'Subscribed';
    //             break;
    //           default:
    //             break;
    //         }

    //         notificationController.success({
    //           message: `${senderInfo.name} Had ${action} ${body.user.name}`,
    //         });
    //       });
    //   });
    // }
  }, []);

  return (
    <>
      <meta name="theme-color" content={themeObject[theme].primary} />
      <GlobalStyle />
      <ConfigProvider locale={language === 'en' ? enUS : viVN}>
        <StompSessionProvider
          url={'http://149.51.37.29:8081/system/ws'}
          connectHeaders={{ Authorization: accessToken, userId: userInfo }}
        >
          <AppRouter />
        </StompSessionProvider>
      </ConfigProvider>
    </>
  );
};

export default App;
