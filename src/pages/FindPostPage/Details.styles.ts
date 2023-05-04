import styled from 'styled-components';
import { Typography, Card as CommonCard } from 'antd';
import { BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT, media } from '@app/styles/themes/constants';

export const CardCmt = styled(CommonCard)`
  .ant-card-meta-title {
    font-size: 1rem;
  }
`;
export const Header = styled.div`
  height: 5.5rem;
  margin-left: 1.5rem;
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
`;

export const AuthorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 0.625rem;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 21.25rem;
  position: relative;
  max-width: 53.5rem;
  box-shadow: var(--box-shadow);
  border-radius: ${BORDER_RADIUS};
  border: 1px black solid;
  transition: 0.3s;

  [data-theme='dark'] & {
    background: var(--secondary-background-color);
  }

  &:hover {
    box-shadow: var(--box-shadow-hover);
  }
`;
export const WrapperOnloadCmt = styled.div`
  display: flex;
  height: 60.25rem;
  flex-direction: column;
  flex: 1 1 55.5rem;
  position: relative;
  max-width: 53.5rem;
  box-shadow: var(--box-shadow);
  border-radius: ${BORDER_RADIUS};
  border: 1px black solid;
  transition: 0.3s;

  [data-theme='dark'] & {
    background: var(--secondary-background-color);
  }

  &:hover {
    box-shadow: var(--box-shadow-hover);
  }
`;
export const WrapperOnloadCmt2 = styled.div`
  display: flex;
  height: 57rem;
  flex-direction: column;
  flex: 1 1 55.5rem;
  position: relative;
  max-width: 53.5rem;
  overflow-y: auto;
  overflow-x: hidden;
  box-shadow: var(--box-shadow);
  border-radius: ${BORDER_RADIUS};
  border: 1px black solid;
  transition: 0.3s;

  [data-theme='dark'] & {
    background: var(--secondary-background-color);
  }

  &:hover {
    box-shadow: var(--box-shadow-hover);
  }
`;
export const WrapperCmtRep = styled.div`
  display: flex;
  flex-direction: row;
  flex: 9 7 3.1rem;
  position: relative;
  max-width: 53.5rem;
  box-shadow: var(--box-shadow);
  border-radius: ${BORDER_RADIUS};
  border: 1px black solid;
  transition: 0.3s;

  [data-theme='dark'] & {
    background: var(--secondary-background-color);
  }

  &:hover {
    box-shadow: var(--box-shadow-hover);
  }
`;
export const WrapperCmt = styled.div`
  display: flex;
  flex-direction: row;
  flex:1 1 0.25rem
  position: relative;
  max-width: 53.5rem;
  box-shadow: var(--box-shadow);
  border-radius: ${BORDER_RADIUS};
  border: 1px black solid;
  transition: 0.3s;
width: 53.5rem;
  [data-theme='dark'] & {
    background: var(--secondary-background-color);
  }

  &:hover {
    box-shadow: var(--box-shadow-hover);
  }
`;

export const Author = styled.div`
  font-size: ${FONT_SIZE.lg};
  font-weight: ${FONT_WEIGHT.bold};
  color: var(--text-main-color);
  line-height: 1.5625rem;
`;

export const ImageWrap = styled.div`
  width: 53rem;
  display: flex;
  justify-content: center;
  overflow: hidden;
  height: 30rem;
`;
export const ImageWrap2 = styled.div`
  width: 53.9rem;
  display: flex;
  justify-content: center;

  height: 30rem;
`;

export const InfoWrapper = styled.div`
  padding: 1.25rem;

  @media only screen and ${media.xl} {
    padding: 1rem;
  }

  @media only screen and ${media.xxl} {
    padding: 1.85rem;
  }
`;
export const ReactionWrapper = styled.div`
  padding: 1.25rem;
  display: flex;

  @media only screen and ${media.xl} {
    padding: 1rem;
  }

  @media only screen and ${media.xxl} {
    padding: 1.85rem;
  }
`;

export const InfoHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  @media only screen and ${media.md} {
    margin-bottom: 0.625rem;
  }

  @media only screen and ${media.xxl} {
    margin-bottom: 1.25rem;
  }
`;

export const InfoAvt = styled.div`
  display: flex;

  margin-bottom: 1rem;

  @media only screen and ${media.md} {
    margin-bottom: 0.625rem;
  }

  @media only screen and ${media.xxl} {
    margin-bottom: 1.25rem;
  }
`;

export const Title = styled.div`
  font-size: ${FONT_SIZE.md};
  font-weight: ${FONT_WEIGHT.medium};
  width: 80%;
  line-height: 1.3rem;

  color: var(--text-main-color);

  @media only screen and ${media.md} {
    font-size: ${FONT_SIZE.xl};
  }
`;

export const Reaction = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
export const UserName = styled.div`
  font-size: ${FONT_SIZE.md};
  display: flex;
  align-items: center;
  color: var(--text-main-color);
  font-weight: ${FONT_WEIGHT.semibold};
  padding-left: 1%;
  @media only screen and ${media.xxl} {
    font-size: 1rem;
  }
`;
export const Description = styled.div`
  font-size: ${FONT_SIZE.xs};
  color: var(--text-main-color);

  @media only screen and ${media.xxl} {
    font-size: 1rem;
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
