import { Form, Input } from 'antd';
import React from 'react';

//TODO: use this fragment in signup form, note that "zip" was renamed to "zipCode"
const LocationFormFragment: React.FC = () => {
  return (
    <>
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
        label="City"
        className="inline-block-third"
        rules={[{ required: true, message: 'Please input city' }]}
      >
        <Input placeholder="City" />
      </Form.Item>
      <Form.Item
        name="state"
        label="State"
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
        name="zipCode" 
        label="Zip Code"
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
    </>
  );
};

export default LocationFormFragment;
