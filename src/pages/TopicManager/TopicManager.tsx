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

const TopicManager: React.FC = () => {
  const { t } = useTranslation();
  const [topicsData, setTopicsData] = useState<any>([]);

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
    const resData: any = [];

    setIsPending(false);

    TopicService.GetTopics('').then((data: any) => {
      if (data.status === 1) {
        setTopicsData(data.data);
        setIsLoading(false);
      }
    });
  }, []);
  const onCloseModelAdd = () => {
    setIsOpenAdd(false);
    formAdd.resetFields();
  };
  const onFinishAdd = () => {
    0;

    OrderService.insertOrder(data).then((res: any) => {
      if (res.status === 'success') {
        notificationController.success({
          message: 'Add Order Success',
        });
        ListData.splice(index, 1);
        setChannelAddData((prevState: any) => {
          const newState = prevState.map((obj: any) => {
            if (data.channel_id === obj.channel_id) {
              return { ...obj, state: 1 };
            }

            return obj;
          });

          return newState;
        });
      }
    });
  };

  return (
    <>
      <PageTitle>Trang quản lý Topic</PageTitle>
      <s.TablesWrapper>
        <s.Card
          title={'Quản lý Topic'}
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
              </div>
            ) : (
              <div style={{ display: 'flex' }}></div>
            )
          }
        >
          <Row style={{ width: '100%', marginTop: '10px' }}>
            <Col md={24}>
              <Table dataSource={topicsData} columns={UserColumns} scroll={{ x: 1500 }} loading={isLoading} />
            </Col>
          </Row>
        </s.Card>
      </s.TablesWrapper>
      <Modal
        title={t('common.add') + ' ' + t('common.order')}
        visible={isOpenAdd}
        onCancel={() => onCloseModelAdd()}
        width={1000}
        footer={[
          <>
            <Button style={{ display: 'inline' }} onClick={() => onCloseModelAdd()}>
              {t('common.close')}
            </Button>

            <Button
              style={{ display: 'inline' }}
              type="primary"
              className="btn btn-primary"
              form="addTopic"
              onClick={() => onFinishAdd()}
            >
              {t('common.AddList')}
            </Button>
          </>,
        ]}
      >
        <Form name="addTopic" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} form={formAdd}>
          <Form.Item label={t('common.channel_id')} name="channel_id" required>
            <Input style={{ width: '100%' }} required />
          </Form.Item>
          <Form.Item label={t('common.priority')} name="priority"></Form.Item>
          <Form.Item label={t('common.subscribe_need')} name="sub_need" required>
            <InputNumber style={{ width: '100%' }} min={0} required />
          </Form.Item>
          <Form.Item label={t('common.note')} name="note" required>
            <Input style={{ width: '100%' }} required />
          </Form.Item>
          <Form.Item name="btn" required style={{ float: 'right' }}>
            <Button
              style={{ display: 'inline' }}
              type="primary"
              className="btn btn-primary"
              form="addOrder"
              key="submit"
              htmlType="submit"
            >
              {t('common.add')}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default TopicManager;
