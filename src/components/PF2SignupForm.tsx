import React from 'react';
import { Button, Divider, Form,  Typography } from 'antd';
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

      {/* <Form
        name="dynamic_form_nest_item"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        onValuesChange={onValuesChange}
      >
        <Title level={4}>Additional Guardian or Adults (18+ years)</Title>

        <Form.List name="contacts">
          {(fields, { add, remove }) => {
            return (
              <>
                {fields.map((field) => (
                  <div key={field.key}>
                   <RegistrationFormBody field={field}/>
                    <Button
                      onClick={() => {
                        remove(field.name);
                        console.log(field);
                      }}
                    >
                      Remove Adult/Guardian
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
              </>
            );
          }}
        </Form.List>
        <Divider />

        <Title level={4}>Children</Title>

        {[...Array(numberOfChildren)].map((_, i) => (
          <>
            <ChildFormFragment id={i.toString()} />
            <Divider />
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
          <Button
            //to="/signup/pf/confirmation"
            type="primary"
            className="button-style"
            htmlType="submit"
          >
            Next
          </Button>
        </Form.Item>
      </Form> */}
    </FormContainer>
  );
};

export default PF2SignupForm;