import React, { useState } from 'react';
import { Button, Divider, Form, Input, Typography } from 'antd';
import { LinkButton } from './LinkButton';
import FormInitialText from './FormInitialText';
import FormContainer from './FormContainer';
import { Helmet } from 'react-helmet';
import RegistrationFormBody from './RegistrationFormBody';
import ChildFormFragment from './ChildFormFragment';

const { Title, Paragraph } = Typography;

const PF2SignupForm: React.FC = () => {
  const [numberOfGuardians, setNumberOfGuardians] = useState(0);
  const [numberOfChildren, setNumberOfChildren] = useState(0);

  const onFinish = (d: any) => {
    // send data to redux
    console.log(d);
  };

  const onValuesChange = (a: any, b: any) => {
    console.log(a);
    console.log(b);
  };
  return (
    <FormContainer>
      <Helmet>
        <title>Sign Up</title>
        <meta name="description" content="Description goes here." />
      </Helmet>
      <FormInitialText>
        <Title level={5}>SIGN UP</Title>
        <Title level={3}>Registering as a Participating Family</Title>
        <Paragraph>
          Participating Families have early access to view events and are
          eligible to attend free of charge. After creating an account, your
          request will be reviewed by a member of our administration.
        </Paragraph>
        <Paragraph>Fields marked * are required.</Paragraph>
      </FormInitialText>

      <Form
        name="basic"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onValuesChange={onValuesChange}
      >
        <Title level={4}>Additional Guardian or Adults (18+ years)</Title>

        {[...Array(numberOfGuardians)].map((_, i) => (
          <>
            <RegistrationFormBody id={i.toString()} />
            <Divider/>
          </>
        ))}

        <Form.Item>
          <Button onClick={() => setNumberOfGuardians(numberOfGuardians + 1)}>
            Add Adult/Guardian
          </Button>
          <Button
            onClick={() => setNumberOfGuardians(numberOfGuardians - 1)}
            disabled={numberOfGuardians <= 0}
          >
            Remove Adult/Guardian
          </Button>
        </Form.Item>
        
        <Title level={4}>Children</Title>

        {[...Array(numberOfChildren)].map((_, i) => (
          <>
            <ChildFormFragment id={i.toString()} />
            <Divider/>
          </>
        ))}
        
        <Form.Item>
          <Button onClick={() => setNumberOfChildren(numberOfChildren + 1)}>
            Add Child
          </Button>
          <Button
            onClick={() => setNumberOfChildren(numberOfChildren - 1)}
            disabled={numberOfChildren <= 0}
          >
            Remove Child
          </Button>
        </Form.Item>
        <Form.Item>
          <LinkButton
            to="/signup/pf/1"
            type="secondary"
            className="button-style"
          >
            Back
          </LinkButton>
          <LinkButton
            to="/signup/pf/confirmation"
            type="primary"
            className="button-style"
          >
            Next
          </LinkButton>
        </Form.Item>
      </Form>
    </FormContainer>
  );
};

export default PF2SignupForm;
