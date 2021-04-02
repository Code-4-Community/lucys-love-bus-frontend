import { Button, Divider, Form, Typography } from 'antd';
import React from 'react';
import { Helmet } from 'react-helmet';
import { ContactFormFields } from '../containers/setContacts/ducks/types';
import ChildFormFragment from './ChildFormFragment';
import ConfirmationMessage from './ConfirmationMessage';
import FormContainer from './FormContainer';
import LocationFormFragment from './LocationFormFragment';
import RegistrationFormBody from './RegistrationFormBody';

const { Title, Paragraph } = Typography;

interface ContactsFormProps {
  onFinish: (values: ContactFormFields) => void;
  initialValues: ContactFormFields;
  isParticipatingFamily?: boolean;
}

const ContactsForm: React.FC<ContactsFormProps> = ({
  onFinish,
  initialValues,
  isParticipatingFamily,
}) => {
  return (
    <FormContainer>
      <Helmet>
        <title>Set Profile Information</title>
      </Helmet>
      {isParticipatingFamily ? (
        <ConfirmationMessage
          title="SIGN UP"
          message="Registering as a Participating Family"
          details="Tell us about your children and/or any other members you are registering under this account. This information will be sent to an admin to review your application."
        />
      ) : (
        <ConfirmationMessage
          title="UPDATE PROFILE INFORMATION"
          message="Contacts, Children, and Profile Information"
          details="Tell us about your children and/or any other members you are registering under this account."
        />
      )}

      <Form onFinish={onFinish} layout="vertical" initialValues={initialValues}>
        <Title level={5}>Main Contact Information</Title>
        <RegistrationFormBody isMainContact />
        <Divider />
        <LocationFormFragment />
        <Divider />

        <Form.List name="additionalContacts">
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field, i) => (
                  <div key={`additional-contact-${i + 1}`}>
                    <Title level={5}>Additional Contact {i + 1}</Title>

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
                {fields.map((field, i) => (
                  <div key={`child-${i + 1}`}>
                    <Title level={5}>Child {i + 1}</Title>

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
          Submit
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ContactsForm;
