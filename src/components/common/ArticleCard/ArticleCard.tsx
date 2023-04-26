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
  const [comments, setComments] = useState([]);
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
    dbService.sendComment({
      content: comment,
      postId: idPost,
      comemntParentId: null,
    });
    const UserDataLocal = localStorage.getItem('UserData');
    const UserInfo = JSON.parse(UserDataLocal);

    setComments([
      ...comments,
      { comemntParent: null, content: comment, userId: { name: UserInfo.name, imageUrl: UserInfo.imageUrl } },
    ]);
  };
  return (
    <>
      <S.Wrapper className={className}>
        <S.Header>
          <S.InfoAvt>
            <Avatar src={avatar ? `http://localhost:8081/local-store/${avatar}` : dfavt} alt="author" size={43} />{' '}
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

        <S.ImageWrap>
          {imgUrl?.map((img: string) => (
            <Image
              src={`http://localhost:8081/local-store/${img}`}
              key={`${img}123`}
              alt="article"
              preview={false}
              width={'99%'}
              style={{ objectFit: 'contain', width: '92%' }}
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
      <Modal
        visible={openPost}
        onCancel={() => setOpenPost(false)}
        width={700}
        footer={[
          <>
            <S.Wrapper className={className}>
              <S.Header>
                <S.InfoAvt>
                  <Avatar src={avatar ? `http://localhost:8081/local-store/${avatar}` : dfavt} alt="author" size={43} />{' '}
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

              <S.ImageWrap>
                {imgUrl?.map((img: string) => (
                  <Image
                    src={`http://localhost:8081/local-store/${img}`}
                    key={`${img}123`}
                    alt="article"
                    preview={false}
                    width={'99%'}
                    style={{ objectFit: 'contain', width: '92%' }}
                  />
                ))}
              </S.ImageWrap>
              {comments.map((item: any) => {
                return (
                  <Card style={{ width: 300 }}>
                    <Meta
                      avatar={<Avatar src={`http://localhost:8081/local-store/${item.userId.imageUrl}`} />}
                      title={item.userId.name}
                    />
                    <p>{item.comemntParent}</p>
                    <p>{item.content}</p>
                  </Card>
                );
              })}
            </S.Wrapper>
            <S.WrapperCmt>
              <Input onChange={(event) => setComment(event.target.value)} />
              <Button onClick={() => UpComment()}>
                <SendOutlined />
              </Button>
            </S.WrapperCmt>
          </>,
        ]}
      ></Modal>
    </>
  );
};
