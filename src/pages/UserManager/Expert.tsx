import React, { useEffect, useState } from 'react';
import { Col, Row, Modal, Form, Image } from 'antd';
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
import { CheckCircleTwoTone } from '@ant-design/icons';
import { notificationController } from '@app/controllers/notificationController';

import { UpdateExpert } from './UpdateExpert';
import { AddExpert } from './AddExpert';

const Expert: React.FC = () => {
  const { t } = useTranslation();
  const [usersData, setusersData] = useState<any>([]);

  const [userSelected, setuserSelected] = useState<any>(null);

  const [isOpenAdd, setIsOpenAdd] = useState<boolean>(false);
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    setIsPending(false);
    UserService.GetUsers(initData).then((data: any) => {
      const resData: any = [];
      if (data.status === 1) {
        data.data.forEach((item: any) => {
          resData.push({
            ...item,
            key: item.id,
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
        const temp = usersData.find((x: any) => x.id === item.id);
        setuserSelected(temp);
      });
    },
    getCheckboxProps: (record: any) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };
  const onDeleteUser = () => {
    UserService.DelUsers(userSelected.id).then((data: any) => {
      if (data.status === 1) {
        notificationController.success({
          message: 'Xoá Chuyên gia thành công',
        });
        setIsLoading(true);
        setIsPending(false);
        UserService.GetUsers(initData).then((data: any) => {
          const resData: any = [];
          if (data.status === 1) {
            data.data.forEach((item: any) => {
              resData.push({
                ...item,
                key: item.id,
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
  const onUpdateSuccess = (key: boolean) => {
    if (key) {
      notificationController.success({
        message: 'Cập nhập Chuyên gia thành công',
      });
      setIsLoading(true);
      setIsPending(false);
      UserService.GetUsers(initData).then((data: any) => {
        const resData: any = [];
        if (data.status === 1) {
          data.data.forEach((item: any) => {
            resData.push({
              ...item,
              key: item.id,
            });
          });
          setusersData(resData);
          setIsOpenEdit(false);
          setIsLoading(false);
        }
      });
    }
  };
  const onAddSuccess = (key: boolean) => {
    if (key) {
      notificationController.success({
        message: 'Thêm Chuyên gia thành công',
      });
      setIsLoading(true);
      setIsPending(false);
      UserService.GetUsers(initData).then((data: any) => {
        const resData: any = [];
        if (data.status === 1) {
          data.data.forEach((item: any) => {
            resData.push({
              ...item,
              key: item.id,
            });
          });
          setusersData(resData);
          setIsOpenAdd(false);
          setIsLoading(false);
        }
      });
    }
  };
  return (
    <>
      <PageTitle>Trang quản lý User</PageTitle>
      <s.TablesWrapper>
        <s.Card
          title={'Quản lý Chuyên gia'}
          extra={
            <div style={{ display: 'flex' }}>
              {admin ? (
                <Button severity="success" onClick={() => setIsOpenAdd(true)}>
                  {t('common.add')}
                </Button>
              ) : (
                <div />
              )}
              {userSelected && admin ? (
                <Button severity="info" style={{ marginLeft: '15px' }} onClick={() => setIsOpenEdit(true)}>
                  {t('common.edit')}
                </Button>
              ) : (
                <div />
              )}
              {userSelected && admin ? (
                <Button severity="error" style={{ marginLeft: '15px' }} onClick={() => setIsOpenDelete(true)}>
                  {t('common.delete')}
                </Button>
              ) : (
                <div />
              )}
            </div>
          }
        >
          <Row style={{ width: '100%', marginTop: '10px' }}>
            <Col md={24}>
              <Table
                dataSource={usersData}
                columns={UserColumns}
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
      <Modal
        title={t('common.delete') + ' Chuyên gia'}
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
        <div>Bạn muốn xoá chuyên gia này ?</div>
      </Modal>
      {userSelected && (
        <Modal
          title="Cập nhập thông tin"
          visible={isOpenEdit}
          onCancel={() => setIsOpenEdit(false)}
          footer={[
            <>
              <Button style={{ display: 'inline' }} onClick={() => setIsOpenEdit(false)}>
                Đóng
              </Button>
            </>,
          ]}
        >
          <UpdateExpert id={userSelected.id!} onUpdateSuccess={onUpdateSuccess} />
        </Modal>
      )}
      <Modal
        title="Cập nhập thông tin"
        visible={isOpenAdd}
        onCancel={() => setIsOpenAdd(false)}
        footer={[
          <>
            <Button style={{ display: 'inline' }} onClick={() => setIsOpenAdd(false)}>
              Đóng
            </Button>
          </>,
        ]}
      >
        <AddExpert onAddSuccess={onAddSuccess} />
      </Modal>
    </>
  );
};

export default Expert;
