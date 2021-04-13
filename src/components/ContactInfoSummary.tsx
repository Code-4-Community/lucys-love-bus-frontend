import { Col, Row, Space, Typography } from 'antd';
import dateformat from 'dateformat';
import React from 'react';
import styled from 'styled-components';
import { ContactInfo } from '../containers/setContacts/ducks/types';
import { DEFAULT_IMAGE } from '../utils/copy';
const { Title, Text, Paragraph } = Typography;

interface ContactInfoSummaryProps {
  info: ContactInfo;
}

const ContactRow = styled.div`
  height: 200px;
  margin-bottom: 16px;
`;

const ProfilePicture = styled.img`
  width: 200px;
  height: 200px;

  object-fit: cover;
  float: left;
  margin-right: 16px;
`;

const CopyContainer = styled.div`
  width: 100%;
  height: 200px;
`;

const NameTitle = styled(Text)`
  font-size: 1.6rem;
  display: block;
  margin-bottom: 16px;
`;

const SectionTitle = styled(Text)`
  font-weight: 800;
  font-size: 1.2rem;
  display: block;
  margin-bottom: 16px;
`;

const FamilyDetails: React.FC<ContactInfoSummaryProps> = ({ info }) => {
  return (
    <>
      <SectionTitle>Account Owner</SectionTitle>
      <ContactRow>
        <ProfilePicture src={DEFAULT_IMAGE} />
        <CopyContainer>
          <Row>
            <Col span={24}>
              <Text>User ID: {1}</Text>
              <NameTitle>
                {info.mainContact.firstName} {info.mainContact.lastName}
              </NameTitle>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <Space direction="vertical">
                <span>
                  <Text strong>Email: </Text>
                  <Text>{info.mainContact.email}</Text>
                </span>
                <span>
                  <Text strong>Date of Birth: </Text>
                  <Text>
                    {dateformat(info.mainContact.dateOfBirth, 'longDate')}
                  </Text>
                </span>
                <span>
                  <Text strong>Pronouns: </Text>
                  <Text>{info.mainContact.pronouns || 'Unknown'}</Text>
                </span>
                <span>
                  <Text strong>Referral: </Text>
                  <Text>{info.mainContact.referrer || 'None'}</Text>
                </span>
              </Space>
            </Col>
            <Col span={6}>
              <Space direction="vertical">
                <Text strong>Address: </Text>
                <Text>{info.location.address}</Text>
                <Text>
                  {info.location.city}, {info.location.state}
                </Text>
                <Text>{info.location.zipCode}</Text>
              </Space>
            </Col>
            <Col span={6}>
              <Space direction="vertical">
                <Text strong>Allergies</Text>
                <Text>{info.mainContact.allergies || 'None'}</Text>
              </Space>
            </Col>
            <Col span={6}>
              <Space direction="vertical">
                <Text strong>Other Notes</Text>
                <Text>{info.mainContact.notes || 'None'}</Text>
              </Space>
            </Col>
          </Row>
        </CopyContainer>
      </ContactRow>
      <SectionTitle>Family Members</SectionTitle>
      {info.additionalContacts.map((contact) => (
        <ContactRow>
          <ProfilePicture src={contact.profilePicture || DEFAULT_IMAGE} />
          <CopyContainer>
            <Row>
              <Col span={24}>
                <NameTitle>
                  {contact.firstName} {contact.lastName}
                </NameTitle>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <Space direction="vertical">
                  <span>
                    <Text strong>Relationship: </Text>
                    <Text>Parent/Guardian</Text>
                  </span>
                  <span>
                    <Text strong>Email: </Text>
                    <Text>{contact.email}</Text>
                  </span>
                  <span>
                    <Text strong>Date of Birth: </Text>
                    <Text>{dateformat(contact.dateOfBirth, 'longDate')}</Text>
                  </span>
                  <span>
                    <Text strong>Pronouns: </Text>
                    <Text>{contact.pronouns || 'Unknown'}</Text>
                  </span>
                </Space>
              </Col>
              <Col span={6}>
                <Space direction="vertical">
                  <Text strong>Allergies</Text>
                  <Text>{contact.allergies || 'None'}</Text>
                  <Text strong>Medications</Text>
                  <Text>{contact.medications || 'None'}</Text>
                </Space>
              </Col>
              <Col span={6}>
                <Space direction="vertical">
                  <Text strong>Diagnosis</Text>
                  <Text>{contact.diagnosis || 'None'}</Text>
                </Space>
              </Col>
              <Col span={6}>
                <Space direction="vertical">
                  <Text strong>Other Notes</Text>
                  <Text>{contact.notes || 'None'}</Text>
                </Space>
              </Col>
            </Row>
          </CopyContainer>
        </ContactRow>
      ))}

      {info.children.map((child) => (
        <ContactRow>
          <ProfilePicture src={child.profilePicture || DEFAULT_IMAGE} />
          <CopyContainer>
            <Row>
              <Col span={24}>
                <NameTitle>
                  {child.firstName} {child.lastName}
                </NameTitle>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <Space direction="vertical">
                  <span>
                    <Text strong>Relationship: </Text>
                    <Text>Child</Text>
                  </span>
                  <span>
                    <Text strong>Date of Birth: </Text>
                    <Text>{dateformat(child.dateOfBirth, 'longDate')}</Text>
                  </span>
                  <span>
                    <Text strong>Pronouns: </Text>
                    <Text>{child.pronouns || 'Unknown'}</Text>
                  </span>
                </Space>
              </Col>
              <Col span={6}>
                <Space direction="vertical">
                  <Text strong>Allergies</Text>
                  <Text>{child.allergies || 'None'}</Text>
                  <Text strong>Medications</Text>
                  <Text>{child.medications || 'None'}</Text>
                </Space>
              </Col>
              <Col span={6}>
                <Space direction="vertical">
                  <Text strong>Diagnosis</Text>
                  <Text>{child.diagnosis || 'None'}</Text>
                </Space>
              </Col>
              <Col span={6}>
                <Space direction="vertical">
                  <Text strong>Other Notes</Text>
                  <Text>{child.notes || 'None'}</Text>
                </Space>
              </Col>
            </Row>
          </CopyContainer>
        </ContactRow>
      ))}
    </>
  );
};

export default FamilyDetails;
