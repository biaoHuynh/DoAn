import React, { useEffect, useState } from 'react';
import ProfilePageService from './ProfilePageServicce';
import { Button, Card, Col, Row, Space, Tabs } from 'antd';

const Post: React.FC = () => {
    const UserData = localStorage.getItem('UserData');
    const userInfo = JSON.parse(UserData);
    const [post, setPost] = useState([]);

    useEffect(() => {
        ProfilePageService.getAllPost({ user_id: userInfo.id, offset: 0 }).then((res: any) => {
          setPost(res.data);
        });
      }, []);

    return (<>
       <Card bordered = {false} hoverable style={{ width: '100%' }}>
        {post?.map((item) => {
          return (
            <Row gutter={16}>
              <Card title={item?.title}>{item?.title}</Card>
            </Row>
          );
        })}
      </Card>
    </>);
}

export default Post;