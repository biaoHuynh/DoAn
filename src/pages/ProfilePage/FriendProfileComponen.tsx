import React, { useEffect, useState } from 'react';
import ProfilePageService from './ProfilePageServicce';
import { Avatar, Button, Card, Col, Divider, Dropdown, Menu, MenuProps, Row, Space, Tabs } from 'antd';
import { DownOutlined, EllipsisOutlined } from '@ant-design/icons';

export interface Friend {
  imageUrl: string;
  name: string;
  email: string;
  status: number;
  date: number;
  topicContactId: string;
}

const handleClick = ({ key }) => {
  console.log(key);
  //you can perform setState here
};

const menu = (
  <Menu onClick={handleClick}>
    <Menu.Item key="Recommend">Recommend</Menu.Item>
    <Menu.Item key="Newest">Newest</Menu.Item>
    <Menu.Item key="Lowest Price">Lowest Price</Menu.Item>
    <Menu.Item key="Highest Price">Highest Price</Menu.Item>
  </Menu>
);

const Friend: React.FC<Friend> = ({ imageUrl, name, status, email, topicContactId }) => {
  const onMenuClick: MenuProps['onClick'] = (e) => {
    console.log('click', e);
  };
  return (
    <>
      <Col className="gutter-row" span={4}>
        <Card>
          <Card.Meta
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'end',
            }}
            avatar={
              <Avatar shape="square" size={60} src="https://joesch.moe/api/v1/random" style={{ border: '2px solid' }} />
            }
            description={
              <div style={{ margin: 10, display: 'flex', flexDirection: 'row' }}>
                {name}
                <Dropdown overlay={menu} trigger={['click']}>
                  <a
                    onClick={(e) => e.preventDefault()}
                  >
                    <EllipsisOutlined />
                  </a>
                </Dropdown>
              </div>
            }
          />
        </Card>
      </Col>
    </>
  );
};

export default Friend;
