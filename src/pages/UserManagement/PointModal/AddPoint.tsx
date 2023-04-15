import { Form, InputNumber, Modal } from 'antd';
import { Button } from 'components/common/buttons/Button/Button';
import { notificationController } from 'controllers/notificationController';
import { useTranslation } from 'react-i18next';
import UserManagementService from '../UserManagementService';

export const AddPointForm = (Props: any) => {
  const { t } = useTranslation();
  const onFinishAddPoint = (value: any) => {
    console.log(value);
    const data = { user_id: Props.userId, point: value.point };
    UserManagementService.addPoint(data).then((res: any) => {
      if (res.success) {
        notificationController.success({
          message: 'Add Point Success',
        });
        Props.closeModal();
      } else {
        notificationController.error({
          message: res.message,
        });
      }
    });
  };

  return (
    <>
      <Modal
        title={t('common.add') + ' ' + t('common.Point')}
        visible={Props.isOpen}
        onCancel={() => Props.closeModal()}
        footer={[
          <>
            <Button style={{ display: 'inline' }} onClick={() => Props.closeModal()}>
              {t('common.close')}
            </Button>
            <Button
              style={{ display: 'inline' }}
              type="primary"
              className="btn btn-primary"
              form="addPoint"
              key="submit"
              htmlType="submit"
            >
              {t('common.add')}
            </Button>
          </>,
        ]}
      >
        <Form name="addPoint" labelCol={{ span: 2 }} wrapperCol={{ span: 20 }} onFinish={onFinishAddPoint}>
          <Form.Item label={t('common.Point')} name="point" key="point">
            <InputNumber style={{ width: 400, marginLeft: '10px' }} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
