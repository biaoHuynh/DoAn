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

const postData = [
  {
    id: 3,
    title: 'Thuỷ Đậu ở trẻ em',
    summary: 'Thuỷ Đậu ở trẻ em',
    context: 'Thuỷ Đậu ở trẻ em',
    hashTag: 'thuyDau',
    imageList: ['4e523726-e78f-40aa-ac6c-296d8cd5c38c.png'],
    createAt: '2023-05-02 06:00:00.000',
    likeCount: 4,
    dislikeCount: null,
    commentCount: 2,
    shareCount: null,
    isLike: true,
    isDislike: false,
    viewCount: 1049,
    topicTag: {
      id: 1,
      color: '#ffc3a0',
      tagName: 'Sức Khỏe',
    },
    user: {
      id: 5,
      name: 'BS.CK2  Lê Vi Anh',
      email: 'levianh@gmail.com',
      imageUrl: 'a4d03166-4f4b-4285-b313-ed45c218db27.jpeg',
      isExpert: true,
      rating: 0.0,
      status: 0,
      lastTime: null,
    },
  },
  {
    id: 2,
    title: '8 bệnh thường gặp ở trẻ em dưới 5 tuổi',
    summary: '8 bệnh thường gặp ở trẻ em dưới 5 tuổi',
    context:
      'Viêm đường hô hấp  Bệnh lý về đường hô hấp là loại bệnh thường hay gặp nhất ở trẻ em, đặc biệt là trẻ nhỏ dưới 5 tuổi.  Viêm đường hô hấp gồm 2 loại: viêm đường hô hấp trên và viêm đường hô hấp dưới. Trong đó phổ biến nhất là các bệnh viêm đường hô hấp trên gồm viêm mũi-họng, VA, viêm Amidan. Vì cơ quan này là “cửa ngõ” hô hấp, tiếp xúc trực tiếp với môi trường bên ngoài. Các bệnh viêm đường hô hấp dưới thường hay gặp là viêm phế quản, viêm tiểu phế quản, viêm phổi.  Thông thường các bệnh lý viêm đường hô hấp trên nếu không được xử trí triệt để dễ biến chứng viêm đường hô hấp dưới.  Tác nhân gây viêm đường hô hấp trên chủ yếu là virus (chiếm hơn 70%, còn lại là vi khuẩn, nấm Candida, …), trong đó các bệnh viêm đường hô hấp dưới đa phần là do vi khuẩn gây ra. Việc sử dụng kháng sinh chỉ được khuyên áp dụng trong trường hợp vi khuẩn gây bệnh. Do đó, ba mẹ nên cho trẻ đi thăm khám với bác sĩ chuyên khoa Nhi để có chỉ định xử dụng thuốc phù hợp và sử dụng kháng sinh khi thật sự cần thiết.  Suy dinh dưỡng  Bệnh suy dinh dưỡng ở trẻ thường do nhiều nguyên nhân khác nhau gây ra, như thiếu chất protein và năng lượng; bị tiêu chảy cấp tính hoặc kéo dài nên kém hấp thụ các chất dinh dưỡng; bị nhiễm virus, vi khuẩn; thiếu hụt các vitamin và chất dinh dưỡng cần thiết,…  Nếu để bé bị suy dinh dưỡng kéo dài sẽ làm suy giảm sức đề kháng và hệ miễn dịch, khả năng chống chọi với sự xâm nhập các virus, vi khuẩn, ký sinh trùng gây bệnh kém nên dễ dẫn đến nhiều bệnh tật. Trẻ dưới 5 tuổi bị suy dinh dưỡng nên đi khám dinh dưỡng định kỳ để bổ sung cho phù hợp.  Bệnh giun, sán  Giun, sán lâu ngày có thể khiến bé bị thiếu máu, thiếu hụt chất dinh dưỡng vì phần dinh dưỡng đó đã phần nào bị chúng hấp thụ. Có thể gây các bệnh nhiễm khuẩn đường tiêu hóa. Đặc biệt khi nhiễm trùng giun sán có thể gây ra một số trường hợp nguy hiểm như run chui ống mật, viêm màng não,… Vì vậy, các bậc phụ huynh không nên tẩy giun định kỳ cho con 6 tháng/ 1 lần theo sự hướng dẫn của bác sĩ chuyên khoa nhi.',
    hashTag: '8benhthuonggapotreem',
    imageList: ['583f3621-1240-4753-9b91-7f54932a1cd5.jpeg'],
    createAt: '2023-05-02 06:00:00.000',
    likeCount: 1,
    dislikeCount: null,
    commentCount: null,
    shareCount: null,
    isLike: true,
    isDislike: false,
    viewCount: 760,
    topicTag: {
      id: 1,
      color: '#ffc3a0',
      tagName: 'Sức Khỏe',
    },
    user: {
      id: 2,
      name: 'BS.CK1 Nguyễn Hồng Dũng',
      email: 'hongdung@gmail.com',
      imageUrl: '000997a9-ace6-4a0b-933f-49c5005d4177.jpeg',
      isExpert: true,
      rating: 0.0,
      status: 0,
      lastTime: '2023-05-02 19:50:32',
    },
  },
  {
    id: 1,
    title: 'Đảm bảo sức khỏe cho trẻ em như thế nào?',
    summary: 'Đảm bảo sức khỏe cho trẻ em như thế nào?',
    context:
      'Trẻ 2 tuổi rất năng động, bé thích vui chơi đùa nghịch cả ngày nên nhu cầu về nguồn năng lượng cũng cần tăng cả về số lượng và chất lượng. Lúc này bé không chỉ ăn cháo và uống sữa mà cũng cần được cho ăn cơm nát thường xuyên 2 bữa/ngày.  Các loại thực phẩm trong bữa ăn cũng cần đa dạng bao gồm thịt, cá, tôm, cua, trứng, đậu, rau xanh, hoa quả... Mỗi ngày bé cần uống 500 - 600ml sữa (có thể sữa tươi, sữa công thức), sữa chua và các chế phẩm từ sữa.  Trong thực đơn cho bé 2 tuổi cần cung cấp đủ chất tinh bột, đạm, chất béo, vitamin và khoáng chất. Ngoài ra, trẻ 2 tuổi đã ăn được khá nhiều loại thực phẩm khác nhau nên mẹ cần đa dạng thực đơn để bé thay đổi khẩu vị thường xuyên và ăn ngon miệng. ',
    hashTag: 'dambaosuckhoecontre',
    imageList: ['90b0eed2-49a4-4f13-9fff-cdbfca5a64fa.jpeg'],
    createAt: '2023-05-02 06:00:00.000',
    likeCount: 2,
    dislikeCount: null,
    commentCount: 3,
    shareCount: null,
    isLike: true,
    isDislike: false,
    viewCount: 1013,
    topicTag: {
      id: 1,
      color: '#ffc3a0',
      tagName: 'Sức Khỏe',
    },
    user: {
      id: 5,
      name: 'BS.CK2  Lê Vi Anh',
      email: 'levianh@gmail.com',
      imageUrl: 'a4d03166-4f4b-4285-b313-ed45c218db27.jpeg',
      isExpert: true,
      rating: 0.0,
      status: 0,
      lastTime: null,
    },
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
  const [isOpenConfirmCancel, setIsOpenConfirmCancel] = useState<boolean>(false);
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
              <Table dataSource={postData} columns={PostColumns} scroll={{ x: 2000 }} loading={isLoading} />
            </Col>
          </Row>
        </s.Card>
      </s.TablesWrapper>
    </>
  );
};

export default PostManager;
