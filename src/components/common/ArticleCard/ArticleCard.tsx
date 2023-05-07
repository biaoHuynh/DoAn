import React, { useEffect, useState } from 'react';
import { Dates } from '@app/constants/Dates';
import { Avatar, Button, Card, Image, Input, Modal } from 'antd';
import { Tag, ITag } from '../Tag/Tag';
import * as S from './ArticleCard.styles';
import dfavt from '@app/share/dfavt.png';
import ConfigSetting from './ArticleCardService';
import {
  CheckCircleTwoTone,
  CommentOutlined,
  DislikeOutlined,
  DislikeTwoTone,
  HeartOutlined,
  LikeOutlined,
  LikeTwoTone,
  SendOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';
import dbService from '@app/pages/DashBoard/DashBoardService';
import Meta from 'antd/lib/card/Meta';
import moment from 'moment';
import 'moment/locale/vi';
interface ArticleCardProps {
  idPost: number;
  author?: React.ReactNode;
  imgUrl: any;
  title: string;
  date: number;
  description: string;
  avatar?: string;
  tags?: {
    color: '#000000';
    id: 0;
    tagName: '';
  };
  hashTags: string;
  className?: string;
  disLikeCount: number;
  likeCount: number;
  commentCount: number;
  isExpert: boolean;
  isLike: boolean;
  isDisLike: boolean;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  idPost,
  imgUrl,
  title,
  date,
  description,
  author,
  avatar,
  tags,
  hashTags,
  className = 'article-card',
  disLikeCount,
  likeCount,
  commentCount,
  isExpert,
  isLike,
  isDisLike,
}) => {
  const [isLiked, setIsLiked] = useState<boolean>(isLike);
  const [isDisLiked, setIsDisLiked] = useState<boolean>(isDisLike);
  const [isLikedCount, setIsLikedCount] = useState<number>(likeCount);
  const [isDisLikedCount, setIsDisLikedCount] = useState<number>(disLikeCount);
  const [openPost, setOpenPost] = useState<boolean>(false);
  const [comment, setComment] = useState<string>('');
  const [comments, setComments] = useState<any[]>([]);
  const [reply, setReply] = useState(null);
  const CallLike = (id: number) => {
    dbService.callLike(id);

    if (isLiked) {
      setIsLikedCount(isLikedCount - 1);
    } else {
      setIsLikedCount(isLikedCount + 1);
    }
    if (isDisLiked) {
      setIsDisLikedCount(isDisLikedCount - 1);
      setIsDisLiked(!isDisLiked);
    }

    setIsLiked(!isLiked);
  };
  const CallDisLike = (id: number) => {
    dbService.callDisLike(id);
    if (isDisLiked) {
      setIsDisLikedCount(isDisLikedCount - 1);
    } else {
      setIsDisLikedCount(isDisLikedCount + 1);
    }
    if (isLiked) {
      setIsLikedCount(isLikedCount - 1);
      setIsLiked(!isLiked);
    }
    setIsDisLiked(!isDisLiked);
  };
  const UpComment = () => {
    dbService
      .sendComment({
        content: comment,
        postId: idPost,
        comemntParentId: null,
      })
      .then((data: any) => {
        if (data.data !== null) {
          const newData: any[] = [data.data, ...comments];
          setComments(newData);
        }
        setComment('');
      });
  };

  const UpCommentWithParent = (idPearent: number) => {
    dbService
      .sendComment({
        content: comment,
        postId: idPost,
        comemntParentId: idPearent,
      })
      .then((data: any) => {
        if (data.data !== null) {
          const newData: any[] = [data.data, ...comments];
          setComments(newData);
        }
        setComment('');
        setReply(null);
      });
  };
  return (
    <>
      <S.Wrapper className={className}>
        <S.Header>
          <S.InfoAvt>
            <Avatar src={avatar ? `http://149.51.37.29:8081/local-store/${avatar}` : dfavt} alt="author" size={43} />{' '}
            <S.UserName>
              {author} {isExpert ? <CheckCircleTwoTone /> : null}
            </S.UserName>
          </S.InfoAvt>
          <S.InfoHeader>
            <S.Description>{moment(new Date(date)).locale('vi').format('lll')}</S.Description>
          </S.InfoHeader>
        </S.Header>
        <S.InfoWrapper>
          <S.Title>{title}</S.Title>
          {!!tags && (
            <S.TagsWrapper>
              <Tag key={tags.id} title={tags.tagName} bgColor={tags.color} />
            </S.TagsWrapper>
          )}
          <S.Description>{description}</S.Description>
          <S.Hashtag>#{hashTags}</S.Hashtag>
        </S.InfoWrapper>

        <S.ImageWrap>
          {imgUrl?.map((img: string) => (
            <Image
              src={`http://149.51.37.29:8081/local-store/${img}`}
              key={`${img}123`}
              alt="article"
              preview={false}
              width={'99%'}
              style={{ objectFit: 'contain', width: '99%' }}
            />
          ))}
        </S.ImageWrap>
        <S.ReactionWrapper>
          <S.Reaction>
            <Button type="text" onClick={() => CallLike(idPost)}>
              {isLiked ? <LikeTwoTone /> : <LikeOutlined />}
            </Button>
            {isLikedCount}
          </S.Reaction>
          <S.Reaction>
            <Button type="text" onClick={() => CallDisLike(idPost)}>
              {isDisLiked ? <DislikeTwoTone /> : <DislikeOutlined />}
            </Button>
            {isDisLikedCount}
          </S.Reaction>
          <S.Reaction>
            <Button
              type="text"
              onClick={() => {
                setOpenPost(true);
                dbService.getComment(idPost).then((data: any) => {
                  if (data.data !== null) {
                    setComments(data.data);
                  }
                  console.log(data);
                });
              }}
            >
              <CommentOutlined />
            </Button>
            {commentCount}
          </S.Reaction>
        </S.ReactionWrapper>
      </S.Wrapper>

      <Modal visible={openPost} onCancel={() => setOpenPost(false)} width={700} footer={[<></>]}>
        <>
          <S.WrapperOnloadCmt className={className}>
            <S.Header>
              <S.InfoAvt>
                <Avatar
                  src={avatar ? `http://149.51.37.29:8081/local-store/${avatar}` : dfavt}
                  alt="author"
                  size={43}
                />{' '}
                <S.UserName>
                  {author} {isExpert ? <CheckCircleTwoTone /> : null}
                </S.UserName>
              </S.InfoAvt>
              <S.InfoHeader>
                <S.Description>{date}</S.Description>
              </S.InfoHeader>
            </S.Header>
            <S.InfoWrapper>
              <S.Title>{title}</S.Title>
              {!!tags && (
                <S.TagsWrapper>
                  <Tag key={tags.id} title={tags.tagName} bgColor={tags.color} />
                </S.TagsWrapper>
              )}
              <S.Description>{description}</S.Description>
              <S.Hashtag>#{hashTags}</S.Hashtag>
            </S.InfoWrapper>

            <S.ImageWrap2>
              {imgUrl?.map((img: string) => (
                <Image
                  src={`http://149.51.37.29:8081/local-store/${img}`}
                  key={`${img}123`}
                  alt="article"
                  preview={false}
                  style={{ objectFit: 'contain', width: '90%' }}
                />
              ))}
            </S.ImageWrap2>
            {comments.map((item: any, index) => {
              return (
                <S.CardCmt
                  style={{
                    width: '98%',
                    boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
                    margin: '1%',
                  }}
                  key={index}
                  bodyStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
                >
                  <Meta
                    avatar={<Avatar src={`http://149.51.37.29:8081/local-store/${item.userId.imageUrl}`} />}
                    title={
                      <>
                        {item.userId.name}
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
                      Reply
                    </Button>
                  )}
                  {reply === item.id && (
                    <S.WrapperCmtRep>
                      <Input onChange={(event) => setComment(event.target.value)} />
                      <Button onClick={() => UpCommentWithParent(item.id)}>
                        <SendOutlined />
                      </Button>
                    </S.WrapperCmtRep>
                  )}
                </S.CardCmt>
              );
            })}
          </S.WrapperOnloadCmt>
          <S.WrapperCmt>
            <Input value={comment} onChange={(event) => setComment(event.target.value)} />
            <Button onClick={() => UpComment()}>
              <SendOutlined />
            </Button>
          </S.WrapperCmt>
        </>
      </Modal>
    </>
  );
};
