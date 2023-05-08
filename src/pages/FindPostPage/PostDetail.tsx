import React, { useEffect, useState } from 'react';
import { Col, Input, Row, Image, Avatar, Button } from 'antd';
import { Tag, ITag } from '@app/components/common/Tag/Tag';
const { Search } = Input;
import dfavt from '@app/share/dfavt.png';
import * as S from './Details.styles';
import * as D from './DetailPost.styles';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import fpService from './PostFindService';
import FindPortScroll from './FindPortScroll';
import { useLocation } from 'react-router-dom';
import { CheckCircleTwoTone, SendOutlined } from '@ant-design/icons';
import Meta from 'antd/lib/card/Meta';
import moment from 'moment';
import 'moment/locale/vi';
import dbService from '../DashBoard/DashBoardService';
import { useTranslation } from 'react-i18next';
const PostDetail: React.FC = () => {
  const [findPost, setFindPost] = useState<any[]>([]);
  const { state } = useLocation();
  const [comment, setComment] = useState<string>('');
  const [comments, setComments] = useState([]);
  const [reply, setReply] = useState(null);
  const { t } = useTranslation();
  useEffect(() => {
    fpService.getByID(state ? state : 0).then((res: any) => {
      if (res?.data !== null) {
        setFindPost(res.data);
      }
    });
    fpService.getComment(state ? state : 0).then((data: any) => {
      if (data.data !== null) {
        setComments(data.data);
      }
      console.log(data);
    });
  }, []);
  const UpComment = () => {
    fpService
      .sendComment({
        content: comment,
        postId: state,
        comemntParentId: null,
      })
      .then((data: any) => {
        if (data.data !== null) {
          setComments([data.data, ...comments]);
        }
        setComment('');
      });
  };

  const UpCommentWithParent = (idPearent: number) => {
    dbService
      .sendComment({
        content: comment,
        postId: state,
        comemntParentId: idPearent,
      })
      .then((data: any) => {
        if (data.data !== null) {
          setComments([data.data, ...comments]);
        }
        setComment('');
        setReply(null);
      });
  };
  return (
    <Row
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        height: '59.2rem',
      }}
    >
      <Col span={12}>
        {findPost.map((post) => (
          <>
            <D.Wrapper>
              <D.Header>
                <D.InfoAvt>
                  <Avatar
                    src={post?.user?.imageUrl ? `http://149.51.37.29:8081/local-store/${post?.user?.imageUrl}` : dfavt}
                    alt="author"
                    size={43}
                  />{' '}
                  <D.UserName>
                    {post?.user?.name} {post?.user?.isExpert ? <CheckCircleTwoTone /> : null}
                  </D.UserName>
                </D.InfoAvt>
                <D.InfoHeader>
                  <D.Description>{moment(new Date(post?.createAt)).locale('vi').format('lll')}</D.Description>
                </D.InfoHeader>
              </D.Header>
              <D.InfoWrapper>
                <D.Title>{post?.title}</D.Title>
                {!!post.topicTag && (
                  <S.TagsWrapper>
                    <Tag key={post.topicTag.id} title={post.topicTag.tagName} bgColor={post.topicTag.color} />
                  </S.TagsWrapper>
                )}
                <D.Description>{post?.context}</D.Description>
                <D.Hashtag>#{post?.hashTag}</D.Hashtag>
              </D.InfoWrapper>
              <D.ImageWrap>
                {post.imageList?.map((img: string) => (
                  <Image
                    src={`http://149.51.37.29:8081/local-store/${img}`}
                    key={`${img}123`}
                    alt="article"
                    preview={false}
                    width={'99%'}
                    style={{ objectFit: 'contain' }}
                  />
                ))}
              </D.ImageWrap>
            </D.Wrapper>
          </>
        ))}
      </Col>
      <Col span={12}>
        <S.WrapperOnloadCmt2>
          {comments.map((item: any) => {
            return (
              <S.CardCmt
                style={{
                  width: '98%',
                  boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
                  margin: '1%',
                }}
                key={item?.id}
                bodyStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
              >
                <Meta
                  avatar={
                    <Avatar
                      src={
                        item?.userId?.imageUrl ? `http://149.51.37.29:8081/local-store/${item.userId.imageUrl}` : dfavt
                      }
                    />
                  }
                  title={
                    <>
                      {item?.userId?.name}
                      <p style={{ marginRight: '5px', fontSize: '0.75rem' }}>
                        {moment(new Date(item.createAt)).locale('vi').format('lll')}
                      </p>
                    </>
                  }
                />
                {item.comemntParent && (
                  <S.CardCmt
                    style={{
                      width: '90%',
                      marginLeft: '10%',
                      background: '#f5f5f5',
                      boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
                      marginTop: '5%',
                    }}
                    bodyStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
                  >
                    <Meta
                      style={{ fontSize: '0.75rem' }}
                      title={
                        <>
                          {item.comemntParent.userId.name}
                          <p style={{ marginRight: '5px', fontSize: '0.75rem' }}>
                            {moment(new Date(item.comemntParent.createAt)).locale('vi').format('lll')}
                          </p>
                        </>
                      }
                    />
                    <p style={{ marginTop: '2%', fontSize: '1rem', marginBottom: '0em' }}>
                      {item.comemntParent.content}
                    </p>
                  </S.CardCmt>
                )}
                <p style={{ marginTop: '2%', marginLeft: '10%', fontSize: '1rem' }}>{item.content}</p>
                {reply === item.id ? null : (
                  <Button
                    style={{ marginLeft: '10%' }}
                    size={'small'}
                    onClick={() => setReply(item.id === reply ? null : item.id)}
                  >
                    {t('vb.reply')}
                  </Button>
                )}
                {reply === item.id && (
                  <S.WrapperCmtRep>
                    <Input onChange={(event) => setComment(event.target.value)} placeholder={t('vb.cmthere')} />
                    <Button disabled={!comment} onClick={() => UpCommentWithParent(item.id)}>
                      <SendOutlined />
                    </Button>
                  </S.WrapperCmtRep>
                )}
              </S.CardCmt>
            );
          })}
        </S.WrapperOnloadCmt2>
        <S.WrapperCmt>
          <Input value={comment} onChange={(event) => setComment(event.target.value)} placeholder={t('vb.cmthere')} />
          <Button disabled={!comment} onClick={() => UpComment()}>
            <SendOutlined />
          </Button>
        </S.WrapperCmt>
      </Col>
    </Row>
  );
};

export default PostDetail;
