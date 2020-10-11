import React from 'react';
import { Button, Form, Input, Radio, Upload } from 'antd';

const SignupForm: React.FC = () => {
  const onFinish = (values: any) => {
    // send data to redux
  };

  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  };

  const { Dragger } = Upload;
  const { TextArea } = Input;

  return (
      <Form
          name="basic"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
      >
        <div>
        <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: 'Please input your first name' }]}
            style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px 0px 0px' }}
        >
          <Input placeholder="First Name"/>
        </Form.Item>

        <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: 'Please input your last name' }]}
            style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px 0px 0px' }}
        >
          <Input placeholder="Last Name"/>
        </Form.Item>
        </div>

      <Radio.Group
          style={{ margin: '16px 0px' }}>
          <Radio style={radioStyle} value={1}>
            He/Him
          </Radio>
          <Radio style={radioStyle} value={2}>
            She/Her
          </Radio>
          <Radio style={radioStyle} value={4}>
            They/Them
          </Radio>
        </Radio.Group>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email'}]}
        >
          <Input placeholder="Email"/>
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          rules={[{ required: true, message: 'Please input your phone number'}]}
        >
          <Input placeholder="Phone Number"/>
        </Form.Item>

        <Form.Item label="Address">
          <Form.Item
              name="address"
              rules={[{ required: true, message: 'Please input your address'}]}
          >
            <Input placeholder="Address"/>
          </Form.Item>
          <Form.Item
              name="city"
              rules={[{ required: true, message: 'Please input city'}]}
              style={{ display: 'inline-block', width: 'calc(33% - 8px)', margin: '0px 8px 0px 0px' }}
          >
            <Input placeholder="City"/>
          </Form.Item>
          <Form.Item
              name="state"
              rules={[{ required: true, message: 'Please input state'}]}
              style={{ display: 'inline-block', width: 'calc(33% - 8px)', margin: '0 8px 0px 0px' }}
          >
            <Input placeholder="State"/>
          </Form.Item>
          <Form.Item
              name="zip"
              rules={[{ required: true, message: 'Please input zip code'}]}
              style={{ display: 'inline-block', width: 'calc(33%)'}}
          >
            <Input placeholder="Zip Code"/>
          </Form.Item>
        </Form.Item>

        <Form.Item
            label="Allergies (if applicable)"
            name="allergies"
        >
          <TextArea rows={3} placeholder="Allergies"/>
        </Form.Item>

        <Form.Item
            label="Diagnosis"
            name="diagnosis"
        >
          <TextArea rows={1} placeholder="Diagnosis"/>
        </Form.Item>

        <Form.Item
            label="Other Notes"
            name="otherNotes"
        >
          <TextArea rows={3} placeholder="Other Notes"/>
        </Form.Item>

        <Form.Item label="Upload Profile Picture">
          <Dragger>
            <p>Drag and Drop Image File to Upload (.jpeg, .png)</p>
            <u>Or Browse Your Computer</u>
          </Dragger>
        </Form.Item>

        <Form.Item>
          <Button
              style={{ display: 'inline-block', margin: '0 8px' }}>
            Back
          </Button>
          <Button type="primary" htmlType="submit"
                  style={{ display: 'inline-block', margin: '0 8px' }}>
            Next
          </Button>
        </Form.Item>

      </Form>
  );
};

export default SignupForm;
