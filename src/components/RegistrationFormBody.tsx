import React from 'react';
import { Form, Input, Radio, Upload, DatePicker } from 'antd';
import { LinkButton } from './LinkButton';
import { FormListFieldData } from 'antd/lib/form/FormList';
const { Dragger } = Upload;
const { TextArea } = Input;

const RegistrationFormBody: React.FC<{ field: FormListFieldData }> = ({
  field,
}) => {
  const fieldWithoutKey: any = field;
  delete fieldWithoutKey.key;
  return (
    <>
      <Form.Item
        {...fieldWithoutKey}
        name={[field.name, 'firstName']}
        fieldKey={[field.fieldKey, 'firstName']}
        label="First Name"
        className="inline-block-half"
        rules={[{ required: true, message: 'Please input your first name' }]}
      >
        <Input placeholder="First Name" />
      </Form.Item>

      <Form.Item
        {...fieldWithoutKey}
        name={[field.name, 'lastName']}
        fieldKey={[field.fieldKey, 'firstName']}
        label="Last Name"
        className="inline-block-half"
        rules={[{ required: true, message: 'Please input your last name' }]}
      >
        <Input placeholder="Last Name" />
      </Form.Item>

      <Form.Item
        {...fieldWithoutKey}
        name={[field.name, 'pronouns']}
        fieldKey={[field.fieldKey, 'pronouns']}
        label="Pronouns"
        rules={[{ required: true, message: 'Please select your pronouns' }]}
      >
        <Radio.Group>
          <Radio className="radio-item" value={1}>
            He/Him
          </Radio>
          <Radio className="radio-item" value={2}>
            She/Her
          </Radio>
          <Radio className="radio-item" value={4}>
            They/Them
          </Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        {...fieldWithoutKey}
        name={[field.name, 'email']}
        fieldKey={[field.fieldKey, 'email']}
        label="Email"
        rules={[
          {
            required: true,
            type: 'email',
            message: 'Please input a valid email address',
          },
        ]}
      >
        <Input placeholder="Email" />
      </Form.Item>

      <Form.Item
        {...fieldWithoutKey}
        name={[field.name, 'phoneNumber']}
        fieldKey={[field.fieldKey, 'phoneNumber']}
        label="Phone Number"
        className="block-half"
        rules={[
          {
            required: true,
            pattern: new RegExp(/^[^0-9]*(?:(\d)[^0-9]*){10}$/),
            message: 'Please input a valid phone number',
          },
        ]}
        style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
      >
        <Input placeholder="Phone Number" />
      </Form.Item>
      <Form.Item
        {...fieldWithoutKey}
        name={[field.name, 'birthday']}
        fieldKey={[field.fieldKey, 'birthday']}
        label="Date of Birth"
        rules={[
          {
            required: true,
            message: 'Please input your date of birth.',
          },
        ]}
        style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item
        {...fieldWithoutKey}
        name={[field.name, 'allergies']}
        fieldKey={[field.fieldKey, 'allergies']}
        label="Allergies (if applicable)"
      >
        <TextArea rows={3} placeholder="Allergies" />
      </Form.Item>

      <Form.Item
        //{...fieldWithoutKey}
        name={[field.name, 'diagnosis']}
        fieldKey={[field.fieldKey, 'diagnosis']}
        label="Diagnosis"
      >
        <TextArea rows={1} placeholder="Diagnosis" />
      </Form.Item>

      <Form.Item
        {...fieldWithoutKey}
        name={[field.name, 'medication']}
        fieldKey={[field.fieldKey, 'medication']}
        label="Medication (if applicable)"
      >
        <TextArea rows={1} placeholder="Medication" />
      </Form.Item>

      <Form.Item
        {...fieldWithoutKey}
        name={[field.name, 'otherNotes']}
        fieldKey={[field.fieldKey, 'otherNotes']}
        label="Other Notes"
      >
        <TextArea rows={3} placeholder="Other Notes" />
      </Form.Item>

      <Form.Item
        {...fieldWithoutKey}
        name={[field.name, 'picture']}
        fieldKey={[field.fieldKey, 'picture']}
        label="Upload Profile Picture"
      >
        <Dragger>
          <p>Drag and Drop Image File to Upload (.jpeg, .png)</p>
          <u>Or Browse Your Computer</u>
        </Dragger>
      </Form.Item>
    </>
  );
};

export default RegistrationFormBody;
