import styled from 'styled-components';
import { Card as CommonCard } from 'components/common/Card/Card';
import { Col, Typography } from 'antd';
import { Card as BaseCard } from '@app/components/common/Card/Card';
import { FONT_SIZE, media, FONT_FAMILY, FONT_WEIGHT } from '@app/styles/themes/constants';

export const Text = styled(Typography.Text)``;
export const TablesWrapper = styled.div`
  margin-top: 1.875rem;
`;

export const Card = styled(CommonCard)`
  margin-bottom: 2rem;
`;
export const ActivityCard = styled(BaseCard)`
  box-shadow: var(--box-shadow-nft-secondary-color);
`;

export const Wrapper = styled.div`
  display: flex;
  height: 9rem;
  gap: 1.625rem;
`;
export const WrapperBtn = styled.div`
  display: flex;
  gap: 0.625rem;
  justify-content: center;
  margin-top: 5%;
`;
export const ImgWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const IconWrapper = styled.div`
  width: 1.4375rem;
  height: 1.4375rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  color: var(--text-secondary-color);

  background-color: var(--primary-color);

  font-size: ${FONT_SIZE.xs};
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  flex: 1;
  justify-content: center;
`;

export const InfoHeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
`;

export const InfoBottomWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
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

export const TextCard = styled(Typography.Text)`
  display: block;

  font-size: ${FONT_SIZE.xxs};

  color: var(--text-nft-light-color);

  font-family: ${FONT_FAMILY.secondary};

  @media only screen and ${media.xl} {
    font-size: ${FONT_SIZE.xs};
  }
`;

export const DateText = styled(Text)`
  font-style: italic;

  font-family: ${FONT_FAMILY.main};
`;
export const Title2 = styled.div`
  font-size: ${FONT_SIZE.md};
  font-weight: ${FONT_WEIGHT.medium};
  width: 80%;
  line-height: 1.3rem;

  color: var(--text-main-color);

  @media only screen and ${media.md} {
    font-size: ${FONT_SIZE.xl};
  }
`;

export const DateTime = styled(Typography.Text)`
  font-size: ${FONT_SIZE.xxs};
  color: var(--text-main-color);
  line-height: 1.25rem;
`;

export const Description = styled.div`
  font-size: ${FONT_SIZE.xs};
  color: var(--text-main-color);
  overflow: hidden;
  height: 30px;
  line-height: 16px;
  position: relative;
  word-wrap: break-word;
  @media only screen and ${media.xxl} {
    font-size: 1rem;
  }

  :after {
    content: '...';

    position: absolute;
    right: 8px;
    bottom: 0px;
  }
`;
export const Hashtag = styled.div`
  font-size: ${FONT_SIZE.xs};
  color: #546eed;

  @media only screen and ${media.xxl} {
    font-size: 1rem;
  }
`;

export const TagsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem;
  padding: 0.5rem 0.25rem;
`;
