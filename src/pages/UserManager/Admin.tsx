import React, { useEffect, useState } from 'react';
import { Col, Row, DatePicker, Space, Modal, Form, InputNumber, Select, notification, Input, Radio } from 'antd';
import { Table } from 'components/common/Table/Table';
import { useTranslation } from 'react-i18next';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import * as S from '@app/pages/uiComponentsPages//UIComponentsPage.styles';
import UserService from './UserPageService';
import { Button } from '@app/components/common/buttons/Button/Button';
import * as s from './Tables.styles';

import moment from 'moment';
import { ColumnsType } from 'antd/es/table';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationOutlined,
  FireOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import { notificationController } from '@app/controllers/notificationController';
import { AnyIfEmpty } from 'react-redux';
import { getData } from 'country-list';
import { number } from 'echarts';

const Admin: React.FC = () => {
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
    role: ['admin'],
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
      title: 'name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      showSorterTooltip: false,
    },
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
      showSorterTooltip: false,
    },
    {
      title: 'emailVerified',
      dataIndex: 'emailVerified',
      key: 'emailVerified',
    },
    {
      title: 'role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'status',
      dataIndex: 'status',
      key: 'status',
    },

    {
      title: 'phoneNumber',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'createAt',
      dataIndex: 'createAt',
      key: 'createAt',
    },
    {
      title: 'updateAt',
      dataIndex: 'updateAt',
      key: 'updateAt',
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
          title={t('common.order_list')}
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

export default Admin;
