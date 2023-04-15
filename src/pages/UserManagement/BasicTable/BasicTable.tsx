import React, { useEffect, useState, useCallback } from 'react';
import { Col, Divider, Form, Input, InputNumber, Modal, Row, Space, TablePaginationConfig } from 'antd';
import { BasicTableRow, getBasicTableData, Pagination, Tag } from 'api/table.api';
import { Table } from 'components/common/Table/Table';
import { Button } from 'components/common/buttons/Button/Button';
import { useTranslation } from 'react-i18next';
import { notificationController } from 'controllers/notificationController';
import { useMounted } from '@app/hooks/useMounted';
import UserManagementService from '../UserManagementService';
import { PointHistory } from '../PointModal/PointHistory';
import { AddPointForm } from '../PointModal/AddPoint';
import moment from 'moment';

const initialPagination: Pagination = {
  current: 1,
  pageSize: 5,
};

export const BasicTable: React.FC = () => {
  const [tableData, setTableData] = useState<{ data: any; pagination: Pagination; loading: boolean }>({
    data: [],
    pagination: initialPagination,
    loading: false,
  });
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
  const [isOpenPointHistory, setIsOpenPointHistory] = useState<boolean>(false);
  const [isOpenPointAddForm, setIsOpenPointAddForm] = useState<boolean>(false);
  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);
  const [userSelected, setUserSelected] = useState<number>(0);
  const [pointHistory, setPointHistory] = useState<any>();
  const { t } = useTranslation();
  const { isMounted } = useMounted();
  const [form] = Form.useForm();

  useEffect(() => {
    getUserListData();
  }, []);

  const onFinishUpdate = (value: any) => {
    let dataUpdate;
    if (value.newPassword == null) {
      dataUpdate = {
        id: userSelected,
        discount: value.discount,
      };
    } else {
      dataUpdate = {
        id: userSelected,
        discount: value.discount,
        password: value.newPassword,
      };
    }
    UserManagementService.updateUserInfo(dataUpdate).then((res: any) => {
      if (res.status === 'success') {
        notificationController.success({
          message: 'Update Success',
        });
        getUserListData();
        setIsOpenEdit(false);
      } else {
        notificationController.error({
          message: res.message,
        });
      }
    });
  };

  const handleEditUser = async (userId: number) => {
    setUserSelected(userId);
    const findUser = await tableData.data.find((x: any) => x.id === userId);
    form.setFieldsValue({
      username: findUser.username,
      discount: findUser.discount,
    });
    setIsOpenEdit(true);
  };

  const getUserListData = () => {
    UserManagementService.getUserList().then((dataRes: any) => {
      setTableData({ ...tableData, data: dataRes.data });
    });
  };

  const handleCancelEdit = async () => {
    setUserSelected(0);
    setIsOpenEdit(false);
  };

  const columns: any = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: t('common.username'),
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: t('common.discount'),
      dataIndex: 'discount',
      key: 'discount',
    },

    {
      title: t('common.last_order_time'),
      dataIndex: 'last_order_time',
      key: 'last_order_time',
      render: (last_order_time: any) => `${moment(last_order_time).format('DD-MM-YYYY, h:mm:ss a')}`,
    },
    {
      title: t('common.point'),
      dataIndex: 'point',
      key: 'point',
    },
    {
      title: t('common.total_order_number'),
      dataIndex: 'total_order_number',
      key: 'total_order_number',
    },
    {
      title: t('common.api_key'),
      dataIndex: 'api_key',
      key: 'api_key',
    },
    {
      title: t('common.max_thread'),
      dataIndex: 'max_thread',
      key: 'max_thread',
    },

    {
      title: t('tables.actions'),
      dataIndex: 'actions',
      width: '15%',
      align: 'center',
      render: (_: any, value: any) => {
        return (
          <Space>
            <Button
              type="ghost"
              onClick={() => {
                handleEditUser(value.id);
              }}
            >
              {t('common.edit')}
            </Button>
            <Button
              type="primary"
              onClick={() => {
                openPointHistory(value.id);
              }}
            >
              {t('common.PointHistory')}
            </Button>
            <Button
              type="dashed"
              onClick={() => {
                openPointAddForm(value.id);
              }}
            >
              {t('common.add') + ' ' + t('common.Point')}
            </Button>
          </Space>
        );
      },
    },
  ];

  const closePointHistory = () => {
    setIsOpenPointHistory(false);
  };

  const openPointHistory = (userId: number) => {
    UserManagementService.getPointHistory(userId).then((res: any) => {
      setPointHistory(res.data);
      setIsOpenPointHistory(true);
    });
  };

  const openPointAddForm = (userId: number) => {
    setUserSelected(userId);
    setIsOpenPointAddForm(true);
    // UserManagementService.getPointHistory(userId).then((res:any)=>{
    //   setPointHistory(res.points);
    //   setIsOpenPointHistory(true);
    // })
  };
  const closePointAddForm = () => {
    getUserListData();
    setIsOpenPointAddForm(false);
  };

  return (
    <>
      <Table columns={columns} dataSource={tableData.data} loading={tableData.loading} scroll={{ x: 800 }} bordered />
      <PointHistory PointData={pointHistory} closeModal={closePointHistory} isOpen={isOpenPointHistory} />
      <AddPointForm userId={userSelected} closeModal={closePointAddForm} isOpen={isOpenPointAddForm} />
      <Modal
        title={t('common.userEdit')}
        visible={isOpenEdit}
        onCancel={() => handleCancelEdit()}
        footer={[
          <>
            <Button style={{ display: 'inline' }} onClick={() => handleCancelEdit()}>
              {t('common.close')}
            </Button>
            <Button
              style={{ display: 'inline' }}
              type="primary"
              className="btn btn-primary"
              form="updateSetting"
              key="submit"
              htmlType="submit"
            >
              {t('common.edit')}
            </Button>
          </>,
        ]}
      >
        <Form
          name="updateSetting"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinishUpdate}
          form={form}
        >
          <Form.Item label={t('common.username')} name="username" key="username">
            <Input disabled style={{ width: 300, marginLeft: '10px' }} />
          </Form.Item>
          <Form.Item label={t('common.discount')} name="discount" key="discount">
            <InputNumber style={{ width: 300, marginLeft: '10px' }} min={0} />
          </Form.Item>
          <Divider style={{ fontSize: '14px' }} plain key="divi">
            {t('common.blank')}
          </Divider>
          <Form.Item label={t('common.newPassword')} name="newPassword" key="newPassword">
            <Input.Password placeholder={t('common.newPassword')} style={{ width: 300, marginLeft: '10px' }} />
          </Form.Item>
          <Form.Item
            label={t('common.confirmNewPassword')}
            name="confirmNewPassword"
            key="confirmNewPassword"
            dependencies={['newPassword']}
            hasFeedback
            rules={[
              ({ getFieldValue }) => ({
                required: getFieldValue('newPassword') ? true : false,
                message: 'Please confirm your password!',
              }),
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error(t('common.notmatch')));
                },
              }),
            ]}
          >
            <Input.Password placeholder={t('common.confirmNewPassword')} style={{ width: 300, marginLeft: '10px' }} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
