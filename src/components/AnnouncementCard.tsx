import { Divider, Card, Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';
import dateFormat from 'dateformat';
import { AnnouncementModal } from './AnnouncementModal';

const { Text, Paragraph } = Typography;
const CardTitle = styled(Text)`
  font-size: 20px;
  font-weight: 800;
`;
const CardDivider = styled(Divider)`
  margin-top: 12px;
  margin-bottom: 12px;
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

export interface AnnouncementCardProps {
  src?: string;
  title: string;
  date: Date;
  description: string;
  // to: string; annoucements will eventually need to link to an individual annoucement, for now I am purposefully leaving this out for simplicity
}

export const AnnouncementCard: React.FC<AnnouncementCardProps> = ({
  src,
  title,
  date,
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
          <DateText strong>{dateFormat(date, 'longDate')}</DateText>
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
    src ? (
      <>
        <AnnouncementCardCover cover={<img alt="example" src={src} />} onClick={() => handleVisible()}>
          {getCardContent()}
        </AnnouncementCardCover>

        <AnnouncementModal
          src={src}
          title={title}
          date={date}
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
            date={date}
            description={description}
            isVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
          />
        </>
      )
  )
};
