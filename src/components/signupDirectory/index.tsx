import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card, Typography, Row, Col, Button } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const { Text } = Typography;

const SignupDirectory: React.FC = () => {
  return (
    <>
      <Row>
        <Col>
          <Card>
            Card #1
          </Card>
        </Col>
        <Col>
          <Card>
            Card #2
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default SignupDirectory;
