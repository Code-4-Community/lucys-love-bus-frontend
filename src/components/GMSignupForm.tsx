import React, { useEffect } from 'react';
import {
  Form,
  Input,
  Radio,
  Upload,
  Typography,
  DatePicker,
  Button,
} from 'antd';
import { LinkButton } from './LinkButton';
import FormContainer from './FormContainer';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import FormInitialText from './FormInitialText';
import { useHistory } from 'react-router-dom';

const { Title, Paragraph } = Typography;
const { Dragger } = Upload;
const { TextArea } = Input;

interface SignupData {
  firstName: string;
  lastName: string;
  pronouns: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  allergies?: string;
  diagnosis?: string;
  otherNotes?: string;
  password: string;
  // TODO: use correct file type
  profilePicture?: any;
}

const GMSignupForm: React.FC<{
  setGMForm: React.Dispatch<React.SetStateAction<any | null>>;
}> = ({ setGMForm }) => {
  const history = useHistory();

  const onFinish = (values: any) => {
    setGMForm(values);
    history.push('/signup/gm/confirmation');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Signup - General Member</title>
      </Helmet>
      <FormContainer>
        <FormInitialText>
          <Title level={5}>SIGN UP</Title>
          <Title level={3}>Registering as a General Member</Title>
          <Paragraph>
            General members may navigate the event calendar and purchase tickets
            once registration is open. If you, or a member of your family, have
            a life-threatening illness, consider registering as a{' '}
            <Link to="/signup-pf-p1" component={Typography.Link}>
              Participating Family
            </Link>{' '}
            to register free of charge.
          </Paragraph>
          <Paragraph>Fields marked * are required.</Paragraph>
        </FormInitialText>

        <Form
          name="basic"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            label="First Name"
            name="firstName"
            className="inline-block-half"
            rules={[
              { required: true, message: 'Please input your first name' },
            ]}
          >
            <Input placeholder="First Name" />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastName"
            className="inline-block-half"
            rules={[{ required: true, message: 'Please input your last name' }]}
          >
            <Input placeholder="Last Name" />
          </Form.Item>

          <Form.Item
            label="Pronouns"
            name="pronouns"
            rules={[{ required: true, message: 'Please select your pronouns' }]}
          >
            <Radio.Group>
              <Radio className="radio-item" value={'he/him'}>
                He/Him
              </Radio>
              <Radio className="radio-item" value={'she/her'}>
                She/Her
              </Radio>
              <Radio className="radio-item" value={'they/them'}>
                They/Them
              </Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: 'email',
                message: 'Please input a valid email address',
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Create Password"
            className="block-half stacked-inputs"
            hasFeedback
            rules={[
              {
                required: true,
                pattern: new RegExp(/^(?=.*\d).{8,20}$/),
                message:
                  'Password must be 8-20 characters, containing at least one digit',
              },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item
            name="confirm-password"
            dependencies={['password']}
            className="block-half"
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Passwords must match!',
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
            <Input.Password placeholder="Confirm Password" />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            className="inline-block-half"
            rules={[
              {
                required: true,
                pattern: new RegExp(/^[^0-9]*(?:(\d)[^0-9]*){10}$/),
                message: 'Please input a valid ten-digit phone number',
              },
            ]}
          >
            <Input placeholder="Phone Number" />
          </Form.Item>

          <Form.Item
            label="Date of Birth"
            name="birthday"
            className="inline-block-half"
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
            name="address"
            label="Address"
            className="stacked-inputs"
            rules={[{ required: true, message: 'Please input your address' }]}
          >
            <Input placeholder="Address" />
          </Form.Item>
          <Form.Item
            name="city"
            className="inline-block-third"
            rules={[{ required: true, message: 'Please input city' }]}
          >
            <Input placeholder="City" />
          </Form.Item>
          <Form.Item
            name="state"
            className="inline-block-third"
            rules={[
              {
                required: true,
                pattern: new RegExp(/^[A-Za-z]{2}/),
                message: 'Please input valid two-digit state abbreviation',
              },
            ]}
          >
            <Input placeholder="State" />
          </Form.Item>
          <Form.Item
            name="zip"
            className="inline-block-third"
            rules={[
              {
                required: true,
                pattern: new RegExp(/^[^0-9]*(?:(\d)[^0-9]*){5}$/),
                message: 'Please input a valid five-digit zip code',
              },
            ]}
          >
            <Input placeholder="Zip Code" />
          </Form.Item>

          <Form.Item label="Allergies (if applicable)" name="allergies">
            <TextArea rows={3} placeholder="Allergies" />
          </Form.Item>

          <Form.Item label="Diagnosis" name="diagnosis">
            <TextArea rows={1} placeholder="Diagnosis" />
          </Form.Item>

          <Form.Item label="Other Notes" name="otherNotes">
            <TextArea rows={3} placeholder="Other Notes" />
          </Form.Item>

          <Form.Item label="Upload Profile Picture">
            <Dragger>
              <p>Drag and Drop Image File to Upload (.jpeg, .png)</p>
              <u>Or Browse Your Computer</u>
            </Dragger>
          </Form.Item>

          <Form.Item>
            <LinkButton to="/signup" className="button-style">
              Back
            </LinkButton>
            <Button htmlType="submit" type="primary" className="button-style">
              Next
            </Button>
          </Form.Item>
        </Form>
      </FormContainer>
    </>
  );
};

export default GMSignupForm;
