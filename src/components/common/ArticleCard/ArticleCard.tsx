import React, { useEffect, useState } from 'react';
import { Dates } from '@app/constants/Dates';
import { Avatar, Image } from 'antd';
import { Tag, ITag } from '../Tag/Tag';
import * as S from './ArticleCard.styles';

import ConfigSetting from './ArticleCardService';
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
  className?: string;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  imgUrl,
  title,
  date,
  description,
  author,
  avatar,
  tags,
  className = 'article-card',
}) => {
  return (
    <S.Wrapper className={className} style={{ width: '85vw' }}>
      <S.Header>{!!avatar && <Avatar src={avatar} alt="author" size={43} />}</S.Header>

      <S.InfoWrapper>
        <S.InfoHeader>
          <S.UserName>{author}</S.UserName> <S.Description>{date}</S.Description>
        </S.InfoHeader>
        <S.Title>{title}</S.Title>
        <S.Description>{description}</S.Description>
      </S.InfoWrapper>

      {imgUrl.map((img: string) => (
        <Image src={`http://localhost:8081/local-store/${img}`} key={`${img}123`} alt="article" preview={false} />
      ))}
      {!!tags && (
        <S.TagsWrapper>
          <Tag key={tags.id} title={tags.tagName} />
        </S.TagsWrapper>
      )}
    </S.Wrapper>
  );
};
