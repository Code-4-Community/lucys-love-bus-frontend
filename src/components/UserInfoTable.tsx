import { Space, Table, Typography } from 'antd';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { PrivilegeLevel } from '../auth/ducks/types';

const { Title, Link } = Typography;

export interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  userId: number;
  privilegeLevel: PrivilegeLevel;
  phoneNumber: string;
  profilePicture: string | null;
  photoRelease: boolean;
  detailsLink: string;
}
const TablePhotoConsent = (text: UserInfo, record: UserInfo) => (
  <Space size="middle">{record.photoRelease ? 'Yes' : 'No'}</Space>
);
const TableActions = (text: UserInfo, record: UserInfo) => (
  <Space size="middle">
    <RouterLink to={record.detailsLink}>
      <Link>View {record.firstName}'s Family Details</Link>
    </RouterLink>
  </Space>
);

interface UserInfoTableProps {
  users: UserInfo[];
}

const UserInfoTable: React.FC<UserInfoTableProps> = ({ users }) => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: 'Type',
      dataIndex: 'privilegeLevel',
      key: 'privilegeLevel',
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },

    {
      title: 'Phone No.',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Consent to Photo/Video Release',
      dataIndex: 'photoRelease',
      key: 'photoRelease',
      render: TablePhotoConsent,
    },
    {
      title: 'Action',
      key: 'action',
      render: TableActions,
    },
  ];
  return <Table columns={columns} dataSource={users} />;
};

export default UserInfoTable;
