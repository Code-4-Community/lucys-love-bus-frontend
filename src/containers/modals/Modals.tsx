import React, { useState } from 'react';
import './modals.less';
import { Button } from 'antd';
import LoginModal from '../../components/modals/login-modal/LoginModal';

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

const renderModal = (isShowing: boolean, toggle: () => void) => {
  return <LoginModal isShowing={isShowing} hide={toggle} />;
};

const Modals: React.FC = () => {
  const { isShowing, toggle } = useModal();

  return (
    <div>
      <Button onClick={toggle} type="primary" className="open-modal-button">
        Open Modal
      </Button>
      {isShowing ? renderModal(isShowing, toggle) : null}
    </div>
  );
};

export default Modals;
