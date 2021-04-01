import { Button, Divider, Form, Typography } from 'antd';
import React from 'react';
import { Helmet } from 'react-helmet';
import ChildFormFragment from './ChildFormFragment';
import FormContainer from './FormContainer';
import FormInitialText from './FormInitialText';
import RegistrationFormBody from './RegistrationFormBody';

const { Title, Paragraph } = Typography;

interface ContactsFormProps {
  //TODO create ContactsForm type
  onFinish: (values: any) => void;
  initialValues: any;
}

const ContactsForm: React.FC<ContactsFormProps> = ({
  onFinish,
  initialValues,
}) => {
  return (
    <FormContainer>
      <Helmet>
        <title>Set Profile Information</title>
      </Helmet>
      <FormInitialText>
        <Title level={5}>
          Set Profile, Additional Contact, and Child Information
        </Title>
        <Paragraph>Fields marked * are required.</Paragraph>
      </FormInitialText>

      <Form onFinish={onFinish} layout="vertical" initialValues={initialValues}>
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

export default ContactsForm;
