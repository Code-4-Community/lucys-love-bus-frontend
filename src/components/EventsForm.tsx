import {
    Alert,
    Button,
    DatePicker,
    Form,
    Input,
    Select,
    Typography,
    Upload,
  } from 'antd';
  import React from 'react';
  import { Helmet } from 'react-helmet';
  import styled from 'styled-components';
  import { UserAuthenticationReducerState } from '../auth/ducks/types';
import { NewEventInformation } from '../containers/createEvent/ducks/types';
  import {
    asyncRequestIsFailed,
    asyncRequestIsLoading,
  } from '../utils/asyncRequest';
  import FormContainer from './FormContainer';
  import FormInitialText from './FormInitialText';
  
  const { Title, Paragraph, Text } = Typography;
  const { Dragger } = Upload;
  const { TextArea } = Input;
  
  const PaddedAlert = styled(Alert)`
    margin-top: 1em;
    margin-bottom: 2em;
  `;
  
  interface EventsFormProps {
    onFinish: (data: NewEventInformation) => void;
    tokens: UserAuthenticationReducerState['tokens'];
  }

  const EventsForm: React.FC<EventsFormProps> = ({
    onFinish,
    tokens,
  }) => {
    return (
      <FormContainer>
        <Helmet>
          <title>Create Event</title>
        </Helmet>
        <FormInitialText>
          <Title level={5}>Create an Event</Title>
        </FormInitialText>
        <Form
          name="basic"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Event Name"
            name="eventName"
            rules={[{ required: true, message: 'Please input the name of the event' }]}
          >
            <Input placeholder="Event Name" />
          </Form.Item>
  
          <Form.Item
            label="Location"
            name="location"
            rules={[{ required: true, message: 'Please input the location of the event' }]}
          >
            <Input placeholder="Location" />
          </Form.Item>
  
          <Form.Item
            name="date"
            fieldKey="date"
            label="Date"
            rules={[
              {
                required: true,
                message: 'Please input the date of the event',
              },
            ]}
          >
            <DatePicker />
          </Form.Item>
  
          <Form.Item
            label="Start Time"
            name="startTime"
            rules={[
              {
                required: true,
                message: 'Please input the start time of the event',
              },
            ]}
          >
            {/* Time Picker Here */}
          </Form.Item>

          <Form.Item
            label="End Time"
            name="endTime"
            rules={[
              {
                required: true,
                message: 'Please input the end time of the event',
              },
            ]}
          >
            {/* Time Picker Here */}
          </Form.Item>
  
          <Form.Item
            label="Spots Available"
            name="spotsAvailable"
            rules={[
              {
                required: true,
                message: 'Please input the number of spots available',
              },
            ]}
          >
            <Input placeholder="Spots Available" />
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
            <Input placeholder="Price" />
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
            <Input placeholder="Price" />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <TextArea rows={3} placeholder="Description" />
          </Form.Item>

          <Form.Item
            label="Meeting Link"
            name="meetingLink"
          >
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
              Submit
            </Button>
          </Form.Item>
        </Form>
      </FormContainer>
    );
  };
  
  export default EventsForm;
  