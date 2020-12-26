import React from 'react';
import { Form, Input, Radio, Upload, DatePicker } from 'antd';
import { LinkButton } from './LinkButton';
const { Dragger } = Upload;
const { TextArea } = Input;

const ChildFormFragment: React.FC<{ id: string }> = ({ id }) => {
  return (
    <>
      <Form.Item
        label="First Name"
        name={`${id}-child-firstName`}
        className="inline-block-half"
        rules={[{ required: true, message: 'Please input your first name' }]}
      >
        <Input placeholder="First Name" />
      </Form.Item>

      <Form.Item
        label="Last Name"
        name={`${id}-child-lastName`}
        className="inline-block-half"
        rules={[{ required: true, message: 'Please input your last name' }]}
      >
        <Input placeholder="Last Name" />
      </Form.Item>

      <Form.Item
        label="Pronouns"
        name={`${id}-child-pronouns`}
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
        label="Date of Birth"
        name={`${id}-adult-birthday`}
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
        label="School"
        name={`${id}-child-school`}
        className="inline-block-half"
        rules={[{ required: true, message: 'Please input your childs school' }]}
      >
        <Input placeholder="First Name" />
      </Form.Item>

      <Form.Item
        label="Grade"
        name={`${id}-child-grade`}
        className="inline-block-half"
        rules={[
          { required: true, message: 'Please input your childs current grade' },
        ]}
      >
        <Input placeholder="Last Name" />
      </Form.Item>

      <Form.Item
        label="Allergies (if applicable)"
        name={`${id}-child-allergies`}
      >
        <TextArea rows={3} placeholder="Allergies" />
      </Form.Item>

      <Form.Item label="Diagnosis" name={`${id}-child-diagnosis`}>
        <TextArea rows={1} placeholder="Diagnosis" />
      </Form.Item>

      <Form.Item
        label="Medication (if applicable)"
        name={`${id}-child-medication`}
      >
        <TextArea rows={1} placeholder="Medication" />
      </Form.Item>

      <Form.Item label="Other Notes" name={`${id}-child-otherNotes`}>
        <TextArea rows={3} placeholder="Other Notes" />
      </Form.Item>

      <Form.Item label="Upload Profile Picture" name={`${id}-child-picture`}>
        <Dragger>
          <p>Drag and Drop Image File to Upload (.jpeg, .png)</p>
          <u>Or Browse Your Computer</u>
        </Dragger>
      </Form.Item>
    </>
  );
};

export default ChildFormFragment;
