import React, { useEffect, useState } from 'react';
import { Col, Row, DatePicker, Space, Modal, Form, InputNumber, Select, notification, Input, Radio, Image } from 'antd';

const { Search } = Input;
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
import { CheckCircleOutlined, CheckCircleTwoTone, CloseCircleOutlined } from '@ant-design/icons';
import { notificationController } from '@app/controllers/notificationController';
import { AnyIfEmpty } from 'react-redux';
import { getData } from 'country-list';
import { number } from 'echarts';
import userService from './UserPageService';

const Reported: React.FC = () => {
  const { t } = useTranslation();
  const [usersData, setusersData] = useState<any>([]);

  const [userSelected, setuserSelected] = useState<any>(null);
  const [isOpenAdd, setIsOpenAdd] = useState<boolean>(false);
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);
  const [isOpenCancel, setIsOpenCancel] = useState<boolean>(false);
  const [isOpenConfirmCancel, setIsOpenConfirmCancel] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [keyWord, setKeyWord] = useState<any>();

  const [admin, setAdmin] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);

  interface UserListSelectType {
    lable: string;
    value: string;
  }
  interface UserDataType {
    key: React.Key;
    name: string;
    email: string;
    userId: number;
    report: number;
    imageUrl: number;
    reasons: Array<string> | null;
  }
  const initData = {
    name: '',
    email: '',
  };
  const UserColumns: ColumnsType<UserDataType> = [
    {
      title: 'UID',
      dataIndex: 'userId',
      key: 'userId',
      sorter: (a, b) => a.userId - b.userId,
      showSorterTooltip: false,
    },
    {
      title: 'Thông tin',
      key: 'info',
      render: (record) => (
        <s.WrapperUser>
          <s.ImgWrapper>
            <Image
              src={record.imageUrl ? `http://149.51.37.29:8081/local-store/${record.imageUrl}` : dfavt}
              width={100}
              height={100}
              preview={false}
            ></Image>
          </s.ImgWrapper>
          <s.TitleWrapper>
            <s.Title level={5}>{record.name}</s.Title>
          </s.TitleWrapper>
        </s.WrapperUser>
      ),
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
      title: 'Số lượng report',
      dataIndex: 'report',
      key: 'report',
      sorter: (a, b) => a.report - b.report,
      showSorterTooltip: false,
    },

    {
      title: 'Lí do',
      key: 'reasons',
      render: (record: any) => (
        <s.WrapperUser>
          {record.reasons !== null ? record?.reasons?.map((item: any) => <p>{item}</p>) : <div />}
        </s.WrapperUser>
      ),
      showSorterTooltip: false,
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
    setIsPending(false);
    UserService.GetReport(initData).then((data: any) => {
      const resData: any = [];
      if (data.status === 1) {
        data.data.forEach((item: any) => {
          resData.push({
            ...item,
            key: item.userId,
          });
        });
        setusersData(resData);
        setIsLoading(false);
      }
    });
  }, []);
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setuserSelected(null);
      selectedRows.forEach((item: any) => {
        const temp = usersData.find((x: any) => x.userId === item.userId);
        setuserSelected(temp);
      });
    },
    getCheckboxProps: (record: any) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };
  const onDeleteUser = () => {
    UserService.DelUsers(userSelected.userId).then((data: any) => {
      if (data.status === 1) {
        notificationController.success({
          message: 'Xoá người dùng thành công',
        });
        setIsLoading(true);
        setIsPending(false);
        UserService.GetReport(initData).then((data: any) => {
          const resData: any = [];
          if (data.status === 1) {
            data.data.forEach((item: any) => {
              resData.push({
                ...item,
                key: item.userId,
              });
            });
            setusersData(resData);
            setIsOpenDelete(false);
            setIsLoading(false);
            setuserSelected(null);
          }
        });
      }
    });
  };
  const onSearch = (value: string) => {
    setKeyWord(value.trim());

    userService
      .GetUsers({
        name: value.trim(),
        email: '',
      })
      .then((data: any) => {
        const resData: any = [];
        if (data.status === 1) {
          data.data.forEach((item: any) => {
            resData.push({
              ...item,
              key: item.userId,
            });
          });
        }
        setusersData(resData);
      });
  };
  return (
    <>
      <PageTitle>Trang quản lý vi phạm</PageTitle>
      <s.TablesWrapper>
        <Search style={{ width: '30%' }} placeholder="Tìm kiếm người vi phạm" enterButton onSearch={onSearch} />
        <s.Card
          title={'Quản lý người vi phạm'}
          extra={
            userSelected ? (
              <div style={{ display: 'flex' }}>
                {admin ? (
                  <Button severity="error" style={{ marginLeft: '15px' }} onClick={() => setIsOpenDelete(true)}>
                    {t('common.delete')}
                  </Button>
                ) : (
                  <div />
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
                dataSource={usersData}
                columns={UserColumns}
                scroll={{ x: 1000 }}
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
      <Modal
        title={t('common.delete') + 'Người dùng'}
        visible={isOpenDelete}
        onCancel={() => setIsOpenDelete(false)}
        footer={[
          <>
            <Button style={{ display: 'inline' }} onClick={() => setIsOpenDelete(false)}>
              {t('common.close')}
            </Button>
            <Button
              style={{ display: 'inline' }}
              type="primary"
              className="btn btn-primary"
              onClick={() => onDeleteUser()}
              danger
            >
              {t('common.delete')}
            </Button>
          </>,
        ]}
      >
        <div>Bạn muốn xoá người dùng này ?</div>
      </Modal>
    </>
  );
};

export default Reported;
