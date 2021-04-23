import React, { useEffect, useState } from 'react';
import protectedApiClient, {
  PFRequestResponse,
} from '../api/protectedApiClient';
import { Link } from 'react-router-dom';
import { Table, Typography } from 'antd';
import styled from 'styled-components';
const { Title } = Typography;

const RequestsTable = styled(Table)`
  margin-left: 16px;
`;

const StyledTitle = styled(Title)`
  margin-top: 10px;
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
    dataIndex: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Phone Number',
    dataIndex: 'phoneNumber',
  },
  {
    title: 'Actions',
    dataIndex: 'viewRequest',
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
              <Link to={'/view-request/' + pfRequest.id}>View Request</Link>
            ),
          };
        }),
      );
    };
    getPFRequestsData();
  }, []);

  return (
    <>
      <StyledTitle>Pending Requests</StyledTitle>
      <RequestsTable
        bordered
        dataSource={data}
        columns={columns}
        pagination={{ pageSize: 5 }}
      />
    </>
  );
};

export default PFRequestsTable;
