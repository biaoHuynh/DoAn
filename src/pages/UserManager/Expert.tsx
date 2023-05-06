import React, { useEffect, useState } from 'react';
import { Col, Row, DatePicker, Space, Modal, Form, InputNumber, Select, notification, Input, Radio, Image } from 'antd';
import { Table } from 'components/common/Table/Table';
import { useTranslation } from 'react-i18next';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import UserService from './UserPageService';
import { Button } from '@app/components/common/buttons/Button/Button';
import * as s from './Tables.styles';
import dfavt from '@app/share/dfavt.png';

import moment from 'moment';
import 'moment/locale/vi';
import { ColumnsType } from 'antd/es/table';
import {
  CheckCircleOutlined,
  CheckCircleTwoTone,
  CloseCircleOutlined,
  ExclamationOutlined,
  FireOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import { notificationController } from '@app/controllers/notificationController';
import { AnyIfEmpty } from 'react-redux';
import { getData } from 'country-list';
import { number } from 'echarts';

const Expert: React.FC = () => {
  const { t } = useTranslation();
  const [usersData, setusersData] = useState<any>([]);

  const [isOpenAdd, setIsOpenAdd] = useState<boolean>(false);
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);
  const [isOpenCancel, setIsOpenCancel] = useState<boolean>(false);
  const [isOpenConfirmCancel, setIsOpenConfirmCancel] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [status, setStatus] = useState<string>('running');
  const [searchValue, setSearchValue] = useState<any>();
  const [form] = Form.useForm();
  const [formAdd] = Form.useForm();
  const [admin, setAdmin] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);

  interface UserListSelectType {
    lable: string;
    value: string;
  }
  interface UserDataType {
    key: React.Key;
    id: number;
    name: string;
    email: string;
    emailVerified: boolean;
    role: string;
    provider: string;
    topicId: string;
    status: number;
    phoneNumber: string | null;
    isExpert: boolean;
    jobTitle: string | null;
    specialist: string | null;
    workPlace: string | null;
    description: string | null;
    delFlg: boolean;
    createAt: string | null;
    updateAt: string | null;
    lastTime: string | null;
  }
  const initData = {
    name: '',
    email: '',
    provider: [],
    role: ['expert'],
  };
  const UserColumns: ColumnsType<UserDataType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
      showSorterTooltip: false,
    },
    {
      title: 'Thông tin',
      key: 'info',
      render: (record) => (
        <s.WrapperExpert>
          <s.WrapperUser>
            <s.ImgWrapper>
              <Image
                src={record.imageUrl ? `http://149.51.37.29:8081/local-store/${record.imageUrl}` : dfavt}
                width={100}
                height={100}
              ></Image>
            </s.ImgWrapper>
            <s.TitleWrapper>
              <s.Title level={5}>
                {record.name} {record.isExpert ? <CheckCircleTwoTone /> : null}
              </s.Title>
            </s.TitleWrapper>
          </s.WrapperUser>
        </s.WrapperExpert>
      ),
      sorter: (a, b) => a.name.localeCompare(b.name),
      showSorterTooltip: false,
    },
    {
      title: 'Chi tiết chuyên gia',
      key: 'detail',
      render: (record) => (
        <s.WrapperExpertInfo>
          {record.jobTitle && <span>Công việc: {record.jobTitle}</span>}
          {record.specialist && <span>Chuyên nghành: {record.specialist}</span>}
          {record.workPlace && <span>Nơi làm việc: {record.workPlace}</span>}
        </s.WrapperExpertInfo>
      ),
    },
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
      showSorterTooltip: false,
    },
    {
      title: 'Quyền',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Ngày tạo',
      key: 'createAt',
      render: (record) => <span>{moment(new Date(record.createAt)).locale('vi').format('hh:mm, DD MMMM YYYY')}</span>,
    },
    {
      title: 'Ngày cập nhật',
      key: 'updateAt',
      render: (record) => <span>{moment(new Date(record.updateAt)).locale('vi').format('hh:mm, DD MMMM YYYY')}</span>,
    },
  ];
  useEffect(() => {
    const getData: any = localStorage.getItem('UserData');
    const objDate = JSON.parse(getData);

    if (getData != null) {
      const isAdmin = objDate.role === 'admin' ? true : false;
      setAdmin(isAdmin);
      console.log(objDate, isAdmin);
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const resData: any = [];

    setIsPending(false);

    UserService.GetUsers(initData).then((data: any) => {
      if (data.status === 1) {
        setusersData(data.data);
        setIsLoading(false);
      }
    });
  }, []);
  return (
    <>
      <PageTitle>Trang quản lý User</PageTitle>
      <s.TablesWrapper>
        <s.Card
          title={'Quản lý Chuyên gia'}
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
              <Table dataSource={usersData} columns={UserColumns} scroll={{ x: 2000 }} loading={isLoading} />
            </Col>
          </Row>
        </s.Card>
      </s.TablesWrapper>
    </>
  );
};

export default Expert;
