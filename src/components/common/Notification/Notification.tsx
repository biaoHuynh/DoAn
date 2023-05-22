import React from 'react';
import { Space } from 'antd';
import { CheckCircleFilled, ExclamationCircleFilled, InfoCircleFilled, WarningFilled } from '@ant-design/icons';
import * as S from './Notification.styles';
import notificationService from './NotificationsService';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
interface Icons {
  info: React.ReactNode;
  success: React.ReactNode;
  warning: React.ReactNode;
  error: React.ReactNode;
  mention: React.ReactNode;
}

export type NotificationType = 'info' | 'mention' | 'success' | 'warning' | 'error';

interface NotificationProps {
  id: number;
  type: NotificationType;
  title: React.ReactNode;
  description?: React.ReactNode;
  mentionIconSrc?: React.ReactNode;
  status: number;
  typePost: string;
  param: string;
}

export const Notification: React.FC<NotificationProps> = ({
  type,
  mentionIconSrc,
  title,
  description,
  status,
  id,
  typePost,
  param,
}) => {
  const icons: Icons = {
    info: <InfoCircleFilled />,
    success: <CheckCircleFilled />,
    warning: <ExclamationCircleFilled />,
    error: <WarningFilled />,
    mention: mentionIconSrc,
  };
  const navigate = useNavigate();
  const icon = icons[type] || icons.warning;
  const read = (id: number) => {
    !status && notificationService.read(id);
  };
  const { t } = useTranslation();

  return (
    <S.SpaceWrapper
      type={type}
      align="start"
      size="middle"
      style={{ background: status ? '#f5f5f5' : `var(--background-color)`, width: '23rem' }}
      onClick={() => {
        read(id);
        if (typePost === 'post') {
          const id = parseInt(param);
          navigate(`/detail`, {
            state: id,
          });
        }
        if (typePost === 'contact') {
          navigate(`/profile-page/${id}`);
        }
      }}
    >
      {mentionIconSrc ? <S.NotificationIcon src={icon} alt="User icon" /> : icon}
      <Space direction="vertical">
        <S.Title>{title}</S.Title>
        <S.Description>{t('vb.had')} {t(`${description}`)}</S.Description>
      </Space>
    </S.SpaceWrapper>
  );
};
