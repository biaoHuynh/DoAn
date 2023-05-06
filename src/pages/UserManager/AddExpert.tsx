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
  onAddSuccess: any;
}

export const AddExpert: React.FC<DBProps> = ({ onAddSuccess }) => {
  const [isFieldsChanged, setFieldsChanged] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const [uploading, setUploading] = useState(false);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [jobTitle, setJobTitle] = useState(null);
  const [specialist, setSpecialist] = useState(null);
  const [workPlace, setWorkPlace] = useState(null);
  const [password, setPassword] = useState(null);

  const [form] = BaseForm.useForm();

  const { t } = useTranslation();

  const handleUpload = async () => {
    setLoading(true);

    let idCardBase64 = '';
    if (fileList.length > 0) {
      await getBase64(fileList, (result: string) => {
        const formData = {
          name: name,
          expertInfo: {
            phoneNumber: '',
            jobTitle: jobTitle,
            specialist: specialist,
            workPlace: workPlace,
          },
          description: [],
          role: 'expert',
          password: password,
          imageUrlBase64: result,
        };

        UserPageService.AddUser(formData).then((data: any) => {
          if (data.status === 1) {
            setTimeout(() => {
              setLoading(false);
              setFieldsChanged(false);
              onAddSuccess(true);
              form.resetFields();
            }, 1000);
          }
        });
      });
    } else {
      const formData = {
        name: name,
        expertInfo: {
          phoneNumber: '',
          jobTitle: jobTitle,
          specialist: specialist,
          workPlace: workPlace,
        },
        description: [],
        role: 'expert',
        password: password,
        imageUrlBase64: null,
      };

      UserPageService.AddUser(formData).then((data: any) => {
        if (data.status === 1) {
          setTimeout(() => {
            setLoading(false);
            setFieldsChanged(false);
            onAddSuccess(true);
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
    <BaseForm form={form} layout="vertical" name="contentForm" onFinish={handleUpload}>
      <BaseForm.Item name="name" label="Tên" required>
        <Input onChange={(event) => setName(event.target.value)} required />
      </BaseForm.Item>
      <BaseForm.Item name="email" label="Email" required>
        <Input onChange={(event) => setEmail(event.target.value)} required />
      </BaseForm.Item>

      <>
        <BaseForm.Item name="jobTitle" label="Chức vụ" required>
          <Input onChange={(event) => setJobTitle(event.target.value)} required />
        </BaseForm.Item>
        <BaseForm.Item name="specialist" label="Chuyên môn" required>
          <Input onChange={(event) => setSpecialist(event.target.value)} required />
        </BaseForm.Item>
        <BaseForm.Item name="workPlace" label="Nơi làm việc" required>
          <Input onChange={(event) => setWorkPlace(event.target.value)} required />
        </BaseForm.Item>
      </>

      <BaseForm.Item name="password" label="Mật khẩu" required>
        <Input onChange={(event) => setPassword(event.target.value)} required />
      </BaseForm.Item>
      <BaseForm.Item name="image" label="Ảnh đại diện" required>
        <Upload name="logo" {...props} listType="picture-card">
          <Button type="default" disabled={fileList.length > 1}>
            <UploadOutlined />
          </Button>
        </Upload>
        <Button type="primary" htmlType="submit">
          Thêm
        </Button>
      </BaseForm.Item>
    </BaseForm>
  );
};
