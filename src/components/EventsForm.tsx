import {
  Alert,
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Typography,
  Upload,
} from 'antd';
import { Moment } from 'moment';
import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { EventInformation } from '../containers/upcoming-events/ducks/types';
import { AsyncRequest, asyncRequestIsFailed } from '../utils/asyncRequest';
import { FileField } from '../utils/fileEncoding';
import FormContainer from './FormContainer';

const { Paragraph } = Typography;
const { Dragger } = Upload;
const { TextArea } = Input;

const PaddedAlert = styled(Alert)`
  margin-top: 1em;
  margin-bottom: 2em;
`;

const InlineFormItem = styled(Form.Item)`
  display: inline-block;
`;

const HalfWidthInput = styled(InputNumber)`
  width: 50%;
`;

const DateText = styled(Paragraph)`
  display: inline-block;
  margin-left: 8px;
  margin-right: 8px;
  margin-top: 32px;
`;

export interface EventsForm {
  title: string;
  capacity: number;
  price: number;
  description: string;
  location: string;
}

export interface EventsFormData extends EventsForm {
  thumbnail?: FileField;
  privateDescription?: string;
  start: Date;
  end: Date;
}

export interface EventsFormInitialValues extends EventsForm {
  thumbnail?: string;
  privateDescription?: string;
  start: Moment;
  end: Moment;
}

export interface EventsFormProps {
  onFinish: (data: EventsFormData) => Promise<void>;
  initialValues?: EventsFormInitialValues;
  edit: boolean;
  eventRequest: AsyncRequest<EventInformation, any>;
}

const EventsForm: React.FC<EventsFormProps> = ({
  onFinish,
  initialValues,
  edit,
  eventRequest,
}) => {
  return (
    <FormContainer>
      <Helmet>
        <title>Create Event</title>
      </Helmet>
      <Form
        name="basic"
        layout="vertical"
        initialValues={initialValues}
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

        <InlineFormItem
          name="start"
          fieldKey="start"
          label="Start Date"
          rules={[
            {
              required: true,
              message: 'Please input the start date and time of the event',
            },
          ]}
        >
          <DatePicker showTime use12Hours format="MM/DD/YYYY hh:mm A" />
        </InlineFormItem>

        <DateText>to</DateText>

        <InlineFormItem
          name="end"
          fieldKey="end"
          label="End Date"
          rules={[
            {
              required: true,
              message: 'Please input the end date and time of the event',
            },
          ]}
        >
          <DatePicker showTime use12Hours format="MM/DD/YYYY hh:mm A" />
        </InlineFormItem>

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
          <HalfWidthInput placeholder="Spots Available" min={0} />
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
          <HalfWidthInput defaultValue={0} min={0} />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: 'Please input an event description',
            },
          ]}
        >
          <TextArea rows={3} placeholder="Description" />
        </Form.Item>

        <Form.Item
          label="Private Description"
          name="privateDescription"
          rules={[
            {
              required: false,
              message:
                'Input an event description intended only for registered members (i.e. Zoom meeting link)',
            },
          ]}
        >
          <TextArea rows={3} placeholder="Private Description" />
        </Form.Item>

        <Form.Item label="Add Image" name="thumbnail">
          <Dragger multiple={false} beforeUpload={() => false}>
            <p>Drag and Drop Image File to Upload (.jpeg, .png)</p>
            <u>Or Browse Your Computer</u>
          </Dragger>
        </Form.Item>

        {asyncRequestIsFailed(eventRequest) && (
          <PaddedAlert
            message="Error"
            description={eventRequest.error.message}
            type="error"
            showIcon
          />
        )}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {edit ? 'Save Changes' : 'Create Event'}
          </Button>
        </Form.Item>
      </Form>
    </FormContainer>
  );
};

export default EventsForm;
