import React from 'react';
import { Checkbox, Form, Input, Radio } from 'antd';
import './signup-confirmation-form.less';
import { Typography } from 'antd';
import { LinkButton } from '../LinkButton';
const { Paragraph } = Typography;

interface SignupConfirmationPage {
  check1: boolean;
  check2: boolean;
  check3: boolean;
  photoRelease: number;
  headOfFamilyName: string;
  headOfFamilyInitials: string;
  dateOfSignature: string;
}

const SignupConfirmationFormGM: React.FC = () => {
  const onFinish = (values: SignupConfirmationPage) => {
    alert(values);
  };

  return (
    <Form name="basic" layout="vertical" onFinish={onFinish}>
      <div className="new-section">
        <Form.Item
          name="check1"
          rules={[{ required: true, message: 'Please check all boxes' }]}
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
          rules={[{ required: true, message: 'Please check all boxes' }]}
          style={{ display: 'inline-block' }}
        >
          <Checkbox>
            All parents are to remain at The Sajni Center during programs
          </Checkbox>
        </Form.Item>

        <Form.Item
          name="check3"
          rules={[{ required: true, message: 'Please check all boxes' }]}
          style={{ display: 'inline-block' }}
        >
          <Checkbox>
            My children are up to date on all vaccinations and I will provide a
            copy of my children’s immunization records prior to attending any
            programs. (Children who are being treated for cancer often have
            severely compromised immune systems, so we are required to collect
            this information for their safety. All medical information will be
            stored in a HIPPA-compliant manner.)
          </Checkbox>
        </Form.Item>
      </div>

      <div>
        <Paragraph>
          <strong> Photo/Video Release </strong>
          <br />
          Do you authorize the use and reproduction by Lucy’s Love Bus of any
          and all photographs and any other audio-visual materials taken of me
          for promotional material, educational activities, exhibitions or for
          any other use for the benefit of the organization?
          <br />
          <br />
          <i>
            {' '}
            <strong>
              {' '}
              We do not share last names, diagnosis, or hometowns unless given
              explicit permission in order to protect privacy
            </strong>
          </i>
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
              pattern: new RegExp(
                /(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](20)\d\d/,
              ),
            },
          ]}
        >
          <Input placeholder="MM/DD/YYYY" />
        </Form.Item>
      </div>

      <Form.Item className="centered">
        <LinkButton
          to="/signup-pf-p2"
          type="secondary"
          className="button-style"
        >
          Back
        </LinkButton>
        <LinkButton
          to="/signup-verification-gm"
          type="primary"
          className="button-style"
        >
          Next
        </LinkButton>
      </Form.Item>
    </Form>
  );
};

export default SignupConfirmationFormGM;
