import { DatePicker, Form, Input, Radio, Upload } from 'antd';
import { FormListFieldData } from 'antd/lib/form/FormList';
import React from 'react';
import { validateImage } from '../utils/signupFlow';
const { Dragger } = Upload;
const { TextArea } = Input;

const ChildFormFragment: React.FC<{ field: FormListFieldData }> = ({
  field,
}) => {
  return (
    <>
      <Form.Item
        name={[field.name, 'firstName']}
        fieldKey={[field.fieldKey, 'firstName']}
        label="First Name"
        rules={[{ required: true, message: 'Please input your first name' }]}
      >
        <Input placeholder="First Name" />
      </Form.Item>

      <Form.Item
        name={[field.name, 'lastName']}
        fieldKey={[field.fieldKey, 'lastName']}
        label="Last Name"
        rules={[{ required: true, message: 'Please input your last name' }]}
      >
        <Input placeholder="Last Name" />
      </Form.Item>

      <Form.Item
        name={[field.fieldKey, 'pronouns']}
        fieldKey={[field.fieldKey, 'pronouns']}
        label="Pronouns"
      >
        <Radio.Group>
          <Radio value={'He/Him'}>He/Him</Radio>
          <Radio value={'She/Her'}>She/Her</Radio>
          <Radio value={'They/Them'}>They/Them</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        name={[field.name, 'dateOfBirth']}
        fieldKey={[field.fieldKey, 'dateOfBirth']}
        label="Date of Birth"
        rules={[
          {
            required: true,
            message: 'Please input your date of birth.',
          },
        ]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        name={[field.name, 'school']}
        fieldKey={[field.fieldKey, 'school']}
        label="School"
        rules={[
          { required: true, message: "Please input your child's school" },
        ]}
      >
        <Input placeholder="First Name" />
      </Form.Item>

      <Form.Item
        name={[field.name, 'schoolYear']}
        fieldKey={[field.fieldKey, 'schoolYear']}
        label="Grade"
        rules={[
          {
            required: true,
            message: "Please input your child's current grade",
          },
        ]}
      >
        <Input placeholder="Last Name" />
      </Form.Item>

      <Form.Item
        name={[field.name, 'allergies']}
        fieldKey={[field.fieldKey, 'allergies']}
        label="Allergies (if applicable)"
      >
        <TextArea rows={3} placeholder="Allergies" />
      </Form.Item>

      <Form.Item
        name={[field.name, 'diagnosis']}
        fieldKey={[field.fieldKey, 'diagnosis']}
        label="Diagnosis"
      >
        <TextArea rows={1} placeholder="Diagnosis" />
      </Form.Item>

      <Form.Item
        name={[field.name, 'medications']}
        fieldKey={[field.fieldKey, 'medications']}
        label="Medication (if applicable)"
      >
        <TextArea rows={1} placeholder="Medication" />
      </Form.Item>

      <Form.Item
        name={[field.name, 'notes']}
        fieldKey={[field.fieldKey, 'notes']}
        label="Other Notes"
      >
        <TextArea rows={3} placeholder="Other Notes" />
      </Form.Item>

      <Form.Item
        name={[field.name, 'profilePicture']}
        fieldKey={[field.fieldKey, 'profilePicture']}
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

export default ChildFormFragment;
