import React, { useState } from 'react';
import { AnnouncementCard } from '../AnnouncementCard';
import styled from 'styled-components';
import { AnnouncementProps } from '../../containers/announcements/ducks/types';
import { ORANGE, LINK } from '../../utils/colors';

const NoAnnouncementsSubText = styled.span`
  display: block;
  text-align: center;
`;

const NoAnnouncementsText = styled(NoAnnouncementsSubText)`
  color: ${ORANGE};
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
  margin: 0px 8px;
`;

const SelectedPageNumber = styled(PageNumber)`
  color: ${LINK};
  border: 1px solid ${LINK};
`;

const ArrowButton = styled(PageNumber)`
  color: #BFBFBF;
`;

export interface AnnouncementsListProps {
  announcements: AnnouncementProps[];
}

const AnnouncementsList: React.FC<AnnouncementsListProps> = ({announcements}) => {
  const [announcementsPerPage, setAnnouncementsPerPage] = useState<number>(6);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleNextPage = (event: any) => {
    console.log(event.target.id);
    setCurrentPage(currentPage + 1);
  }

  const handlePreviousPage = (event: any) => {
    setCurrentPage(currentPage - 1);
  }

  const handleNoOnClick = (event: any) => {
    setCurrentPage(currentPage);
  }

  const handlePageClick = (event: any) => {
    setCurrentPage(parseInt(event.target.id));
  };

  const indexOfLastAnnouncement = currentPage * announcementsPerPage;
  const indexOfFirstAnnouncement = indexOfLastAnnouncement - announcementsPerPage;
  const currentAnnouncements = announcements.slice(indexOfFirstAnnouncement, indexOfLastAnnouncement);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(announcements.length / announcementsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map((number) => {
    if (number != currentPage) {
      return <PageNumber key={number} id={number.toString()} onClick={handlePageClick}>
        {number}
      </PageNumber>
    }
    else {
      return <SelectedPageNumber key={number} id={number.toString()} onClick={handlePageClick}>
      {number}
    </SelectedPageNumber>
    }
  });

  return (
    <>
      <AnnouncementsListWrapper>
        {currentAnnouncements.map(announcement => {
          return <AnnouncementCard {...announcement}/>
        })}
      </AnnouncementsListWrapper>
      
      {announcements.length > 6 ? <PageNumbersWrapper>
        <ArrowButton onClick={currentPage == 1 ? handleNoOnClick : handlePreviousPage}>
          {'<'}
        </ArrowButton>
        {renderPageNumbers}
        <ArrowButton onClick={currentPage == pageNumbers[pageNumbers.length - 1] ? handleNoOnClick : handleNextPage}>
          {'>'}
        </ArrowButton>
      </PageNumbersWrapper> : null}
    </>
  );
};

export default AnnouncementsList;
