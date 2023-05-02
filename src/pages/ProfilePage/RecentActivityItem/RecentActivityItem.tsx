import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { activityStatuses } from '@app/constants/config/activityStatuses';
import { Dates } from '@app/constants/Dates';
import * as S from './RecentActivityItem.styles';
import { Activity } from '@app/api/activity.api';
import dfavt from '@app/share/dfavt.png';
import { Button } from 'antd';

export const RecentActivityItem: React.FC<Activity> = ({
  id,
  imageUrl,
  name,
  status,
  email,
  topicContactId,
  unfriend,
}) => {
  const { t } = useTranslation();
  console.log(imageUrl, name, status, email, topicContactId);

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

              <S.IconWrapper>{currentActivity?.icon}</S.IconWrapper>
            </S.TitleWrapper>

            <S.Text>
              {t(currentActivity?.title || '')} {t('nft.by')} {email}
            </S.Text>
          </S.InfoHeaderWrapper>
          <Button
            onClick={() => {
              unfriend(id);
            }}
          >
            Huỷ Kết Bạn
          </Button>
        </S.InfoWrapper>
      </S.Wrapper>
    </S.ActivityCard>
  );
};
