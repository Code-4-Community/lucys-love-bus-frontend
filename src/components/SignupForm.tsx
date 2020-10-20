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
        <div style={{ marginBottom: '20px' }}>
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

      <Form.Item 
        label="Pronouns"
        name="pronouns"
        rules={[{ required: true, message: 'Please select your pronouns' }]}
      >
        <Radio.Group>
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
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ 
            required: true, 
            type: "email",
            message: 'Please input a valid email address',}]}
        >
          <Input placeholder="Email"/>
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          rules={[{ 
            required: true, 
            pattern: new RegExp(/^[^0-9]*(?:(\d)[^0-9]*){10}$/), 
            message: 'Please input a valid ten-digit phone number'}]}
            style={{ width: 'calc(50% - 8px)'}}
        >
          <Input 
            placeholder="Phone Number"/>
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
              rules={[{ 
                required: true,  
                pattern: new RegExp(/^[A-Za-z]{2}/),
                message: 'Please input valid two-digit state abbreviation'}]}
              style={{ display: 'inline-block', width: 'calc(33% - 8px)', margin: '0 8px 0px 0px' }}
          >
            <Input placeholder="State"/>
          </Form.Item>
          <Form.Item
              name="zip"
              rules={[{ 
                required: true, 
                pattern: new RegExp(/^[^0-9]*(?:(\d)[^0-9]*){5}$/), 
                message: 'Please input a valid five-digit zip code'}]}
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

        <Form.Item
              label="Create Password">
          <Form.Item
              name="password"
              style={{ width: 'calc(50% - 8px)'}}
              hasFeedback
              rules={[{ 
                required: true, 
                pattern: new RegExp(/^(?=.*\d).{8,20}$/), 
                message: 'Password must be 8-20 characters, containing at least one digit'}]}
          >
            <Input.Password placeholder="Password"/>
          </Form.Item>
          <Form.Item
              name="confirm-password"
              dependencies={['password']}
              style={{ width: 'calc(50% - 8px)'}}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Passwords must match!'
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject('This password does not match!');
                  },
                }),
              ]}
          >
            <Input.Password placeholder="Confirm Password"/>
          </Form.Item>
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
