import { BugOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { LIGHT_GREY, PRIMARY } from '../utils/colors';
const { Text, Link } = Typography;
const LittleBugIcon = styled(BugOutlined)`
  margin: 3px;
  margin-right: 6px;
  color: ${PRIMARY};
`;
const StickyFooter = styled.footer`
  position: fixed;
  left: 0;
  bottom: 0;
  height: 30px;
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.95);
  border-top: 1px ${LIGHT_GREY} solid;
  padding-top: 5px;
  border-radius: 5px;
`;

const BugReportFooter: React.FC = () => {
  return (
    <StickyFooter>
      <LittleBugIcon />{' '}
      <Text>
        Notice an issue with the site?{' '}
        <Link href="https://docs.google.com/forms/d/e/1FAIpQLSdaAuvzDfV4fb_SDbsfY3TSTwHKAyDa5dMgTnr1okE9COUTdA/viewform">
          Let us know!
        </Link>
      </Text>
    </StickyFooter>
  );
};

export default BugReportFooter;
