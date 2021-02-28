import { Card, Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';
import dateFormat from 'dateformat';
import { AnnouncementModal } from './AnnouncementModal';
import { AnnouncementProps } from '../containers/announcements/ducks/types'

const { Text, Paragraph } = Typography;

const CardTitle = styled(Text)`
  font-size: 20px;
  font-weight: 800;
`;

const AnnouncementCardNoCover = styled(Card)`
  cursor: pointer;
  height: 100%;
  min-width: 200px;
  max-width: 400px;
`;

const AnnouncementCardCover = styled(AnnouncementCardNoCover)`
  height: fit-content;
  img {
    height: 250px;
    object-fit: cover;
  }
`;

const DateText = styled(Text)`
  font-size: 16px;
`;

export const AnnouncementCard: React.FC<AnnouncementProps> = ({
  imageSrc,
  title,
  created,
  description,
}) => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);


  const handleVisible = () => {
    setIsModalVisible(!isModalVisible);
  }

  const getCardContent = () => {
    return (
      <>
        <div>
          <DateText strong>{dateFormat(created, 'longDate')}</DateText>
        </div>
        <div>
          <CardTitle>{title}</CardTitle>
        </div>
        <div>
          <Paragraph ellipsis={{ rows: 3 }}>{description}</Paragraph>
        </div>
      </>
    )
  }

  return (
    imageSrc ? (
      <>
        <AnnouncementCardCover cover={<img alt="example" src={imageSrc} />} onClick={() => handleVisible()}>
          {getCardContent()}
        </AnnouncementCardCover>

        <AnnouncementModal
          imageSrc={imageSrc}
          title={title}
          created={created}
          description={description}
          isVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        />
      </>
    ) : (
        <>
          <AnnouncementCardNoCover onClick={() => handleVisible()}>
            {getCardContent()}
          </AnnouncementCardNoCover>

          <AnnouncementModal
            title={title}
            created={created}
            description={description}
            isVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
          />
        </>
      )
  )
};
