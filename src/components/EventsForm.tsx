import {
  Alert,
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Upload,
} from 'antd';
import { Moment } from 'moment';
import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { UserAuthenticationReducerState } from '../auth/ducks/types';
import {
  asyncRequestIsFailed,
  asyncRequestIsLoading,
} from '../utils/asyncRequest';
import { FileField } from '../utils/fileEncoding';
import FormContainer from './FormContainer';
import {CreateEventReducerState} from '../containers/createEvent/ducks/types';
import {create} from 'domain';

const { Dragger } = Upload;
const { TextArea } = Input;

const PaddedAlert = styled(Alert)`
  margin-top: 1em;
  margin-bottom: 2em;
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
  start: Date;
  end: Date;
}

export interface EventsFormInitialValues extends EventsForm{
  thumbnail?: string;
  start: Moment;
  end: Moment;
}

export interface EventsFormProps {
  onFinish: (data: EventsFormData) => Promise<void>;
  initialValues?: EventsFormInitialValues;
  edit: boolean;
  eventRequest: CreateEventReducerState['newEvent']
}

const EventsForm: React.FC<EventsFormProps> = ({
  onFinish,
  edit,
  initialValues,
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

        <Form.Item
          name="start"
          fieldKey="start"
          style={{ display: 'inline-block' }}
          label="Start Date"
          rules={[
            {
              required: true,
              message: 'Please input the start date and time of the event',
            },
          ]}
        >
          <DatePicker
            style={{ marginRight: '8px' }}
            showTime
            use12Hours
            format="MM/DD/YYYY hh:mm A"
          />
        </Form.Item>

        <p
          style={{
            display: 'inline-block',
            marginLeft: '8px',
            marginRight: '8px',
            marginTop: '32px',
          }}
        >
          to
        </p>

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
          <DatePicker
            style={{ marginLeft: '8px' }}
            showTime
            use12Hours
            format="MM/DD/YYYY hh:mm A"
          />
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
          <InputNumber defaultValue={0} min={0} style={{ width: '50%' }} />
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

        {/* We will come back to this in a second PR because it requires backend changes too :)
        <Form.Item label="Meeting Link" name="meetingLink">
          <Input placeholder="Meeting Link" />
        </Form.Item> */}

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
          <Button
            type="primary"
            disabled={asyncRequestIsLoading(eventRequest)}
            htmlType="submit"
          >
            {edit ? 'Save Changes' : 'Create Event'}
          </Button>
        </Form.Item>
      </Form>
    </FormContainer>
  );
};

export default EventsForm;
