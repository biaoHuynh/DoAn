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
export const NotificationsDropdown: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpened, setOpened] = useState(false);
  useEffect(() => {
    notificationsService.getNotifiCations().then((data: any) => {
      if (data.data) {
        const noti = data.data?.map((noti: any) => {
          const value = JSON.parse(noti.value);
          const userInfo = JSON.parse(value.user);
          return {
            id: noti.id,
            description: value.action,
            userName: userInfo.name,
            name: 'mention',
            userIcon: userInfo.imageUrl ? `http://149.51.37.29:8081/local-store/${userInfo.imageUrl}` : DefaultAvatar,
            status: noti.status,
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
