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
import fromService from './FormService';

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
  isExpert: any;
  onUpdateSuccess: any;
}

export const UpdateInfor: React.FC<DBProps> = ({ id, isExpert, onUpdateSuccess }) => {
  const [isFieldsChanged, setFieldsChanged] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [topicList, setTopicList] = useState<any[]>([]);
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
  useEffect(() => {
    fromService.getAllTopicTag().then((res: any) => {
      let topic: any[] = [];
      res?.data.forEach((i: any) => {
        topic.push({ value: i.id, label: i.tagName });
      });
      setTopicList(topic);
    });
  }, []);

  const handleUpload = async () => {
    const formData = new FormData();
    setLoading(true);

    let idCardBase64 = '';
    if (fileList.length > 0) {
      await getBase64(fileList, (result: string) => {
        const formData = isExpert
          ? {
              id: id,
              name: name,
              expertInfo: {
                jobTitle: jobTitle,
                specialist: specialist,
                workPlace: workPlace,
              },
              password: password,
              imageUrlBase64: result,
            }
          : {
              id: id,
              name: name,
              password: password,
              imageUrlBase64: result,
            };
        fromService.updateInfor(formData).then((data: any) => {
          if (data.status === 1) {
            setTimeout(() => {
              setLoading(false);
              setFieldsChanged(false);
              notificationController.success({ message: 'Cập nhập thông tin thành công' });
            }, 1000);
          }
        });
      });
    } else {
      const formData = isExpert
        ? {
            id: id,
            name: name,
            expertInfo: {
              jobTitle: jobTitle,
              specialist: specialist,
              workPlace: workPlace,
            },
            password: password,
            imageUrlBase64: null,
          }
        : {
            id: id,
            name: name,
            password: password,
            imageUrlBase64: null,
          };
      fromService.updateInfor(formData).then((data: any) => {
        if (data.status === 1) {
          setTimeout(() => {
            setLoading(false);
            setFieldsChanged(false);
            onUpdateSuccess(true);
            notificationController.success({ message: 'Cập nhập thông tin thành công' });
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
        <Input onChange={(event) => setName(event.target.value)} placeholder="Để trống nếu không thay đổi" />
      </BaseForm.Item>
      {isExpert && (
        <>
          <BaseForm.Item name="jobTitle" label="Chức vụ">
            <Input onChange={(event) => setJobTitle(event.target.value)} placeholder="Để trống nếu không thay đổi" />
          </BaseForm.Item>
          <BaseForm.Item name="specialist" label="Chuyên môn">
            <Input onChange={(event) => setSpecialist(event.target.value)} placeholder="Để trống nếu không thay đổi" />
          </BaseForm.Item>
          <BaseForm.Item name="workPlace" label="Nơi làm việc">
            <Input onChange={(event) => setWorkPlace(event.target.value)} placeholder="Để trống nếu không thay đổi" />
          </BaseForm.Item>
        </>
      )}

      <BaseForm.Item name="password" label="Mật khẩu">
        <Input onChange={(event) => setPassword(event.target.value)} placeholder="Để trống nếu không thay đổi" />
      </BaseForm.Item>
      <BaseForm.Item name="image" label="Ảnh đại diện (Để trống nếu không thay đổi)">
        <Upload name="logo" {...props} listType="picture-card">
          <Button type="default" disabled={fileList.length > 1}>
            <UploadOutlined />
          </Button>
        </Upload>
        <Button type="default" onClick={handleUpload} loading={uploading} style={{ marginTop: 16, width: '100%' }}>
          Cập nhập thông tin
        </Button>
      </BaseForm.Item>
    </BaseForm>
  );
};
