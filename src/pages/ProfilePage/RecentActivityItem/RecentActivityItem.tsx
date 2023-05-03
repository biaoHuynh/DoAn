import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { activityStatuses } from '@app/constants/config/activityStatuses';
import { Dates } from '@app/constants/Dates';
import * as S from './RecentActivityItem.styles';
import { Activity } from '@app/api/activity.api';
import dfavt from '@app/share/dfavt.png';
import { Button } from 'antd';
import { WrapperBtn } from '@app/pages/HistoryPage/Tables.styles';

export const RecentActivityItem: React.FC<Activity> = ({
  id,
  imageUrl,
  name,
  status,
  email,
  statusFr,
  acpfriend,
  cancelacpfriend,
  unfriend,
}) => {
  const { t } = useTranslation();
  console.log(imageUrl, name, status, email);

  const currentActivity = useMemo(() => activityStatuses.find((dbStatus) => dbStatus.name === status), [status]);

  return (
    <S.ActivityCard>
      <S.Wrapper>
        <S.ImgWrapper>
          <img
            src={imageUrl ? `http://149.51.37.29:8081/local-store/${imageUrl}` : dfavt}
            alt={`title ${imageUrl ? imageUrl : 'dfavt'}`}
            width={84}
            height={84}
          />
        </S.ImgWrapper>

        <S.InfoWrapper>
          <S.InfoHeaderWrapper>
            <S.TitleWrapper>
              <S.Title level={5}>{name}</S.Title>
            </S.TitleWrapper>
            <S.Text>{email}</S.Text>
          </S.InfoHeaderWrapper>
          {statusFr === 2 ? (
            <Button
              size={'small'}
              onClick={() => {
                unfriend(id);
              }}
            >
              Huỷ Kết Bạn
            </Button>
          ) : (
            <WrapperBtn>
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
                  cancelacpfriend(id);
                }}
                danger
              >
                Xoá
              </Button>
            </WrapperBtn>
          )}
        </S.InfoWrapper>
      </S.Wrapper>
    </S.ActivityCard>
  );
};
