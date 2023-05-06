import styled from 'styled-components';
import { Card as CommonCard } from 'components/common/Card/Card';
import { FONT_SIZE, media, FONT_FAMILY, FONT_WEIGHT } from '@app/styles/themes/constants';
import { Typography } from 'antd';

export const TablesWrapper = styled.div`
  margin-top: 1.875rem;
`;

export const Card = styled(CommonCard)`
  margin-bottom: 2rem;
`;

export const WrapperPost = styled.div`
  display: flex;
  height: 9rem;
  gap: 1.625rem;
`;

export const ImgWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const ContextWrapper = styled.div`
  width: 400px;
  flex: 1;
  overflow: hidden;
`;

export const WrapperStatistic = styled.div`
  display: flex;
  flex-direction: column;
  height: 9rem;
  justify-content: center;
`;

export const WrapperTitle = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  height: 9rem;
  justify-content: center;
`;

export const WrapperUser = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 9rem;
  justify-content: center;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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

export const TagsWrapper = styled.div`
  display: inline-block;
  padding: 0.5rem 0.25rem;
`;
