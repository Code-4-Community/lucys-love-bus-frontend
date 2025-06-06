import { DatePicker, Form, Input, Radio, Upload } from 'antd';
import { FormListFieldData } from 'antd/lib/form/FormList';
import React from 'react';
import moment from 'moment';
import { validateImage } from '../utils/signupFlow';

const { Dragger } = Upload;
const { TextArea } = Input;

const RegistrationFormBody: React.FC<{
  isMainContact?: boolean;
  field?: FormListFieldData;
}> = ({ isMainContact, field }) => {
  function generateName(name: string) {
    return field ? [field.name, name] : name;
  }

  function generateFieldKey(key: string) {
    return field ? [field.fieldKey, key] : key;
  }

  return (
    <>
      <Form.Item
        name={generateName('firstName')}
        fieldKey={generateFieldKey('firstName')}
        label="First Name"
        rules={[{ required: true, message: 'Please input your first name' }]}
      >
        <Input placeholder="First Name" />
      </Form.Item>

      <Form.Item
        name={generateName('lastName')}
        fieldKey={generateFieldKey('firstName')}
        label="Last Name"
        rules={[{ required: true, message: 'Please input your last name' }]}
      >
        <Input placeholder="Last Name" />
      </Form.Item>

      <Form.Item
        name={generateName('pronouns')}
        fieldKey={generateFieldKey('pronouns')}
        label="Pronouns"
      >
        <Radio.Group>
          <Radio value={'He/Him'}>He/Him</Radio>
          <Radio value={'She/Her'}>She/Her</Radio>
          <Radio value={'They/Them'}>They/Them</Radio>
        </Radio.Group>
      </Form.Item>
      {!isMainContact && (
        <>
          <Form.Item
            name={generateName('email')}
            fieldKey={generateFieldKey('email')}
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
            name={generateName('shouldSendEmails')}
            fieldKey={generateFieldKey('shouldSendEmails')}
            label="Should Receive Emails"
            rules={[{ required: true, message: 'Please select one option.' }]}
          >
            <Radio.Group>
              <Radio value={true}>Yes</Radio>
              <Radio value={false}>No</Radio>
            </Radio.Group>
          </Form.Item>
        </>
      )}
      <Form.Item
        name={generateName('phoneNumber')}
        fieldKey={generateFieldKey('phoneNumber')}
        label="Phone Number"
        rules={[
          {
            required: true,
            pattern: new RegExp(/^[^0-9]*(?:(\d)[^0-9]*){10}$/),
            message: 'Please input a valid phone number',
          },
        ]}
      >
        <Input placeholder="Phone Number" />
      </Form.Item>
      <Form.Item
        name={generateName('dateOfBirth')}
        fieldKey={generateFieldKey('dateOfBirth')}
        label="Date of Birth"
        rules={[
          {
            required: true,
            message: 'Please input your date of birth.',
          },
        ]}
      >
        <DatePicker defaultPickerValue={moment()} format={'YYYY-MM-DD'} />
      </Form.Item>

      <Form.Item
        name={generateName('allergies')}
        fieldKey={generateFieldKey('allergies')}
        label="Allergies (if applicable)"
      >
        <TextArea rows={3} placeholder="Allergies" />
      </Form.Item>

      <Form.Item
        name={generateName('diagnosis')}
        fieldKey={generateFieldKey('diagnosis')}
        label="Diagnosis"
      >
        <TextArea rows={1} placeholder="Diagnosis" />
      </Form.Item>

      <Form.Item
        name={generateName('medications')}
        fieldKey={generateFieldKey('medications')}
        label="Medication (if applicable)"
      >
        <TextArea rows={1} placeholder="Medication" />
      </Form.Item>

      <Form.Item
        name={generateName('notes')}
        fieldKey={generateFieldKey('notes')}
        label="Other Notes"
      >
        <TextArea rows={3} placeholder="Other Notes" />
      </Form.Item>

      <Form.Item
        name={generateName('profilePicture')}
        fieldKey={generateFieldKey('profilePicture')}
        label="Upload Profile Picture"
      >
        <Dragger
          multiple={false}
          beforeUpload={validateImage}
          maxCount={1}
          accept=".jpeg,.jpg,.png"
        >
          <p>Drag and Drop Image File to Upload (.jpeg, .png)</p>
          <u>Or Browse Your Computer</u>
          <p>NOTE: files must be smaller than 1 megabyte!</p>
        </Dragger>
      </Form.Item>
    </>
  );
};

export default RegistrationFormBody;
