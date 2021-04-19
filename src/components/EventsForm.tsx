import {
  Alert,
  Button,
  DatePicker,
  TimePicker,
  Form,
  Input,
  InputNumber,
  Upload,
} from 'antd';
import Paragraph from 'antd/lib/skeleton/Paragraph';
import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { UserAuthenticationReducerState } from '../auth/ducks/types';
import {
  asyncRequestIsFailed,
  asyncRequestIsLoading,
} from '../utils/asyncRequest';
import FormContainer from './FormContainer';

const { Dragger } = Upload;
const { TextArea } = Input;

const PaddedAlert = styled(Alert)`
  margin-top: 1em;
  margin-bottom: 2em;
`;

export interface EventsFormData {
  title: string,
  capacity: number,
  thumbnail?: string,
  price: number,
  description: string,
  location: string,
  start: Date,
  end: Date,
}

interface EventsFormProps {
  onFinish: (data: EventsFormData) => Promise<void>;
  tokens: UserAuthenticationReducerState['tokens'];
  edit: boolean;
}

const EventsForm: React.FC<EventsFormProps> = ({ onFinish, tokens, edit }) => {
  return (
    <FormContainer>
      <Helmet>
        <title>Create Event</title>
      </Helmet>
      <Form
        name="basic"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Event Name"
          name="title"
          rules={[
            { required: true, message: 'Please input the name of the event' },
          ]}
        >
          <Input placeholder="Event Name" />
        </Form.Item>

        <Form.Item
          label="Event Location"
          name="location"
          rules={[
            {
              required: true,
              message: 'Please input the location of the event',
            },
          ]}
        >
          <Input placeholder="Event Location" />
        </Form.Item>

        <Form.Item
          name="start"
          fieldKey="start"
          style={{ display: 'inline-block' }}
          label="Start Date"
          rules={[
            {
              required: true,
              message: 'Please input the start date and timeof the event',
            },
          ]}
        >
          <DatePicker style={{ marginRight: '8px' }} showTime use12Hours/>
        </Form.Item>
        <p>
          to</p>
        <Form.Item
          name="end"
          fieldKey="end"
          style={{ display: 'inline-block' }}
          label="End Date"
          rules={[
            {
              required: true,
              message: 'Please input the end date and time of the event',
            },
          ]}
        >
          <DatePicker style={{ marginLeft: '8px' }} showTime use12Hours/>
        </Form.Item>

        <Form.Item
          label="Spots Available"
          name="capacity"
          rules={[
            {
              required: true,
              message: 'Please input the number of spots available',
            },
          ]}
        >
          <InputNumber
            placeholder="Spots Available"
            min={0}
            style={{ width: '50%' }}
          />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[
            {
              required: true,
              message: 'Please input the price of the event',
            },
          ]}
        >
          <InputNumber placeholder="Price" min={0} style={{ width: '50%' }} />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <TextArea rows={3} placeholder="Description" />
        </Form.Item>

        <Form.Item label="Meeting Link" name="meetingLink">
          <Input placeholder="Meeting Link" />
        </Form.Item>

        <Form.Item label="Add Image" name="thumbnail">
          <Dragger multiple={false} beforeUpload={() => false}>
            <p>Drag and Drop Image File to Upload (.jpeg, .png)</p>
            <u>Or Browse Your Computer</u>
          </Dragger>
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
            Create Event
          </Button>
        </Form.Item>
      </Form>
    </FormContainer>
  );
};

export default EventsForm;
