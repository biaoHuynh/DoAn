import { useTranslation } from 'react-i18next';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

import { Button } from '@app/components/common/buttons/Button/Button';

import { Upload, UploadDragger } from '@app/components/common/Upload/Upload';

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

export const AddAdmin: React.FC<DBProps> = ({ onAddSuccess }) => {
  const [isFieldsChanged, setFieldsChanged] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
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
          expertInfo: null,
          email: email,
          role: 'admin',
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
        expertInfo: null,
        email: email,
        role: 'admin',
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
    <BaseForm FF>
      <BaseForm.Item name="name" label="Tên" required>
        <Input onChange={(event: any) => setName(event.target.value)} required />
      </BaseForm.Item>
      <BaseForm.Item
        name="email"
        label="Email"
        required
        rules={[
          {
            type: 'email',
            message: 'Email không hợp lệ',
          },
        ]}
      >
        <Input onChange={(event: any) => setEmail(event.target.value)} required />
      </BaseForm.Item>

      <BaseForm.Item name="password" label="Mật khẩu" required>
        <Input onChange={(event: any) => setPassword(event.target.value)} required />
      </BaseForm.Item>
      <Button type="primary" htmlType="submit">
        Thêm
      </Button>
    </BaseForm>
  );
};
