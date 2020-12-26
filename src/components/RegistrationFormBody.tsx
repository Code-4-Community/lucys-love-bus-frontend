import React from 'react';
import { Form, Input, Radio, Upload, DatePicker } from 'antd';
import { LinkButton } from './LinkButton';
const { Dragger } = Upload;
const { TextArea } = Input;

const RegistrationFormBody: React.FC<{id : string}> = ({ id }) => {
  return (
    <>
      <Form.Item
        label="First Name"
        name={`${id}-adult-firstName`}
        className="inline-block-half"
        rules={[{ required: true, message: 'Please input your first name' }]}
      >
        <Input placeholder="First Name" />
      </Form.Item>

      <Form.Item
        label="Last Name"
        name={`${id}-adult-lastName`}
        className="inline-block-half"
        rules={[{ required: true, message: 'Please input your last name' }]}
      >
        <Input placeholder="Last Name" />
      </Form.Item>

      <Form.Item
        label="Pronouns"
        name={`${id}-adult-pronouns`}
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
        label="Email"
        name={`${id}-adult-email`}
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
        label="Phone Number"
        name={`${id}-adult-phoneNumber`}
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
        label="Date of Birth"
        name={`${id}-adult-birthday`}
        rules={[
            {
              required: true,
              message: 'Please input your date of birth.',
            },
          ]}
        style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
      >
        <DatePicker/>
      </Form.Item>
      
      <Form.Item label="Allergies (if applicable)" name={`${id}-adult-allergies`}>
        <TextArea rows={3} placeholder="Allergies" />
      </Form.Item>

      <Form.Item label="Diagnosis" name={`${id}-adult-diagnosis`}>
        <TextArea rows={1} placeholder="Diagnosis" />
      </Form.Item>

      <Form.Item label="Medication (if applicable)" name={`${id}-adult-medication`}>
        <TextArea rows={1} placeholder="Medication" />
      </Form.Item>

      <Form.Item label="Other Notes" name={`${id}-adult-otherNotes`}>
        <TextArea rows={3} placeholder="Other Notes" />
      </Form.Item>

      <Form.Item label="Upload Profile Picture"  name={`${id}-adult-picture`}>
        <Dragger>
          <p>Drag and Drop Image File to Upload (.jpeg, .png)</p>
          <u>Or Browse Your Computer</u>
        </Dragger>
      </Form.Item>

    </>
  );
};

export default RegistrationFormBody