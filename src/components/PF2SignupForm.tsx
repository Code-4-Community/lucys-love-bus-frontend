import React from 'react';
import { Button, Divider, Form, Typography } from 'antd';
import FormInitialText from './FormInitialText';
import FormContainer from './FormContainer';
import { Helmet } from 'react-helmet';
import RegistrationFormBody from './RegistrationFormBody';
import ChildFormFragment from './ChildFormFragment';
import { useHistory } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const PF2SignupForm: React.FC<{
  setPMForm: React.Dispatch<React.SetStateAction<any | null>>;
}> = ({ setPMForm }) => {
  const history = useHistory();
  const onFinish = (values: any) => {
    setPMForm(values);
    history.push('/signup/pf/confirmation');
  };

  return (
    <FormContainer>
      <Helmet>
        <title>Signup - Partipicating Family</title>
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

      <Form onFinish={onFinish} layout="vertical">
        <Form.List name="contacts">
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field) => (
                  <div key={field.key}>
                    <RegistrationFormBody field={field} />

                    <Button
                      onClick={() => {
                        remove(field.name);
                      }}
                    >
                      Remove
                    </Button>
                    <Divider />
                  </div>
                ))}

                <Button
                  onClick={() => {
                    add();
                  }}
                >
                  Add Adult/Guardian
                </Button>
                <Divider />
              </div>
            );
          }}
        </Form.List>

        <Form.List name="children">
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field) => (
                  <div key={field.key}>
                    <ChildFormFragment field={field} />

                    <Button
                      onClick={() => {
                        remove(field.name);
                      }}
                    >
                      Remove
                    </Button>
                    <Divider />
                  </div>
                ))}

                <Button
                  onClick={() => {
                    add();
                  }}
                >
                  Add Child
                </Button>
                <Divider />
              </div>
            );
          }}
        </Form.List>
        <Button type="primary" htmlType="submit">
          Next
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PF2SignupForm;
