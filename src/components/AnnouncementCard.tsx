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
  min-width: 200px;
  max-width: 400px;
  margin: 16px 16px;

  @media screen and (min-width: 800px) {
    min-width: 400px;
  }

  .cardImg {
    height: 250px;
    object-fit: cover;
  }
`;

const DateText = styled(Text)`
  font-size: 16px;
`;

interface AnnoucementCardProps extends Announcement {
  condensed?: boolean;
}

export const AnnouncementCard: React.FC<AnnoucementCardProps> = ({
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
