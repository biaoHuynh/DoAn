import React, { useState } from 'react';

import { Card } from 'components/common/Card/Card';
import { Tabs } from 'antd';
import Admin from './Admin';
import Expert from './Expert';
import User from './User';

const UserManager: React.FC = () => {
  const [defaultActiveKey, setDefaultActiveKey] = useState('1');
  const onChange = (key: string) => {
    setDefaultActiveKey(key);
  };
  return (
    <Card>
      <Tabs activeKey={defaultActiveKey} onChange={onChange}>
        <Tabs.TabPane tab="Admin" key="1">
          <Admin />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Chuyên gia" key="2">
          <Expert />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Người dùng" key="3">
          <User />
        </Tabs.TabPane>
      </Tabs>
    </Card>
  );
};

export default UserManager;
