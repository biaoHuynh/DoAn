import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { activityStatuses } from '@app/constants/config/activityStatuses';
import { Dates } from '@app/constants/Dates';
import * as s from './Tables.styles';
import { Activity } from '@app/api/activity.api';
import dfavt from '@app/share/dfavt.png';
import { Button, Rate } from 'antd';
import { CheckCircleTwoTone } from '@ant-design/icons';

export const ListFriendItem: React.FC<Activity> = ({
  id,
  imageUrl,
  name,
  status,
  email,
  isExpert,
  expertInfo,
  contactInfo,
  unfriend,
  addfriend,
  acpfriend,
  cancelacpfriend,
  subexpert,
  unsubexpert,
}) => {
  const { t } = useTranslation();
  console.log(imageUrl, name, status, email);
  const [isSubcribed, setIsSubcribed] = useState<boolean>(isExpert && expertInfo.isSub);
  const currentActivity = useMemo(() => activityStatuses.find((dbStatus) => dbStatus.name === status), [status]);

  const [statusFr, setStatusFr] = useState<number>(contactInfo && contactInfo.status);

  useEffect(() => {
    setIsSubcribed(isExpert && expertInfo.isSub);
    setStatusFr(contactInfo && contactInfo.status);
  }, [expertInfo, contactInfo]);
  const getBtn = (statusFr: any) => {
    switch (statusFr) {
      case 1:
        return (
          <Button
            size={'small'}
            onClick={() => {
              cancelacpfriend(id);
            }}
          >
            Huỷ lời mời
          </Button>
        );
      case 2:
        return (
          <Button
            size={'small'}
            onClick={() => {
              unfriend(id);
            }}
          >
            Huỷ kết bạn
          </Button>
        );
      case 3:
        return (
          <>
            <Button
              size={'small'}
              type={'primary'}
              onClick={() => {
                acpfriend(id);
              }}
            >
              Chấp nhận
            </Button>
            <Button
              size={'small'}
              onClick={() => {
                unfriend(id);
              }}
              danger
            >
              Xoá
            </Button>
          </>
        );

      default:
        return (
          <Button
            size={'small'}
            type={'primary'}
            onClick={() => {
              addfriend(id);
            }}
          >
            Kết bạn
          </Button>
        );
    }
  };
  return (
    <s.ActivityCard bodyStyle={{ padding: '25px  10px' }}>
      <s.Wrapper>
        <s.ImgWrapper>
          <img
            src={imageUrl ? `http://localhost:8081/local-store/${imageUrl}` : dfavt}
            alt={`title ${imageUrl ? imageUrl : 'dfavt'}`}
            width={84}
            height={84}
          />
        </s.ImgWrapper>

        <s.InfoWrapper>
          <s.InfoHeaderWrapper>
            <s.TitleWrapper>
              <s.Title level={5}>
                {name} {isExpert ? <CheckCircleTwoTone /> : null}
              </s.Title>
            </s.TitleWrapper>

            <s.TextCard>{email}</s.TextCard>
            {isExpert ? (
              <span>
                <Rate disabled style={{ fontSize: '1rem' }} defaultValue={expertInfo.rating} />
                {expertInfo.ratingCount ? (
                  <span style={{ fontSize: '0.8rem' }} className="ant-rate-text">
                    {expertInfo.ratingCount}
                  </span>
                ) : (
                  ''
                )}
              </span>
            ) : null}

            <Button
              size={'small'}
              onClick={() => {
                console.log(13);
              }}
            >
              Chat
            </Button>
          </s.InfoHeaderWrapper>
        </s.InfoWrapper>
      </s.Wrapper>
      <s.WrapperBtn>
        {isExpert ? (
          <Button
            size={'small'}
            type={isSubcribed ? 'default' : 'primary'}
            onClick={() => {
              subexpert(id);
            }}
          >
            {isSubcribed ? 'Huỷ Đăng ký' : 'Đăng ký'}
          </Button>
        ) : null}
        {isExpert ? (
          <div
            style={{
              borderLeft: 'thin solid rgb(0 0 0)',
            }}
          />
        ) : null}
        {contactInfo ? (
          getBtn(statusFr)
        ) : (
          <Button
            size={'small'}
            type={'primary'}
            onClick={() => {
              addfriend(id);
            }}
          >
            Kết bạn
          </Button>
        )}
      </s.WrapperBtn>
    </s.ActivityCard>
  );
};
