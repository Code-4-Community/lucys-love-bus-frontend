import { Card, Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';
import dateFormat from 'dateformat';
import { AnnouncementModal } from './AnnouncementModal';
import { Announcement } from '../containers/announcements/ducks/types';

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

export const AnnouncementCard: React.FC<Announcement> = (props) => {
    const [isModalVisible, setIsModalVisible] = React.useState(false);

    const getCardContent = (() => {
        return (
            <>
                <div>
                    <DateText strong>{dateFormat(props.created, 'longDate')}</DateText>
                </div>
                <div>
                    <CardTitle>{props.title}</CardTitle>
                </div>
                <div>
                    <Paragraph ellipsis={{ rows: 3 }}>{props.description}</Paragraph>
                </div>
            </>
        );
    })();

    return props.imageSrc ? (
        <>
            <AnnouncementCardCover
                cover={
                    <img className="cardImg" alt="Announcement" src={props.imageSrc} />
                }
                onClick={() => setIsModalVisible((prevState) => !prevState)}
            >
                {getCardContent}
            </AnnouncementCardCover>

            <AnnouncementModal
                imageSrc={props.imageSrc}
                title={props.title}
                created={props.created}
                description={props.description}
                isVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
            />
        </>
    ) : (
            <>
                <AnnouncementCardNoCover
                    onClick={() => setIsModalVisible((prevState) => !prevState)}
                >
                    {getCardContent}
                </AnnouncementCardNoCover>

                <AnnouncementModal
                    title={props.title}
                    created={props.created}
                    description={props.description}
                    isVisible={isModalVisible}
                    setIsModalVisible={setIsModalVisible}
                />
            </>
        );
};
