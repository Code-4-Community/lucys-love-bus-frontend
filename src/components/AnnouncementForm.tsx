import { Button, Form, Input, Typography, Upload } from 'antd';
import React from 'react';
import { Helmet } from 'react-helmet';
import { encodeProfileFieldFile, FileField } from '../utils/fileEncoding';
import FormContainer from './FormContainer';
import FormInitialText from './FormInitialText';
import { validateImage } from '../utils/signupFlow';

const { Title } = Typography;
const { Dragger } = Upload;
const { TextArea } = Input;

interface AnnouncementFormProps {
  onFinish: (data: AnnouncementFormData) => void;
}

export interface AnnouncementFormData {
  title: string;
  description: string;
  imageSrc?: string | null;
}

export interface AnnouncementFormFieldData {
  title: string;
  description: string;
  imageSrc?: FileField;
}

async function mapFormFieldsToData(
  fields: AnnouncementFormFieldData,
): Promise<AnnouncementFormData> {
  return {
    ...fields,
    imageSrc:
      fields.imageSrc && (await encodeProfileFieldFile(fields.imageSrc)),
  };
}

const AnnouncementForm: React.FC<AnnouncementFormProps> = ({ onFinish }) => {
  return (
    <FormContainer>
      <Helmet>
        <title>Create Announcement</title>
      </Helmet>
      <FormInitialText>
        <Title level={3}>Create Announcement</Title>
      </FormInitialText>
      <Form
        name="basic"
        layout="vertical"
        onFinish={async (data) => onFinish(await mapFormFieldsToData(data))}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <TextArea rows={4} placeholder="Description" />
        </Form.Item>

        <Form.Item label="Upload Announcement Image (Optional)" name="imageSrc">
          <Dragger
            multiple={false}
            beforeUpload={validateImage}
            maxCount={1}
            accept=".jpeg,.png"
          >
            <p>Drag and Drop Image File to Upload (.jpeg, .png)</p>
            <u>Or Browse Your Computer</u>
            <p>NOTE: files must be smaller than 1 megabyte!</p>
          </Dragger>
        </Form.Item>
        <Button htmlType="submit">Submit</Button>
      </Form>
    </FormContainer>
  );
};

export default AnnouncementForm;
