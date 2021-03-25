import { Card, Typography } from 'antd';
import dateFormat from 'dateformat';
import React from 'react';
import styled from 'styled-components';
import { Announcement } from '../containers/announcements/ducks/types';
import { AnnouncementModal } from './AnnouncementModal';

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
  margin: 16px 16px;
  min-height: 400px;

  @media screen and (min-width: 800px) {
    min-width: 400px;
  }
`;

const AnnouncementCardCover = styled(AnnouncementCardNoCover)`
  height: fit-content;
  .cardImg {
    height: 250px;
    object-fit: cover;
  }
`;

const DateText = styled(Text)`
  font-size: 16px;
`;

export const AnnouncementCard: React.FC<Announcement> = ({
  imageSrc,
  title,
  created,
  description,
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
  return imageSrc ? (
    <>
      <AnnouncementCardCover
        cover={<img className="cardImg" alt="Announcement" src={imageSrc} />}
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
  ) : (
    <>
      <AnnouncementCardNoCover
        onClick={() => setIsModalVisible((prevState) => !prevState)}
      >
        {cardContent}
      </AnnouncementCardNoCover>

      <AnnouncementModal
        title={title}
        created={created}
        description={description}
        isVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </>
  );
};
