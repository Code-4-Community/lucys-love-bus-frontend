import { DatePicker, Form, Input, Radio, Upload } from 'antd';
import { FormListFieldData } from 'antd/lib/form/FormList';
import React from 'react';
const { Dragger } = Upload;
const { TextArea } = Input;

const ChildFormFragment: React.FC<{ field: FormListFieldData }> = ({
  field,
}) => {
  const fieldWithoutKey: FormListFieldData = field;
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
        fieldKey={[field.fieldKey, 'lastName']}
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
          <Radio className="radio-item" value="He/Him">
            He/Him
          </Radio>
          <Radio className="radio-item" value="She/Her">
            She/Her
          </Radio>
          <Radio className="radio-item" value="They/Them">
            They/Them
          </Radio>
        </Radio.Group>
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
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        {...fieldWithoutKey}
        name={[field.name, 'school']}
        fieldKey={[field.fieldKey, 'school']}
        label="School"
        className="inline-block-half"
        rules={[
          { required: true, message: "Please input your child's school" },
        ]}
      >
        <Input placeholder="School" />
      </Form.Item>

      <Form.Item
        {...fieldWithoutKey}
        name={[field.name, 'grade']}
        fieldKey={[field.fieldKey, 'grade']}
        label="Grade"
        className="inline-block-half"
        rules={[
          {
            required: true,
            message: "Please input your child's current grade",
          },
        ]}
      >
        <Input placeholder="Grade" />
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
        {...fieldWithoutKey}
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
        name={[field.name, 'profilePicture']}
        fieldKey={[field.fieldKey, 'profilePicture']}
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

export default ChildFormFragment;
