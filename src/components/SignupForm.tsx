import {
  Alert,
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Radio,
  Select,
  Typography,
  Upload,
} from 'antd';
import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { UserAuthenticationReducerState } from '../auth/ducks/types';
import { SignupData } from '../containers/signupForm/ducks/types';
import {
  asyncRequestIsFailed,
  asyncRequestIsLoading,
} from '../utils/asyncRequest';
import FormContainer from './FormContainer';
import FormInitialText from './FormInitialText';
import LocationFormFragment from './LocationFormFragment';
import { validateImage } from '../utils/signupFlow';

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;
const { Dragger } = Upload;
const { TextArea } = Input;

const PaddedAlert = styled(Alert)`
  margin-top: 1em;
  margin-bottom: 2em;
`;

interface SignupFormProps {
  onFinish: (data: SignupData) => void;
  registeringAsParticipatingFamily: boolean;
  tokens: UserAuthenticationReducerState['tokens'];
}
const SignupForm: React.FC<SignupFormProps> = ({
  onFinish,
  registeringAsParticipatingFamily,
  tokens,
}) => {
  return (
    <FormContainer>
      <Helmet>
        <title>Signup</title>
      </Helmet>
      <FormInitialText>
        <Title level={5}>SIGN UP</Title>
        {registeringAsParticipatingFamily ? (
          <>
            <Title level={3}>Registering as a Participating Family</Title>
            <Paragraph>
              Participating Families have early access to view events and are
              eligible to attend free of charge. After creating an account, your
              request will be reviewed by a member of our administration.
            </Paragraph>
            <Paragraph>Fields marked * are required.</Paragraph>
          </>
        ) : (
          <>
            <Title level={3}>Registering as a General Member</Title>

            <Paragraph>
              General members may navigate the event calendar and purchase
              tickets once registration is open. If you, or a member of your
              family, have a life-threatening illness, consider registering as a
              Participating Family to register free of charge.
            </Paragraph>
          </>
        )}
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
          rules={[{ required: true, message: 'Please input your first name' }]}
        >
          <Input placeholder="First Name" />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: 'Please input your last name' }]}
        >
          <Input placeholder="Last Name" />
        </Form.Item>

        <Form.Item
          label="Pronouns"
          name="pronouns"
          rules={[{ message: 'Please select your pronouns' }]}
        >
          <Radio.Group>
            <Radio value="He/Him">He/Him</Radio>
            <Radio value="She/Her">She/Her</Radio>
            <Radio value="They/Them">They/Them</Radio>
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
          label="Create Password"
          name="password"
          hasFeedback
          rules={[
            {
              required: true,
              pattern: new RegExp(/^(?=.*\d).{8,100}$/),
              message:
                'Password must be 8-20 characters, containing at least one digit',
            },
          ]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          dependencies={['password']}
          hasFeedback
          rules={[
            { required: true, message: 'Passwords must match' },
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
          rules={[
            {
              required: true,
              pattern: new RegExp(/^[^0-9]*(?:(\d)[^0-9]*){10}$/),
              message: 'Please input a valid phone number',
            },
          ]}
        >
          <Input placeholder="Phone Number" />
        </Form.Item>
        <Form.Item
          name="dateOfBirth"
          fieldKey="dateOfBirth"
          label="Date of Birth"
          rules={[
            {
              required: true,
              message: 'Please input your date of birth.',
            },
          ]}
        >
          <DatePicker />
        </Form.Item>

        <LocationFormFragment />

        <Form.Item label="Referrer (if applicable)" name="referrer">
          <Select
            showSearch
            placeholder="None"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option &&
              option.children &&
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="None">None</Option>
            <Option value="TWP">TWP</Option>
            <Option value="NBCR">NBCR</Option>
            <Option value="LLB">LLB</Option>
            <Option value="Other">Other</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Allergies (if applicable)" name="allergies">
          <TextArea rows={3} placeholder="Allergies" />
        </Form.Item>

        <Form.Item label="Diagnosis" name="diagnosis">
          <TextArea rows={1} placeholder="Diagnosis" />
        </Form.Item>

        <Form.Item label="Medication (if applicable)" name="medications">
          <TextArea rows={1} placeholder="Medication" />
        </Form.Item>

        <Form.Item label="Other Notes" name="otherNotes">
          <TextArea rows={3} placeholder="Other Notes" />
        </Form.Item>

        <Form.Item label="Upload Profile Picture" name="profilePicture">
          <Dragger
            multiple={false}
            beforeUpload={validateImage}
            maxCount={1}
            accept=".jpeg,.jpg,.png"
          >
            <p>Drag and Drop Image File to Upload (.jpeg, .png)</p>
            <u>Or Browse Your Computer</u>
            <p>NOTE: files must be smaller than 1 megabyte!</p>
          </Dragger>
        </Form.Item>

        <Text strong>Photo/Video Release</Text>
        <Paragraph>
          Do you authorize the use and reproduction by Lucy’s Love Bus of any
          and all photographs and any other audio-visual materials taken of me
          for promotional material, educational activities, exhibitions or for
          any other use for the benefit of the organization?
        </Paragraph>

        <Form.Item
          name="photoRelease"
          rules={[{ required: true, message: 'Please select one option.' }]}
        >
          <Radio.Group>
            <Radio value={true}>I consent to photo/video release</Radio>
            <Radio value={false}>I do not consent to photo/video release</Radio>
          </Radio.Group>
        </Form.Item>
        <Text strong>Required Conduct</Text>

        <Paragraph>
          {' '}
          Please carefully read, review, and check the agreement boxes below in
          order to participate in programs through Lucy’s Love Bus to ensure the
          safety and comfort of all participants.{' '}
        </Paragraph>
        <Form.Item
          name="check1"
          valuePropName="checked"
          rules={[
            {
              required: true,
              type: 'enum',
              enum: [true],
              message: 'Please check all boxes',
            },
          ]}
        >
          <Checkbox>
            No family member or attendee will attend a Sajni Center program
            (either at The Sajni Center or off site) if they have been sick in
            the past 24 hours, are feeling ill, have been exposed to a virus, or
            do not have the appropriate age required immunizations.
          </Checkbox>
        </Form.Item>

        <Form.Item
          name="check2"
          valuePropName="checked"
          rules={[
            {
              required: true,
              type: 'enum',
              enum: [true],
              message: 'Please check all boxes',
            },
          ]}
        >
          <Checkbox>
            All parents are to remain at The Sajni Center or partner facility
            during programs.
          </Checkbox>
        </Form.Item>

        <Form.Item
          name="check3"
          valuePropName="checked"
          rules={[
            {
              required: true,
              type: 'enum',
              enum: [true],
              message: 'Please check all boxes',
            },
          ]}
        >
          <Checkbox>
            By submitting this form, I agree that all the above information is
            true to the best of my knowledge.
          </Checkbox>
        </Form.Item>

        <Form.Item
          name="check4"
          valuePropName="checked"
          rules={[
            {
              required: true,
              type: 'enum',
              enum: [true],
              message: 'Please check all boxes',
            },
          ]}
        >
          <Checkbox>
            By submitting this form and attending a program held by Lucy's Love
            Bus, I release Lucy's Love Bus and associated practitioners from all
            liability, costs, and damages, which could arise from participation
            in an event or activity.
          </Checkbox>
        </Form.Item>

        <Form.Item
          label="Head of Family Name"
          name="headOfFamilyName"
          rules={[
            {
              required: true,
              message: 'Please input the name of the head of the family',
            },
          ]}
        >
          <Input placeholder="Head of Family Name" />
        </Form.Item>

        <Form.Item
          label="Head of Family Initials"
          name="headOfFamilyInitials"
          rules={[
            {
              required: true,
              message: "Please input head of family's initials",
            },
          ]}
        >
          <Input placeholder="Head of Family Initials" />
        </Form.Item>

        <Form.Item
          label="Date of Signature"
          name="dateOfSignature"
          rules={[
            {
              required: true,
              message: 'Please input the date of signature',
            },
          ]}
        >
          <DatePicker />
        </Form.Item>
        {asyncRequestIsFailed(tokens) && (
          <PaddedAlert
            message="Error"
            description={tokens.error}
            type="error"
            showIcon
          />
        )}
        <Form.Item>
          <Button
            type="primary"
            disabled={asyncRequestIsLoading(tokens)}
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </FormContainer>
  );
};

export default SignupForm;
