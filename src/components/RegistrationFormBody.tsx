import { DatePicker, Form, Input, Radio, Upload } from 'antd';
import { FormListFieldData } from 'antd/lib/form/FormList';
import React from 'react';
const { Dragger } = Upload;
const { TextArea } = Input;

const RegistrationFormBody: React.FC<{
  isMainContact?: boolean;
  field?: FormListFieldData;
}> = ({ isMainContact, field }) => {
  function generateName(name: string) {
    if (field) {
      return [field.name, name];
    } else {
      return name;
    }
  }

  function generateFieldKey(key: string) {
    if (field) {
      return [field.fieldKey, key];
    } else {
      return key;
    }
  }

  return (
    <>
      <Form.Item
        name={generateName('firstName')}
        fieldKey={generateFieldKey('firstName')}
        label="First Name"
        className="inline-block-half"
        rules={[{ required: true, message: 'Please input your first name' }]}
      >
        <Input placeholder="First Name" />
      </Form.Item>

      <Form.Item
        name={generateName('lastName')}
        fieldKey={generateFieldKey('firstName')}
        label="Last Name"
        className="inline-block-half"
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
          <Radio className="radio-item" value={'He/Him'}>
            He/Him
          </Radio>
          <Radio className="radio-item" value={'She/Her'}>
            She/Her
          </Radio>
          <Radio className="radio-item" value={'They/Them'}>
            They/Them
          </Radio>
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
              <Radio value={true} className="radio-style">
                Yes
              </Radio>
              <Radio value={false} className="radio-style">
                No
              </Radio>
            </Radio.Group>
          </Form.Item>
        </>
      )}
      <Form.Item
        name={generateName('phoneNumber')}
        fieldKey={generateFieldKey('phoneNumber')}
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
        name={generateName('dateOfBirth')}
        fieldKey={generateFieldKey('dateOfBirth')}
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
        <Dragger multiple={false} beforeUpload={() => false}>
          <p>Drag and Drop Image File to Upload (.jpeg, .png)</p>
          <u>Or Browse Your Computer</u>
        </Dragger>
      </Form.Item>
    </>
  );
};

export default RegistrationFormBody;
