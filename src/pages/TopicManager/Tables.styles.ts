import styled from 'styled-components';
import { Card as CommonCard } from 'components/common/Card/Card';

export const TablesWrapper = styled.div`
  margin-top: 1.875rem;
`;

export const Card = styled(CommonCard)`
  margin-bottom: 2rem;
`;

export const ColorPicker = styled.div`
  .rc-color-picker-panel {
    border: 1px solid #ccc;
    height: 100px;
    background: var(--secondary-background-selected-color);
  }
  .rc-color-picker-panel-inner {
    border: none;
    box-shadow: none;
  }
  .rc-color-picker-panel-board-hsv {
    border-radius: 12px;
    outline: none;
  }
  .rc-color-picker-panel-board-value {
    border: none;
    border-radius: 12px;
  }
  .rc-color-picker-panel-board-saturation {
    border: none;
    border-radius: 12px;
  }
  .rc-color-picker-panel-ribbon {
    border-radius: 12px;
  }
  .rc-color-picker-panel-wrap-preview {
    border-radius: 12px;
  }
  .rc-color-picker-panel-preview span {
    border-radius: 12px;
  }
  .rc-color-picker-panel-preview input {
    border-radius: 12px;
  }
`;
