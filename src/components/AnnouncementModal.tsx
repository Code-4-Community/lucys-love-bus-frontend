import { Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';
import dateFormat from 'dateformat';
import Modal from 'antd/lib/modal/Modal';
import { AnnouncementProps } from '../containers/announcements/ducks/types';

const { Text, Paragraph } = Typography;

const ModalTitle = styled(Text)`
  font-size: 20px;
  font-weight: 800;
`;

const AnnouncementsModal = styled(Modal)`
  min-width: 200px;
  max-width: 400px;
  img {
    max-width: 100%;
    margin: 20px 0 10px 0;
  }
`;

const AnnouncementsModalNoCover = styled(Modal)`
  height: 100%;
  min-width: 200px;
  max-width: 400px;
`;

const DateText = styled(Text)`
  font-size: 16px;
`;

export interface AnnouncementModalProps extends AnnouncementProps {
    isVisible: boolean;
    setIsModalVisible: (visible: boolean) => void
}

export const AnnouncementModal: React.FC<AnnouncementModalProps> = ({
    imageSrc,
    title,
    created,
    description,
    isVisible,
    setIsModalVisible
}) => {
    
    const getModalContent = () => {
        return (
            <>
                <div>
                    <DateText strong>{dateFormat(created, 'longDate')}</DateText>
                </div>
                <div>
                    <ModalTitle>{title}</ModalTitle>
                </div>
                <div>
                    <Paragraph>{description}</Paragraph>
                </div>
            </>
        )
    }

    return (
        imageSrc ? (
            <AnnouncementsModal visible={isVisible} maskClosable={false} footer={null} onCancel={() => setIsModalVisible(false)}>
                <img alt="example" src={imageSrc} />
                {getModalContent()}
            </AnnouncementsModal>
        ) : (
                <AnnouncementsModalNoCover visible={isVisible} maskClosable={false} footer={null} onCancel={() => setIsModalVisible(false)}>
                    {getModalContent()}
                </AnnouncementsModalNoCover>
            )
    )
};
