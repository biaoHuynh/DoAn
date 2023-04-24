import React, { useEffect, useState } from 'react';
import { Dates } from '@app/constants/Dates';
import { Avatar, Button, Image } from 'antd';
import { Tag, ITag } from '../Tag/Tag';
import * as S from './ArticleCard.styles';
import dfavt from '@app/share/dfavt.png';
import ConfigSetting from './ArticleCardService';
import {
  CheckCircleTwoTone,
  CommentOutlined,
  DislikeOutlined,
  HeartOutlined,
  LikeOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';
interface ArticleCardProps {
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
  shareCount: number;
  commentCount: number;
  isExpert: boolean;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
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
  shareCount,
  commentCount,
  isExpert,
}) => {
  return (
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
        {imgUrl.map((img: string) => (
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
          <Button type="text">
            <LikeOutlined />
          </Button>
          {likeCount}
        </S.Reaction>
        <S.Reaction>
          <Button type="text">
            <DislikeOutlined />
          </Button>
          {disLikeCount}
        </S.Reaction>
        <S.Reaction>
          <Button type="text">
            <CommentOutlined />
          </Button>
          {commentCount}
        </S.Reaction>
        <S.Reaction>
          <Button type="text">
            <ShareAltOutlined />
          </Button>
          {shareCount}
        </S.Reaction>
      </S.ReactionWrapper>
    </S.Wrapper>
  );
};
