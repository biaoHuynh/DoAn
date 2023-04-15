import styled from 'styled-components';
import { Col, Typography } from 'antd';

import { Card as CommonCard } from 'components/common/Card/Card';

export const TablesWrapper = styled.div`
  margin-top: 1.875rem;
`;

export const Card = styled(CommonCard)`
  margin-bottom: 2rem;
`;

export const StatusText = styled(Typography.Text)``;

export const Text = styled(Typography.Text)``;

export const FilterCol = styled(Col)`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
export const FeedWrapper = styled.div`
  overflow-y: auto;

  max-height: 500px;
`;
