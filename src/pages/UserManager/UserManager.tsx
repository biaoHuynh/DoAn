import React, { useState } from 'react';

import { Card } from 'components/common/Card/Card';
import { Tabs } from 'antd';
import Admin from './Admin';
import Expert from './Expert';
import User from './User';
import Reported from './Reported';

const UserManager: React.FC = () => {
  const [defaultActiveKey, setDefaultActiveKey] = useState('1');
  const onChange = (key: string) => {
    setDefaultActiveKey(key);
  };
  return (
    <Card>
      <Tabs activeKey={defaultActiveKey} onChange={onChange}>
        <Tabs.TabPane tab="Người dùng" key="1">
          <User />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Chuyên gia" key="2">
          <Expert />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Vi phạm" key="3">
          <Reported />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Admin" key="4">
          <Admin />
        </Tabs.TabPane>
      </Tabs>
    </Card>
  );
};

export default UserManager;
