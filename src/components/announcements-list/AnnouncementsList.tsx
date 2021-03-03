import { Row } from 'antd';
import React, { useState } from 'react';
import { AnnouncementCard } from '../AnnouncementCard';
import styled from 'styled-components';
import { AnnouncementProps } from '../../containers/announcements/ducks/types';

const NoAnnouncementsSubText = styled.span`
  display: block;
  text-align: center;
`;

const NoAnnouncementsText = styled(NoAnnouncementsSubText)`
  color: #ce4a00;
  font-size: 36px;
  font-weight: 800;
`;

const AnnouncementsListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 40px;
`

const PageNumbersWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const PageNumber = styled.li`
  font-size: 30px;
  list-style-type: none;
  cursor: pointer;
  padding: 0px 16px;
  border: 1px solid #D9D9D9;
  box-sizing: border-box;
  border-radius: 4px;
`;

export interface AnnouncementsListProps {
  announcements: AnnouncementProps[];
}

const AnnouncementsList: React.FC<AnnouncementsListProps> = ({announcements}) => {
  const [announcementsPerPage, setAnnouncementsPerPage] = useState<number>(6);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePageClick = (event: any) => {
    setCurrentPage(event.target.id);
  };

  const indexOfLastAnnouncement = currentPage * announcementsPerPage;
  const indexOfFirstAnnouncement = indexOfLastAnnouncement - announcementsPerPage;
  const currentAnnouncements = announcements.slice(indexOfFirstAnnouncement, indexOfLastAnnouncement);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(announcements.length / announcementsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map((number) => {
    return (
      <PageNumber key={number} id={number.toString()} onClick={handlePageClick}>
        {number}
      </PageNumber>
    );
  });

  return (
    <>
      <AnnouncementsListWrapper>
        {currentAnnouncements.map(announcement => {
          return <AnnouncementCard {...announcement}/>
        })}
      </AnnouncementsListWrapper>

      <PageNumbersWrapper>
        {renderPageNumbers}
      </PageNumbersWrapper>
    </>
  );
};

export default AnnouncementsList;
