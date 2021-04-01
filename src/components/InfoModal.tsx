import { Typography } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React from 'react';
import styled from 'styled-components';

const { Text, Paragraph } = Typography;

const ModalBody = styled.div`
    padding-top: 15px;
`;

const ModalTitle = styled(Text)`
  font-size: 20px;
  font-weight: 800;
`;

const StyledModal = styled(Modal)`
  min-width: 200px;
  max-width: 400px;
`;

export interface InfoModalProps {
    header: string | JSX.Element,
    subHeader?: string | JSX.Element,
    isVisible: boolean;
    setIsModalVisible: (visible: boolean) => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({
    header,
    subHeader,
    isVisible,
    setIsModalVisible
}) => {

    return (
        <StyledModal
            visible={isVisible}
            maskClosable={false}
            footer={null}
            onCancel={() => setIsModalVisible(false)}
        >
            {
                <ModalBody>
                    <ModalTitle>
                        {header}
                    </ModalTitle>
                    <Paragraph>
                        {subHeader ?? ""}
                    </Paragraph>
                </ModalBody>
            }
        </StyledModal>
    )
};
