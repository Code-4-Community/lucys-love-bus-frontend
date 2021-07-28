import { Card, Typography } from 'antd';
import dateFormat from 'dateformat';
import React from 'react';
import styled from 'styled-components';
import { Announcement } from '../containers/announcements/ducks/types';
import { DEFAULT_IMAGE } from '../utils/copy';
import { AnnouncementModal } from './AnnouncementModal';

const { Text, Paragraph } = Typography;

const CardTitle = styled(Text)`
  font-size: 20px;
  font-weight: 800;
`;

const AnnouncementCardCover = styled(Card)`
  cursor: pointer;
  height: fit-content;
  width: 400px;
  margin: 16px 16px;

  .cardImg {
    height: 250px;
    object-fit: cover;
  }

  @media screen and (max-width: 700px) {
    width: 85%;
  }
`;

const DateText = styled(Text)`
  font-size: 16px;
`;

interface AnnouncementCardProps extends Announcement {
  condensed?: boolean;
}

export const AnnouncementCard: React.FC<AnnouncementCardProps> = ({
  id,
  imageSrc,
  title,
  created,
  description,
  condensed,
}) => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const cardContent: JSX.Element = (
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
  );
  return (
    <>
      <AnnouncementCardCover
        cover={
          !condensed && (
            <img
              className="cardImg"
              alt="Announcement"
              src={imageSrc || DEFAULT_IMAGE}
            />
          )
        }
        onClick={() => setIsModalVisible((prevState) => !prevState)}
      >
        {cardContent}
      </AnnouncementCardCover>

      <AnnouncementModal
        id={id}
        imageSrc={imageSrc}
        title={title}
        created={created}
        description={description}
        isVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </>
  );
};
