import React from 'react';
import { Form, Input, Upload } from 'antd';
import { LinkButton } from '../LinkButton';
import { SubmitButton } from '../SubmitButton';

const PF2SignupForm: React.FC = () => {
  const onFinish = () => {
    // send data to redux
  };

  return (
    <Form
      name="basic"
      layout="vertical"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item label="Enter:" name="dummy" className="inline-block-half">
        <Input placeholder="" />
      </Form.Item>

      <Form.Item>
        <LinkButton
          to="/signup-pf-p1"
          type="secondary"
          className="button-style"
        >
          Back
        </LinkButton>
        <SubmitButton
          to="/signup-confirmation-pf"
          type="primary"
          className="button-style"
        >
          Next
        </SubmitButton>
      </Form.Item>
    </Form>
  );
};

export default PF2SignupForm;
