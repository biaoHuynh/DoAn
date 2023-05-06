import styled from 'styled-components';
import { Card as CommonCard } from 'components/common/Card/Card';
import { Typography } from 'antd';
import { FONT_SIZE, media } from '@app/styles/themes/constants';

export const TablesWrapper = styled.div`
  margin-top: 1.875rem;
`;

export const Card = styled(CommonCard)`
  margin-bottom: 2rem;
`;

export const WrapperUser = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 9rem;
  justify-content: center;
`;

export const WrapperExpert = styled.div`
  align-items: center;
  display: flex;
  height: 9rem;
  justify-content: center;
`;

export const WrapperExpertInfo = styled.div`
justify-content: center;
  display: flex;
  flex-direction: column;
  height: 9rem;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ImgWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Title = styled(Typography.Title)`
  &.ant-typography {
    margin-bottom: 0;

    font-size: ${FONT_SIZE.xs};

    @media only screen and ${media.xl} {
      font-size: ${FONT_SIZE.md};
    }
  }
`;
