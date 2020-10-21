import React, {useState} from 'react';
import {Button, Checkbox, Form, Input, Radio, Upload} from 'antd';

const SignupConfirmation: React.FC = () => {
    const onFinish = (values: any) => {
        // send data to redux
    };

    const inputStyle = {
        borderRadius: '5px',
        height: '48px',
        backgroundColor: '#E5E5E5',
        marginBottom: '15px',
        marginTop: '6px',
        fontSize: '18px',
    };

    const radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
    };

    return (
        <Form
            name="basic"
            layout="vertical"
            initialValues={{ remember: true, }}
            onFinish={onFinish}
            requiredMark={false}
        >
            <div style={{marginTop: '36px',
                fontSize: '18px',}}>
                <Form.Item
                    name="check1"
                    rules={[{ required: true, message: 'Please check all boxes' }]}
                    style={{ display: 'inline-block', }}
                >
                    <Checkbox>
                        No family member or attendee will visit The Sajni Center if they have been sick in the
                        past 24 hours, are feeling ill, have been exposed to a virus, or do not have the appropriate
                        age required immunizations.
                    </Checkbox>
                </Form.Item>

                <Form.Item
                    name="check2"
                    rules={[{ required: true, message: 'Please check all boxes' }]}
                    style={{ display: 'inline-block'}}
                >
                    <Checkbox>
                        All parents are to remain at The Sajni Center during programs
                    </Checkbox>
                </Form.Item>

                <Form.Item
                    name="check3"
                    rules={[{ required: true, message: 'Please check all boxes' }]}
                    style={{ display: 'inline-block'}}
                >
                    <Checkbox>
                        My children are up to date on all vaccinations and I will provide a copy of my children’s
                        immunization records prior to attending any programs. (Children who are being treated for cancer
                        often have severely compromised immune systems, so we are required to collect this
                        information for their safety. All medical information will be stored in a HIPPA-compliant manner.)
                    </Checkbox>
                </Form.Item>
            </div>

            <div style={{marginTop: '36px',
                    fontSize: '18px',}}>
                <p className="photoRelease">
                    <strong>Photo/Video Release</strong><br/>
                    Do you authorize the use and reproduction by Lucy’s Love Bus of any and all photographs
                    and any other audio-visual materials taken of me for promotional material, educational
                    activities, exhibitions or for any other use for the benefit of the organization?
                    <br/>
                    <br/>
                    <i> <strong> We do not share last names, diagnosis, or hometowns unless given explicit permission in order to protect privacy</strong></i>
                </p>

                <Form.Item name="photoRelease"
                           rules={[{ required: true, message: 'Please select one option.'}]}>
                    <Radio.Group className="photo-release-radio">
                        <Radio value={1} style={radioStyle}>
                            I consent to photo/video release
                        </Radio>
                        <Radio value={2} style={radioStyle}>
                            I do not consent to photo/video release
                        </Radio>
                    </Radio.Group>
                </Form.Item>
            </div>

            <div>
                <Form.Item
                    label="Head of Family Name"
                    name="headOfFamilyName"
                    rules={[{ required: true, message: 'Please input the name of the head of the family' }]}
                    style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px 0px 0px' }}
                >
                    <Input style={inputStyle} placeholder="Head of Family Name"/>
                </Form.Item>

                <Form.Item
                    label="Head of Family Initials"
                    name="headOfFamilyInitials"
                    rules={[{ required: true, message: 'Please input head of family\'s initials'}]}
                    style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px 0px 0px' }}
                >
                    <Input style={inputStyle} placeholder="Head of Family Initials"/>
                </Form.Item>

                <Form.Item
                    label="Date of Signature"
                    name="dateOfSignature"
                    rules={[{ required: true,
                                message: 'Please input the date of signature',
                                pattern: new RegExp(/(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d/),}]}
                    style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px 0px 0px' }}
                >
                    <Input style={inputStyle} placeholder="MM/DD/YYYY"/>
                </Form.Item>
            </div>

            <div className="button-div"
                 style={{
                     marginTop: '60px',
                     alignItems: 'center',
                 }}>
                <Form.Item>
                    <Button style={{
                                display: 'inline-block',
                                margin: '0 8px',
                                width: '195px',
                                height: '45px',
                                borderRadius: '5px',
                                background: '#C5C5C5',}}>
                        Back
                    </Button>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit"
                            style={{
                                display: 'inline-block',
                                margin: '0 8px',
                                width: '195px',
                                height: '45px',
                                borderRadius: '5px',
                                background: '#505050',}}>
                        Submit Request
                    </Button>
                </Form.Item>
            </div>

        </Form>
    );
};

export default SignupConfirmation;
