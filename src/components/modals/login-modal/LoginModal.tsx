import React, {CSSProperties, useState} from 'react';
import ReactDOM from 'react-dom';
import { useHistory, useLocation } from 'react-router-dom';
import {Button, Form, Input, Layout, Menu, Modal} from 'antd';
import './login-modal.less';
import LoginContent from './LoginContent';
import ForgotPasswordContent from './ForgotPasswordContent';
import PasswordResetContent from './PasswordResetContent';

interface LoginModalProps {
  isShowing: boolean;
  hide: () => void;
}

const renderContent = (currentPage: string, switchToForgotPasswordPage: () => void,
                       switchToPasswordResetPage: () => void) => {
    switch(currentPage) {
        case 'login':
            return <LoginContent switchToForgotPasswordPage={switchToForgotPasswordPage}/>;
        case 'forgotPassword':
            return <ForgotPasswordContent switchToConfirmationPage={switchToPasswordResetPage}/>
        case 'passwordReset':
            return <PasswordResetContent/>;
    }
}

const LoginModal = (props: LoginModalProps) => {
    const [currentPage, setPage] = useState('login');

    const setToForgotPasswordPage = () => {
        setPage('forgotPassword')
    }

    const setToPasswordResetPage = () => {
        setPage('passwordReset')
    }

    return (
        <div className="modal">
            <Modal
            visible={props.isShowing}
            footer={null}
            onCancel={props.hide}>
                {renderContent(currentPage, setToForgotPasswordPage, setToPasswordResetPage)}
            </Modal>
        </div>
    )
};

export default LoginModal;
