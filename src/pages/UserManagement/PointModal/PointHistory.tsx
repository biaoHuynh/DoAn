import { Modal } from 'antd';
import { Table } from 'components/common/Table/Table';
import { Button } from 'components/common/buttons/Button/Button';
import moment from 'moment';
import { useEffect, useState } from 'react';
import UserManagementService from '../UserManagementService';
import { useTranslation } from 'react-i18next';

export const PointHistory = (Prop: any) => {
  const { t } = useTranslation();
  const columns: any = [
    {
      title: 'ID',
      dataIndex: 'user_id',
      key: 'user_id',
    },
    {
      title: t('common.point'),
      dataIndex: 'point',
      key: 'point',
    },
    {
      title: t('common.description'),
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: t('common.Date'),
      dataIndex: 'datetime',
      key: 'datetime',
      render: (_: any, value: any) => {
        const date = moment(value.datetime).format('DD-MM-YYYY HH:mm:ss');
        return <span>{date}</span>;
      },
    },
  ];

  return (
    <>
      <Modal
        title={t('common.pointHistory')}
        visible={Prop.isOpen}
        onCancel={() => Prop.closeModal()}
        footer={[
          <>
            <Button style={{ display: 'inline' }} onClick={() => Prop.closeModal()}>
              Close
            </Button>
          </>,
        ]}
        width={1000}
      >
        <Table columns={columns} dataSource={Prop.PointData} scroll={{ x: 800 }} bordered pagination={false} />
      </Modal>
    </>
  );
};
export const PointHistoryTable = (Prop: any) => {
  const [pointHistoryData, setPointHistoryData] = useState<any>([]);
  const columns: any = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'user_id',
    },
    {
      title: 'Point',
      dataIndex: 'point',
      key: 'point',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Date Time',
      dataIndex: 'datetime',
      key: 'datetime',
      render: (_: any, value: any) => {
        const date = moment(value.datetime).format('DD-MM-YYYY HH:mm:ss');
        return <span>{date}</span>;
      },
    },
  ];
  useEffect(() => {
    const getData: any = localStorage.getItem('UserData');
    const objDate = JSON.parse(getData);

    if (getData != null) {
      const idUser = objDate.id;
      UserManagementService.getPointHistory(idUser).then((res: any) => {
        setPointHistoryData(res.data);
      });
    }
  }, []);
  return <Table columns={columns} dataSource={pointHistoryData} scroll={{ x: 800 }} bordered pagination={false} />;
};
