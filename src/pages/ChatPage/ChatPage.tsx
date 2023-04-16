import React, { useEffect, useState } from 'react';
import { Col, Form, InputNumber, Modal, Row, Table } from 'antd';
import { AutoComplete } from 'components/common/AutoComplete/AutoComplete';
import { SearchInput as CommonSearchInput } from 'components/common/inputs/SearchInput/SearchInput';
import { Option } from 'components/common/selects/Select/Select';
import { UserOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import * as S from '@app/pages/uiComponentsPages//UIComponentsPage.styles';
import ConfigSetting from './ConfigService';
import { notificationController } from '@app/controllers/notificationController';
import { ColumnsType } from 'antd/lib/table';
import * as s from './Tables.styles';
import { Button } from '@app/components/common/buttons/Button/Button';
import Chat from './Chat/Chat';

const ChatPage: React.FC = () => {
  const { t } = useTranslation();
 
  return (
    <>
      <PageTitle>Chat Center</PageTitle>
      <s.TablesWrapper>
        <Chat />
      </s.TablesWrapper>
    </>
  );
};

export default ChatPage;
