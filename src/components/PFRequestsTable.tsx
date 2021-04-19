import React, { useEffect, useState } from 'react';
import protectedApiClient, {
  PFRequestResponse,
} from '../api/protectedApiClient';
import { LinkButton } from './LinkButton';
import { Table } from 'antd';
import styled from 'styled-components';

const RequestsTable = styled(Table)`
  display: flex;
  justify-content: left;
  align-items: center;
  margin-left: 16px;
`;

interface PFRequestData {
  name: string;
  email: string;
  phoneNumber: string;
}

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
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Phone Number',
    dataIndex: 'phoneNumber',
    key: '1',
    width: 150,
  },
  {
    title: '',
    dataIndex: 'viewRequest',
    key: '2',
    width: 150,
  },
];

const PFRequestsTable = () => {
  const [data, setData] = useState<PFRequestData[]>([]);

  useEffect(() => {
    const getPFRequestsData = async () => {
      const pfRequests: PFRequestResponse = await protectedApiClient.getPFRequests();
      setData(
        pfRequests.data.requests.map((pfRequest) => {
          return {
            name: pfRequest.user.firstName.concat(' ', pfRequest.user.lastName),
            email: pfRequest.user.email,
            phoneNumber: pfRequest.user.phoneNumber,
            viewRequest: (
              <LinkButton to={'/view-request/' + pfRequest.user.id}>
                View Request
              </LinkButton>
            ),
          };
        }),
      );
    };
    getPFRequestsData();
  }, []);

  return <RequestsTable bordered dataSource={data} columns={columns} />;
};

export default PFRequestsTable;
