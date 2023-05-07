import React, { useEffect, useState } from 'react';
import { Col, Row, DatePicker, Space, Modal, Form, InputNumber, Select, notification, Input, Radio } from 'antd';
import { Table } from 'components/common/Table/Table';
import { useTranslation } from 'react-i18next';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import * as S from '@app/pages/uiComponentsPages//UIComponentsPage.styles';
import TopicService from './TopicPageService';
import { Button } from '@app/components/common/buttons/Button/Button';
import * as s from './Tables.styles';

import moment from 'moment';
import { ColumnsType } from 'antd/es/table';
import Panel from 'rc-color-picker/lib/Panel';
import { Card } from 'components/common/Card/Card';
import { notificationController } from '@app/controllers/notificationController';
import InputColor from './InputColor';

const TopicManager: React.FC = () => {
  const { t } = useTranslation();
  const [topicsData, setTopicsData] = useState<any>([]);
  const [topicsSelected, setTopicsSelected] = useState<any>(null);
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
    tagName: string;
    color: string;
    createAt: string;
    userCreate: string;
  }
  const initData = {
    name: '',
    email: '',
    provider: [],
    role: ['user'],
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
      title: 'Tag Name',
      dataIndex: 'tagName',
      key: 'tagName',
      sorter: (a, b) => a.tagName.localeCompare(b.tagName),
      showSorterTooltip: false,
    },
    {
      title: 'Color',
      dataIndex: 'color',
      key: 'color',
      sorter: (a, b) => a.color.localeCompare(b.color),
      showSorterTooltip: false,
      render: (color) => {
        return (
          <div>
            <Button style={{ background: color }}>{color}</Button>
          </div>
        );
      },
    },
    {
      title: 'Create At',
      dataIndex: 'createAt',
      key: 'createAt',
    },
    {
      title: 'User Create',
      dataIndex: 'userCreate',
      key: 'userCreate',
      sorter: (a, b) => a.userCreate.localeCompare(b.userCreate),
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

    TopicService.GetTopics('').then((data: any) => {
      const resData: any = [];
      if (data.status === 1) {
        data.data.forEach((item: any) => {
          resData.push({
            ...item,
            key: item.id,
          });
        });
        setTopicsData(resData);
        setIsLoading(false);
      }
    });
  }, []);
  const onCloseModelAdd = () => {
    setIsOpenAdd(false);
    formAdd.resetFields();
  };
  const onFinishAdd = (value: any) => {
    const tagName = value.tagName;
    const color = value.color.color;
    TopicService.AddTopics({ tagName: tagName, color: color }).then((res: any) => {
      if (res.status === 1) {
        notificationController.success({
          message: 'Thêm chủ đề thành công',
        });
        setIsLoading(true);
        setIsPending(false);
        onCloseModelAdd();
        TopicService.GetTopics('').then((data: any) => {
          const resData: any = [];
          if (data.status === 1) {
            data.data.forEach((item: any) => {
              resData.push({
                ...item,
                key: item.id,
              });
            });
            setTopicsData(resData);
            setIsLoading(false);
          }
        });
      }
    });
  };

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      selectedRows.forEach((item: any) => {
        const temp = topicsData.find((x: any) => x.id === item.id);
        setTopicsSelected(temp);
      });
    },
    getCheckboxProps: (record: any) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };
  const onCloseModelUpdate = () => {
    setIsOpenEdit(false);
    form.resetFields();
  };
  const onFinishUpdate = (value: any) => {
    const tagName = value?.tagName ? value.tagName : topicsSelected.tagName;
    const color = value?.color?.color ? value.color.color : topicsSelected.color;
    TopicService.UpdateTopics({ id: topicsSelected.id, tagName: tagName, color: color }).then((res: any) => {
      if (res.status === 1) {
        notificationController.success({
          message: 'Cập nhập chủ đề thành công',
        });
        setIsLoading(true);
        setIsPending(false);
        onCloseModelUpdate();
        TopicService.GetTopics('').then((data: any) => {
          const resData: any = [];
          if (data.status === 1) {
            data.data.forEach((item: any) => {
              resData.push({
                ...item,
                key: item.id,
              });
            });
            setTopicsData(resData);
            setIsLoading(false);
          }
        });
      }
    });
  };
  return (
    <>
      <PageTitle>Trang quản lý Chủ đề</PageTitle>
      <s.TablesWrapper>
        <s.Card
          title={'Quản lý Chủ đề'}
          extra={
            !isPending ? (
              <div style={{ display: 'flex' }}>
                {admin ? (
                  <Button severity="success" onClick={() => setIsOpenAdd(true)}>
                    Thêm
                  </Button>
                ) : (
                  <div />
                )}
                {admin ? (
                  <Button
                    severity="info"
                    style={{ marginLeft: '15px' }}
                    onClick={() => setIsOpenEdit(true)}
                    disabled={topicsSelected === null}
                  >
                    Cập nhập
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
                dataSource={topicsData}
                columns={UserColumns}
                scroll={{ x: 1500 }}
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
      <Modal title={'Thêm Chủ đề'} visible={isOpenAdd} onCancel={() => onCloseModelAdd()} width={1000} footer={null}>
        <Form
          name="addTopic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          form={formAdd}
          onFinish={(value) => onFinishAdd(value)}
        >
          <Form.Item label={'Tên'} name="tagName" required>
            <Input style={{ width: '100%' }} required />
          </Form.Item>
          <Form.Item label={'Màu'} name="color" required>
            <InputColor />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Thêm
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {topicsSelected && (
        <Modal
          title={'Cập nhập Chủ đề'}
          visible={isOpenEdit}
          onCancel={() => onCloseModelUpdate()}
          footer={[
            <>
              <Button style={{ display: 'inline' }} onClick={() => onCloseModelUpdate()}>
                Đóng
              </Button>
              <Button
                style={{ display: 'inline' }}
                type="primary"
                className="btn btn-primary"
                form="updateOrder"
                key="submit"
                htmlType="submit"
              >
                Cập nhập
              </Button>
            </>,
          ]}
        >
          <Form
            name="updateOrder"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            onFinish={(value) => onFinishUpdate(value)}
            form={form}
          >
            <Form.Item label={'Tên'} name="tagName" required>
              <Input style={{ width: '100%' }} required defaultValue={topicsSelected.tagName} />
            </Form.Item>
            <Form.Item label={'Màu'} name="color" required>
              <InputColor color={topicsSelected.color} />
            </Form.Item>
          </Form>
        </Modal>
      )}
    </>
  );
};

export default TopicManager;
