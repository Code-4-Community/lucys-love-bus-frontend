import { BugOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';
const { Text, Link } = Typography;
const LittleBugIcon = styled(BugOutlined)`
  margin: 3px;
`;
const StickyFooter = styled.footer`
  position: fixed;
  left: 0;
  bottom: 0;
  height: 25px;
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.95);
`;

const BugReportFooter: React.FC = () => {
  return (
    <StickyFooter>
      <LittleBugIcon />{' '}
      <Text>
        Notice something off?{' '}
        <Link href="https://docs.google.com/forms/d/e/1FAIpQLSdaAuvzDfV4fb_SDbsfY3TSTwHKAyDa5dMgTnr1okE9COUTdA/viewform">
          Submit a Bug Report!
        </Link>
      </Text>
    </StickyFooter>
  );
};

export default BugReportFooter;
