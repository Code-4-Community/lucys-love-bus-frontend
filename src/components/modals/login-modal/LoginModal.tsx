import React, {CSSProperties, useState} from 'react';
import ReactDOM from 'react-dom';
import { useHistory, useLocation } from 'react-router-dom';
import { Layout, Menu, Modal } from 'antd';
import './login-modal.less';

interface LoginModalProps {
  isShowing: boolean;
  hide: () => void;
}

const LoginModal: (props: LoginModalProps) => React.ReactPortal | null = (props: LoginModalProps) =>
  props.isShowing ? ReactDOM.createPortal(
        <React.Fragment>
          <Modal
              visible={props.isShowing}
              onOk={props.hide}>
              <p>
                  <div className="content">
                      <strong>This is a test</strong>
                  </div>
              </p>
          </Modal>
        </React.Fragment>,
        document.body,) : null;

export default LoginModal;
