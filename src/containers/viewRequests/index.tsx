import React from 'react';
import { Button, Table } from 'antd';
import styled from 'styled-components';

const RequestsTable = styled(Table)`
  max-width: 960px;
  margin-left: 75px;
`;

const columns = [
  {
    title: 'Account Owner',
    width: 100,
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Email',
    width: 100,
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Phone Number',
    dataIndex: 'address',
    key: '1',
    width: 150,
  },
  {
    title: 'View Request',
    dataIndex: 'address',
    key: '2',
    width: 150,
  },
];

const ViewRequests = () => {
  return <RequestsTable bordered dataSource={[]} columns={columns} />;
};

export default ViewRequests;
