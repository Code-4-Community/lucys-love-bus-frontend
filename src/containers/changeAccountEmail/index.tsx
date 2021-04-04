import React from 'react';
import { Helmet } from 'react-helmet';
import { Alert, Button, Form, Input, Typography } from 'antd';
import { ContentContainer } from '../../components';
import { connect, useDispatch } from 'react-redux';
import { changePrimaryAccountEmail } from './ducks/thunks'
import { asyncRequestIsComplete, asyncRequestIsFailed } from '../../utils/asyncRequest';
import { ChangeAccountEmailReducerState } from './ducks/types';
import ConfirmationMessage from '../../components/ConfirmationMessage';
import { Link as RouterLink } from 'react-router-dom';
import { C4CState } from '../../store';

const { Title, Link } = Typography;

export interface ChangeAccountEmailProps {
    readonly changeAccountEmail: ChangeAccountEmailReducerState['changeAccountEmail'];
}

const ChangeAccountEmail: React.FC<ChangeAccountEmailProps> = ({ changeAccountEmail }) => {
    const dispatch = useDispatch();

    const onFinishChangeEmail = (values: any) => {
        dispatch(changePrimaryAccountEmail(values));
    };

    return (
        <>
            <Helmet>
                <title>Change Account Email</title>
                <meta name="Change account email" content="Change primary account email" />
            </Helmet>
            <ContentContainer>
                <Title>Change Account Email</Title>
                {(() => {
                    if (!asyncRequestIsComplete(changeAccountEmail)) {
                        return (
                            <Form name="basic" onFinish={onFinishChangeEmail}>
                                <Form.Item
                                    label="New Email"
                                    name="newEmail"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input a new email.',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Current Password"
                                    name="currentPassword"
                                    rules={[
                                        { required: true, message: 'Please input your current password.' },
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>
                                {
                                    asyncRequestIsFailed(changeAccountEmail) &&
                                    <Alert
                                        message="Error"
                                        description={changeAccountEmail.error}
                                        type="error"
                                        showIcon
                                    />
                                }
                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                    // disabled={asyncRequestIsLoading(changeAccountEmail)}
                                    >
                                        Update Email
                                    </Button>
                                </Form.Item>
                                Note that this will change the email associated with the primary account owner that receives all notifications and updates.
                            </Form>
                        )
                    } else {
                        return (
                            <ConfirmationMessage
                                title="Change Account Email"
                                message="Your primary account email has been changed!"
                                details={
                                    <span>An email to confirm this update is on its way. Click 
                                        {<RouterLink to="/"> <Link>here</Link> </RouterLink>} to return to the homepage.
                                    </span>
                                }
                            />
                        )
                    }
                })()}

            </ContentContainer>
        </>
    );
}
const mapStateToProps = (state: C4CState): ChangeAccountEmailProps => {
    return {
        changeAccountEmail: state.changeAccountEmailState.changeAccountEmail,
    };
};

export default connect(mapStateToProps)(ChangeAccountEmail);
