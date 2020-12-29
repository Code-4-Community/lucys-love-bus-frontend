import React, { useEffect } from 'react';
import { Button, Checkbox, DatePicker, Form, Input, Radio } from 'antd';
import { Typography } from 'antd';
import { LinkButton } from './LinkButton';
import { Helmet } from 'react-helmet';
import FormContainer from './FormContainer';
import { useHistory } from 'react-router-dom';

const { Paragraph, Title, Text } = Typography;

interface SignupConfirmationPage {
  check1: boolean;
  check2: boolean;
  check3: boolean;
  photoRelease: number;
  headOfFamilyName: string;
  headOfFamilyInitials: string;
  dateOfSignature: string;
}

const SignupConfirmationForm: React.FC<{
  groupTitle: string;
  backURL: string;
  nextURL: string;
  onSubmission: (photoRelease: boolean) => void;
}> = ({ groupTitle, backURL, nextURL, onSubmission }) => {
  const history = useHistory();

  const onFinish = (values: any) => {
    // should make sure all values are true - terms are agreed to.
    // should be async and awaited

    const consent = values.photoRelease === 1;

    onSubmission(consent);
    history.push(nextURL);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Signup Confirmation - {groupTitle}</title>
      </Helmet>
      <FormContainer>
        <Title level={5} className="centered-text">
          SIGN UP
        </Title>

        <Title level={3} className="centered-text">
          Registering as a {groupTitle}
        </Title>

        <Paragraph className="centered-text">
          {' '}
          Please carefully read, review, and check the agreement boxes below in
          order to participate in programs through Lucy’s Love Bus to ensure the
          safety and comfort of all participants.{' '}
        </Paragraph>
        <Form name="basic" layout="vertical" onFinish={onFinish}>
          <div className="new-section">
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
          </div>

          <div>
            <Text strong>Photo/Video Release</Text>
            <Paragraph>
              Do you authorize the use and reproduction by Lucy’s Love Bus of
              any and all photographs and any other audio-visual materials taken
              of me for promotional material, educational activities,
              exhibitions or for any other use for the benefit of the
              organization?
            </Paragraph>
            <Paragraph strong>
              We do not share last names, diagnosis, or hometowns unless given
              explicit permission in order to protect privacy
            </Paragraph>

            <Form.Item
              name="photoRelease"
              rules={[{ required: true, message: 'Please select one option.' }]}
            >
              <Radio.Group>
                <Radio value={1} className="radio-style">
                  I consent to photo/video release
                </Radio>
                <Radio value={2} className="radio-style">
                  I do not consent to photo/video release
                </Radio>
              </Radio.Group>
            </Form.Item>
          </div>

          <div>
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
          </div>

          <Form.Item className="centered">
            <LinkButton to={backURL} type="secondary" className="button-style">
              Back
            </LinkButton>
            <Button type="primary" className="button-style" htmlType="submit">
              Next
            </Button>
          </Form.Item>
        </Form>
      </FormContainer>
    </>
  );
};

export default SignupConfirmationForm;
