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
  getnew: any;
}

export const ValidationForm: React.FC<DBProps> = ({ getnew }) => {
  const [isFieldsChanged, setFieldsChanged] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [topicList, setTopicList] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [context, setContext] = useState('');
  const [title, setTitle] = useState('');
  const [hashTag, setHashTag] = useState('');
  const [topic, setTopic] = useState('');

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
      const topic: any[] = [];
      res?.data.forEach((i: any) => {
        topic.push({ value: i.id, label: i.tagName });
      });
      setTopicList(topic);
    });
  }, []);

  const handleUpload = async () => {
    const formData = new FormData();
    setLoading(true);

    await getBase64(fileList, (result: string) => {
      const formData = {
        title: title,
        context: context,
        hashTag: hashTag,
        topicTagId: topic,
        imageList: [result],
      };
      fromService.upLoadPost(formData).then((data: any) => {
        if (data.status === 1) {
          setTimeout(() => {
            setLoading(false);
            setFieldsChanged(false);
            getnew();
            notificationController.success({ message: 'Upload success' });
          }, 1000);
        }
      });
    });
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
      <BaseForm.Item name="Title" label="Title" rules={[{ required: true, message: t('common.requiredField') }]}>
        <Input onChange={(event) => setTitle(event.target.value)} />
      </BaseForm.Item>
      <BaseForm.Item name="Context" label="Context" rules={[{ required: true, message: t('common.requiredField') }]}>
        <Input onChange={(event) => setContext(event.target.value)} />
      </BaseForm.Item>
      <BaseForm.Item name="HashTag" label="HashTag" rules={[{ required: true, message: t('common.requiredField') }]}>
        <Input onChange={(event) => setHashTag(event.target.value)} />
      </BaseForm.Item>
      <BaseForm.Item name="Topic" label="Topic" rules={[{ required: true, message: t('common.requiredField') }]}>
        <Select style={{ width: 120 }} onChange={(value) => setTopic(value)} options={topicList} />
      </BaseForm.Item>
      <BaseForm.Item name="image" label="Attach Image" rules={[{ required: true, message: t('common.requiredField') }]}>
        <Upload name="logo" {...props} listType="picture-card">
          <Button type="default" disabled={fileList.length > 1}>
            <UploadOutlined />
          </Button>
        </Upload>
        <Button
          type="default"
          onClick={handleUpload}
          disabled={fileList.length === 0 || isLoading}
          loading={uploading}
          style={{ marginTop: 16, width: '100%' }}
        >
          Upload Post
        </Button>
      </BaseForm.Item>
    </BaseForm>
  );
};
