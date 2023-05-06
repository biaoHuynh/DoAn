import React, { useEffect, useState } from 'react';
import * as s from './Tables.styles';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { Card, Col, Image, Row, Table } from 'antd';
import { Button } from '@app/components/common/buttons/Button/Button';
import { useTranslation } from 'react-i18next';
import { ColumnsType } from 'antd/lib/table';
import dfavt from '@app/share/dfavt.png';
import { CheckCircleTwoTone } from '@ant-design/icons';
import { Tag } from '@app/components/common/Tag/Tag';
import PostPageService from './PostPageService';

interface PostDataType {
  key: React.Key;
  id: number;
  context: string;
  hashTag: string | null;
  title: string | null;
  imageList: string[] | [];
  createAt: string | null;
  likeCount: number;
  dislikeCount: number;
  commentCount: number;
  viewCount: number;
  topicTag: any | null;
  user: any | null;
}

const PostColumns: ColumnsType<PostDataType> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    sorter: (a, b) => a.id - b.id,
    showSorterTooltip: false,
  },
  {
    title: 'Tiêu đề và Hashtag',
    key: 'Title & HashTag',
    render: (record) => (
      <s.WrapperTitle>
        <span>Tiêu dề: {record.title}</span>
        <span>Hashtag: {record.hashTag}</span>
        <span>
          Chủ đề:
          <s.TagsWrapper>
            <Tag key={record.topicTag.id} title={record.topicTag.tagName} bgColor={record.topicTag.color} />
          </s.TagsWrapper>
        </span>
      </s.WrapperTitle>
    ),
  },
  {
    title: 'Chi tiết bài viết',
    key: 'context',
    render: (record) => (
      <s.WrapperPost>
        {record.imageList.map((img: string) => (
          <s.ImgWrapper>
            <Image src={`http://149.51.37.29:8081/local-store/${img}`} width={100} height={100}></Image>
          </s.ImgWrapper>
        ))}
        <s.ContextWrapper>{record.context}</s.ContextWrapper>
      </s.WrapperPost>
    ),
  },
  {
    title: 'Người Đăng',
    key: 'User',
    render: (record) => (
      <s.WrapperUser>
        <s.ImgWrapper>
          <Image
            src={record.user.imageUrl ? `http://149.51.37.29:8081/local-store/${record.user.imageUrl}` : dfavt}
            width={100}
            height={100}
          ></Image>
        </s.ImgWrapper>
        <s.TitleWrapper>
          <s.Title level={5}>
            {record.user.name} {record.user.isExpert ? <CheckCircleTwoTone /> : null}
          </s.Title>
        </s.TitleWrapper>
      </s.WrapperUser>
    ),
  },
  {
    title: 'Thống kê',
    key: 'Statistic',
    render: (record) => (
      <s.WrapperStatistic>
        <span>Số lượng like: {record.likeCount}</span>
        <span>Số lượng dislike: {record.dislikeCount}</span>
        <span>Số lượng bình luận: {record.commentCount}</span>
        <span>Số lượng lượt xem: {record.viewCount}</span>
      </s.WrapperStatistic>
    ),
  },
];

const PostManager: React.FC = () => {
  const { t } = useTranslation();
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [admin, setAdmin] = useState<boolean>(false);
  const [isOpenAdd, setIsOpenAdd] = useState<boolean>(false);
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);
  const [isOpenCancel, setIsOpenCancel] = useState<boolean>(false);
  const [postData, setPostData] = useState<any>([]);
  const [postSelected, setPostSelected] = useState<any>({});

  const [isOpenConfirmCancel, setIsOpenConfirmCancel] = useState<boolean>(false);
  useEffect(() => {
    setIsLoading(true);
    setIsPending(false);

    PostPageService.GetPosts(' ', 0).then((data: any) => {
      const resData: any = [];
      if (data.status === 1) {
        data.data.forEach((item: any) => {
          resData.push({
            ...item,
            key: item.id,
          });
        });
      }
      setIsLoading(false);
      setPostData(resData);
    });
  }, []);

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setPostSelected(null);
      selectedRows.forEach((item: any) => {
        const temp = postData.find((x: any) => x.id === item.id);
        setPostSelected(temp);
      });
    },
    getCheckboxProps: (record: any) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };
  return (
    <>
      <PageTitle>Trang quản lý Post</PageTitle>
      <s.TablesWrapper>
        <s.Card
          title={t('Post Manager')}
          extra={
            !isPending ? (
              <div style={{ display: 'flex' }}>
                {admin ? (
                  <Button severity="success" onClick={() => setIsOpenAdd(true)}>
                    {t('common.add')}
                  </Button>
                ) : (
                  <div />
                )}
                {admin ? (
                  <Button severity="info" style={{ marginLeft: '15px' }} onClick={() => setIsOpenEdit(true)}>
                    {t('common.edit')}
                  </Button>
                ) : (
                  <div />
                )}
                {admin ? (
                  <Button severity="error" style={{ marginLeft: '15px' }} onClick={() => setIsOpenDelete(true)}>
                    {t('common.delete')}
                  </Button>
                ) : (
                  <div />
                )}
                {status === 'running' && (
                  <Button severity="error" style={{ marginLeft: '15px' }} onClick={() => setIsOpenCancel(true)}>
                    {t('common.cancel')}
                  </Button>
                )}
                {status === 'cancel' && (
                  <Button severity="error" style={{ marginLeft: '15px' }} onClick={() => setIsOpenConfirmCancel(true)}>
                    {t('common.cofirmCancel')}
                  </Button>
                )}
              </div>
            ) : (
              <div style={{ display: 'flex' }}></div>
            )
          }
        >
          <Row style={{ width: '100%', marginTop: '10px' }}>
            <Col md={24}>
              <Table
                dataSource={postData}
                columns={PostColumns}
                scroll={{ x: 2000 }}
                loading={isLoading}
                rowSelection={{
                  type: 'radio',
                  ...rowSelection,
                }}
              />
            </Col>
          </Row>
        </s.Card>
      </s.TablesWrapper>
    </>
  );
};

export default PostManager;
