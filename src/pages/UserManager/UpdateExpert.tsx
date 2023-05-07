import { Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { InputNumber } from '@app/components/common/inputs/InputNumber/InputNumber';
import { Select, Option } from '@app/components/common/selects/Select/Select';
import { Button } from '@app/components/common/buttons/Button/Button';
import { Switch } from '@app/components/common/Switch/Switch';
import { Radio, RadioButton, RadioGroup } from '@app/components/common/Radio/Radio';
import { Slider } from '@app/components/common/Slider/Slider';
import { Upload, UploadDragger } from '@app/components/common/Upload/Upload';
import { Rate } from '@app/components/common/Rate/Rate';
import { Checkbox, CheckboxGroup } from '@app/components/common/Checkbox/Checkbox';
import { notificationController } from '@app/controllers/notificationController';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { Input } from '@app/components/common/inputs/Input/Input';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import UserPageService from './UserPageService';

const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const normFile = (e = { fileList: [] }) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};
interface DBProps {
  id: any;

  onUpdateSuccess: any;
}

export const UpdateExpert: React.FC<DBProps> = ({ id, onUpdateSuccess }) => {
  const [isFieldsChanged, setFieldsChanged] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const [uploading, setUploading] = useState(false);
  const [name, setName] = useState(null);
  const [jobTitle, setJobTitle] = useState(null);
  const [specialist, setSpecialist] = useState(null);
  const [workPlace, setWorkPlace] = useState(null);
  const [password, setPassword] = useState(null);

  const [form] = BaseForm.useForm();

  const { t } = useTranslation();

  const onFinish = async (values = {}) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFieldsChanged(false);
      notificationController.success({ message: 'Upload success' });
      console.log(values);
    }, 1000);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    setLoading(true);

    if (fileList.length > 0) {
      await getBase64(fileList, (result: string) => {
        const formData = {
          id: id,
          name: name,
          expertInfo: {
            jobTitle: jobTitle,
            specialist: specialist,
            workPlace: workPlace,
          },
          password: password,
          imageUrlBase64: result,
        };

        UserPageService.UpdateUser(formData).then((data: any) => {
          if (data.status === 1) {
            setTimeout(() => {
              setLoading(false);
              setFieldsChanged(false);
              onUpdateSuccess(true);
              form.resetFields();
            }, 1000);
          }
        });
      });
    } else {
      const formData = {
        id: id,
        name: name,
        expertInfo: {
          jobTitle: jobTitle,
          specialist: specialist,
          workPlace: workPlace,
        },
        password: password,
        imageUrlBase64: null,
      };

      UserPageService.UpdateUser(formData).then((data: any) => {
        if (data.status === 1) {
          setTimeout(() => {
            setLoading(false);
            setFieldsChanged(false);
            onUpdateSuccess(true);
            form.resetFields();
          }, 1000);
        }
      });
    }
  };

  const getBase64 = async (file: any, cb: any) => {
    console.log('file: ', file);
    const reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  };

  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };
  return (
    <BaseForm form={form} layout="vertical" name="contentForm">
      <BaseForm.Item name="name" label="Tên">
        <Input onChange={(event: any) => setName(event.target.value)} placeholder="Để trống nếu không thay đổi" />
      </BaseForm.Item>

      <>
        <BaseForm.Item name="jobTitle" label="Chức vụ">
          <Input onChange={(event: any) => setJobTitle(event.target.value)} placeholder="Để trống nếu không thay đổi" />
        </BaseForm.Item>
        <BaseForm.Item name="specialist" label="Chuyên môn">
          <Input
            onChange={(event: any) => setSpecialist(event.target.value)}
            placeholder="Để trống nếu không thay đổi"
          />
        </BaseForm.Item>
        <BaseForm.Item name="workPlace" label="Nơi làm việc">
          <Input
            onChange={(event: any) => setWorkPlace(event.target.value)}
            placeholder="Để trống nếu không thay đổi"
          />
        </BaseForm.Item>
      </>

      <BaseForm.Item name="password" label="Mật khẩu">
        <Input onChange={(event: any) => setPassword(event.target.value)} placeholder="Để trống nếu không thay đổi" />
      </BaseForm.Item>
      <BaseForm.Item name="image" label="Ảnh đại diện (Để trống nếu không thay đổi)">
        <Upload name="logo" {...props} listType="picture-card">
          <Button type="default" disabled={fileList.length > 1}>
            <UploadOutlined />
          </Button>
        </Upload>
      </BaseForm.Item>
      <Button type="default" onClick={handleUpload} loading={uploading} style={{ marginTop: 16, width: '100%' }}>
        Cập nhập thông tin
      </Button>
    </BaseForm>
  );
};
