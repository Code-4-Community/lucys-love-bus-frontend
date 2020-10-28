import React, { useState } from 'react';
import './modals.less';
import { Row, Col, Typography, Button, Modal } from 'antd';
import LoginModal from '../../components/modals/login-modal/LoginModal';
const { Title, Paragraph } = Typography;

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);

  function toggle() {
    setIsShowing(!isShowing);
  }

  return {
    isShowing,
    toggle,
  };
};

const Modals: React.FC = () => {
  const { isShowing, toggle } = useModal();

  return (
    <>
      <Button onClick={toggle} type="primary">
        Open Modal
      </Button>
      <LoginModal isShowing={isShowing} hide={toggle} />
    </>
  );
};

export default Modals;
