import React from 'react';
import {Button, Form, Input, Upload} from 'antd';
import {LinkButton} from '../LinkButton';

const PF2SignupForm: React.FC = () => {
    const onFinish = () => {
        // send data to redux
    };

    return (
        <Form
            name="basic"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
        >
            <Form.Item
                label="Enter:"
                name="dummy"
                className="inline-block-half"
            >
                <Input placeholder="" />
            </Form.Item>

            <Form.Item>
                <LinkButton to="/signup-pf-p1"
                            type="secondary"
                            style={{ display: 'inline-block', margin: '0 8px' }}>
                    Back
                </LinkButton>
                <LinkButton to="/signup-confirmation-pf"
                            type="primary"
                            style={{ display: 'inline-block', margin: '0 8px' }}>
                    Next
                </LinkButton>
            </Form.Item>
        </Form>
    );
};

export default PF2SignupForm;


