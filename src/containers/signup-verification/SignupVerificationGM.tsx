import React from 'react';
import './signup-verification.less';
import { Helmet } from 'react-helmet';
import { Typography } from 'antd';
const { Title, Paragraph } = Typography;

const SignupVerificationGM: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Signup Confirmation - Participating Family</title>
                <meta name="description" content="Description goes here." />
            </Helmet>

            <div className="content-container">
                <Title level={5} className="centered-text">
                    VERIFY EMAIL
                </Title>

                <Title level={3} className="centered-text">
                    Thank you for signing up!
                </Title>

                <Paragraph className="centered-text">
                    {' '}
                    We are incredibly excited for you to become a General Member at The Sajni Center.
                    An Admin will be reviewing your request, and you will receive a confirmation email shortly. {' '}
                </Paragraph>

            </div>
        </>
    );
};

export default SignupVerificationGM;
