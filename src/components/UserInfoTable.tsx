/* eslint-disable */
/**
 * Why I disabled eslint: (Ryan)
 * Linting this file yields two types of errors:
 * 1. Component definition is missing display name: this comes from the anonymous functions rendering JSX.
 *    The functions that do this are straight from AntD docs and as far as I'm concerned theyre the only way
 *    to get search working properly. I'm sure if we had a month to figure out what AntD is doing we could
 *    remake these functions to make eslint happy but we dont.
 * 2. Do not use "// @ts-ignore" because it alters compilation errors
 *    I make my case for why we should use ts-ignore later in the file. tldr: AntD types are icky and hard to work with
 *    and again, this is idiomatic code straight from the docs. I dont want to spend hours trying to change it to make
 *    Typescript happy.
 */
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Typography } from 'antd';
import React, { useState } from 'react';
import Highlighter from 'react-highlight-words';
import { Link as RouterLink } from 'react-router-dom';
import { PrivilegeLevel } from '../auth/ducks/types';
import { TABLE_HIGHLIGHTED_WORDS } from '../utils/colors';
const { Link } = Typography;

export interface UserSummary {
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
const TablePhotoConsent = (text: UserSummary, record: UserSummary) => (
  <Space size="middle">{record.photoRelease ? 'Yes' : 'No'}</Space>
);
const TableActions = (text: UserSummary, record: UserSummary) => (
  <Space size="middle">
    <RouterLink to={record.detailsLink}>
      <Link>View {record.firstName}'s Family Details</Link>
    </RouterLink>
  </Space>
);

interface UserInfoTableProps {
  users: UserSummary[];
}

const UserInfoTable: React.FC<UserInfoTableProps> = ({ users }) => {
  const [searchText, setSearchText] = useState<string>();
  const [searchedColumn, setSearchedColumn] = useState<string>();

  const getColumnSearchProps: (
    dataIndex: string,
  ) => {
    filterDropdown: (props: {
      setSelectedKeys: (value: string[]) => void;
      selectedKeys: string[];
      confirm: (props?: { closeDropdown: boolean }) => void;
      clearFilters: () => void;
    }) => JSX.Element;
  } = (dataIndex: string) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: string) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value: string, record: { [key: string]: string }) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : '',
    render: (text: string) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: TABLE_HIGHLIGHTED_WORDS,
            padding: 0,
          }}
          searchWords={[searchText || '']}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (
    selectedKeys: string[],
    confirm: () => void,
    dataIndex: string,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'userId',
      key: 'userId',
      sorter: (a: UserSummary, b: UserSummary) => a.userId - b.userId,
      ...getColumnSearchProps('userId'),
    },
    {
      title: 'Type',
      dataIndex: 'privilegeLevel',
      key: 'privilegeLevel',
      sorter: (a: UserSummary, b: UserSummary) =>
        a.privilegeLevel.localeCompare(b.privilegeLevel),
      sortDirections: ['ascend', 'descend'],
      ...getColumnSearchProps('privilegeLevel'),
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
      ...getColumnSearchProps('firstName'),
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
      ...getColumnSearchProps('lastName'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps('email'),
    },

    {
      title: 'Phone No.',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      ...getColumnSearchProps('phoneNumber'),
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

  users.sort((a, b) => {
    if (a.privilegeLevel === b.privilegeLevel) {
      return (a.lastName + a.firstName).localeCompare(b.lastName + b.firstName);
    } else {
      return a.privilegeLevel.localeCompare(b.privilegeLevel);
    }
  });

  /**
   * Why we should ignore this line: (Ryan)
   * AntD requires absolutely ridiculous prop types that are unwieldy and unreadable.
   * The code above works, and even typechecks without the use of 'any' types.
   * I see no reason why I should spend 3 hours in AntD type declaration files just to make
   * the compiler happy. ¯\_(ツ)_/¯
   */
  // @ts-ignore
  return <Table columns={columns} dataSource={users} />;
};

export default UserInfoTable;
