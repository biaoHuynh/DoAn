import React, { useEffect, useState } from 'react';
import ProfilePageService from './ProfilePageServicce';
import { Button, Card, Col, Row, Space, Tabs } from 'antd';

import { UserInfo } from './ProfilePage';

const Post: React.FC<UserInfo> = ({ id, name, email, imageUrl, status, isExpert, rating, lastTime }: UserInfo) => {
  const [post, setPost] = useState([]);

  useEffect(() => {
    if (id) {
      console.log(id);
      ProfilePageService.getAllPost(id, 0).then((res: any) => {
        setPost(res.data);
      });
    }
    console.log(id);
  }, [id]);

  return (
    <>
      <Card bordered={false} hoverable style={{ width: '100%' }}></Card>
    </>
  );
};

export default Post;
