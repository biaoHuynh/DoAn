import React from 'react';
import { Avatar, Col, Dropdown, Row } from 'antd';
// import { Dropdown } from '@app/components/common/Dropdown/Dropdown';
import { H6 } from '@app/components/common/typography/H6/H6';
import { ProfileOverlay } from '../ProfileOverlay/ProfileOverlay';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { useResponsive } from '@app/hooks/useResponsive';
import * as S from './ProfileDropdown.styles';
import { UserOutlined } from '@ant-design/icons';

export const ProfileDropdown: React.FC = () => {
  const { isTablet } = useResponsive();

  // const user = useAppSelector((state) => state.user.user);
  const user: any = localStorage.getItem('UserData');
  const userInfo = JSON.parse(user);
  return user != null && user != '' ? (
    <Dropdown overlay={<ProfileOverlay />} trigger={['click']}>
      <S.ProfileDropdownHeader as={Row} gutter={[10, 10]} align="middle">
        <Col>
          <Avatar icon={<UserOutlined />} alt="User" shape="circle" size={40} />
        </Col>
        {isTablet && (
          <Col>
            <H6>{`${userInfo?.username}`}</H6>
          </Col>
        )}
      </S.ProfileDropdownHeader>
    </Dropdown>
  ) : null;
};
