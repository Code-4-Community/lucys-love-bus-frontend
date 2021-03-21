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
import { connect, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Routes } from '../../App';
import { signup } from '../../auth/ducks/thunks';
import { TokenPayload } from '../../auth/ducks/types';
import { ContentContainer } from '../../components';
import FormContainer from '../../components/FormContainer';
import FormInitialText from '../../components/FormInitialText';
import { C4CState } from '../../store';
import {
  AsyncRequest,
  asyncRequestIsComplete,
  asyncRequestIsFailed,
} from '../../utils/asyncRequest';
import { convertToYearMonthDateString } from '../../utils/dateUtils';
import { encodeProfileFieldFile } from '../../utils/fileEncoding';
import { SignupData } from './ducks/types';

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;
const { Dragger } = Upload;
const { TextArea } = Input;

const PaddedAlert = styled(Alert)`
  margin-top: 1em;

  margin-bottom: 2em;
`;

const SignupForm: React.FC<{ tokens: AsyncRequest<TokenPayload, any> }> = ({
  tokens,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const registeringAsParticipatingFamily =
    new URLSearchParams(location.search).get('pf') != null;

  if (asyncRequestIsComplete(tokens)) {
    if (registeringAsParticipatingFamily) {
      // TODO: if PF then route to set contacts with the PF query parameter pf
      history.push(Routes.HOME);
    } else {
      history.push(Routes.HOME);
    }
  }

  const onFinish = async (data: SignupData) => {
    const profilePicture =
      data.profilePicture &&
      (await encodeProfileFieldFile(data.profilePicture));
    dispatch(
      signup({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        location: {
          address: data.address,
          city: data.city,
          state: data.state,
          zipCode: data.zip,
        },
        photoRelease: data.photoRelease,
        referrer: data.referrer,
        profilePicture,
        allergies: data.allergies,
        medication: data.medications,
        notes: data.otherNotes,
        dateOfBirth: convertToYearMonthDateString(data.dateOfBirth),
        pronouns: data.pronouns,
        diagnosis: data.diagnosis,
      }),
    );
  };

  return (
    <>
      <Helmet>
        <title>Signup</title>
        <meta
          name="description"
          content="Sign up for Lucy's Love Bus Events."
        />
      </Helmet>
      <ContentContainer>
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
                  Participating Families have early access to view events and
                  are eligible to attend free of charge. After creating an
                  account, your request will be reviewed by a member of our
                  administration.
                </Paragraph>
                <Paragraph>Fields marked * are required.</Paragraph>
              </>
            ) : (
              <>
                <Title level={3}>Registering as a General Member</Title>

                <Paragraph>
                  General members may navigate the event calendar and purchase
                  tickets once registration is open. If you, or a member of your
                  family, have a life-threatening illness, consider registering
                  as a Participating Family to register free of charge.
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
              rules={[
                { required: true, message: 'Please input your last name' },
              ]}
            >
              <Input placeholder="Last Name" />
            </Form.Item>

            <Form.Item
              label="Pronouns"
              name="pronouns"
              rules={[{ message: 'Please select your pronouns' }]}
            >
              <Radio.Group>
                <Radio className="radio-item" value="He/Him">
                  He/Him
                </Radio>
                <Radio className="radio-item" value="She/Her">
                  She/Her
                </Radio>
                <Radio className="radio-item" value="They/Them">
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
              label="Create Password"
              name="password"
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
              name="confirmPassword"
              dependencies={['password']}
              className="block-half"
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
              className="block-half"
              rules={[
                {
                  required: true,
                  pattern: new RegExp(/^[^0-9]*(?:(\d)[^0-9]*){10}$/),
                  message: 'Please input a valid phone number',
                },
              ]}
              style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
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
              style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
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
                  message: 'Please input state',
                },
              ]}
            >
              <Input placeholder="State" />
            </Form.Item>
            <Form.Item
              name="zip"
              className="block-third"
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

            <Form.Item label="Referrer (if applicable)" name="referrer">
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="None"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option &&
                  option.children &&
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                    0
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
              <Dragger multiple={false} beforeUpload={() => false}>
                <p>Drag and Drop Image File to Upload (.jpeg, .png)</p>
                <u>Or Browse Your Computer</u>
              </Dragger>
            </Form.Item>

            <Text strong>Photo/Video Release</Text>
            <Paragraph>
              Do you authorize the use and reproduction by Lucy’s Love Bus of
              any and all photographs and any other audio-visual materials taken
              of me for promotional material, educational activities,
              exhibitions or for any other use for the benefit of the
              organization?
            </Paragraph>

            <Form.Item
              name="photoRelease"
              rules={[{ required: true, message: 'Please select one option.' }]}
            >
              <Radio.Group>
                <Radio value={true} className="radio-style">
                  I consent to photo/video release
                </Radio>
                <Radio value={false} className="radio-style">
                  I do not consent to photo/video release
                </Radio>
              </Radio.Group>
            </Form.Item>
            <Text strong>Required Conduct</Text>

            <Paragraph className="centered-text">
              {' '}
              Please carefully read, review, and check the agreement boxes below
              in order to participate in programs through Lucy’s Love Bus to
              ensure the safety and comfort of all participants.{' '}
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
              style={{ display: 'inline-block' }}
            >
              <Checkbox>
                No family member or attendee will visit The Sajni Center if they
                have been sick in the past 24 hours, are feeling ill, have been
                exposed to a virus, or do not have the appropriate age required
                immunizations.
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
              style={{ display: 'inline-block' }}
            >
              <Checkbox>
                All parents are to remain at The Sajni Center during programs
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
              style={{ display: 'inline-block' }}
            >
              <Checkbox>
                My children are up to date on all vaccinations and I will
                provide a copy of my children’s immunization records prior to
                attending any programs. (Children who are being treated for
                cancer often have severely compromised immune systems, so we are
                required to collect this information for their safety. All
                medical information will be stored in a HIPPA-compliant manner.)
              </Checkbox>
            </Form.Item>
            <Form.Item
              label="Head of Family Name"
              name="headOfFamilyName"
              className="stacked-input inline-block-half"
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
              className="stacked-input inline-block-half"
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
              className="stacked-input inline-block-half"
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
              <Button type="primary" className="button-style" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </FormContainer>
      </ContentContainer>
    </>
  );
};

const mapStateToProps = (state: C4CState) => {
  return {
    tokens: state.authenticationState.tokens,
  };
};

export default connect(mapStateToProps)(SignupForm);
