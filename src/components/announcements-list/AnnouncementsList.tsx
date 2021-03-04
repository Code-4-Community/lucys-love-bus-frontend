import React, { useState } from 'react';
import { AnnouncementCard } from '../AnnouncementCard';
import styled from 'styled-components';
import { AnnouncementProps } from '../../containers/announcements/ducks/types';
import { ORANGE, LINK } from '../../utils/colors';

const NO_ANNOUNCEMENTS_HEADER = 'There are currently no announcements!';
const NO_ANNOUNCEMENTS_SUBHEADER = 'Come back later for future updates!';

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
`;

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
  border: 1px solid #d9d9d9;
  box-sizing: border-box;
  border-radius: 4px;
  margin: 0px 8px;
`;

const SelectedPageNumber = styled(PageNumber)`
  color: ${LINK};
  border: 1px solid ${LINK};
`;

const ArrowButton = styled(PageNumber)`
  color: #bfbfbf;
`;

const noAnnouncementsTexts = (
  <>
    <NoAnnouncementsText>{NO_ANNOUNCEMENTS_HEADER}</NoAnnouncementsText>
    <NoAnnouncementsSubText>
      {NO_ANNOUNCEMENTS_SUBHEADER}
    </NoAnnouncementsSubText>
  </>
);

export interface AnnouncementsListProps {
  announcements: AnnouncementProps[];
}

const AnnouncementsList: React.FC<AnnouncementsListProps> = ({
  announcements,
}) => {
  const [announcementsPerPage, setAnnouncementsPerPage] = useState<number>(6);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleNextPage = (event: any) => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = (event: any) => {
    setCurrentPage(currentPage - 1);
  };

  const handleNoOnClick = (event: any) => {
    setCurrentPage(currentPage);
  };

  const handlePageClick = (event: any) => {
    setCurrentPage(event.target.value);
  };

  const noAnnouncements = announcements.length === 0;
  const indexOfLastAnnouncement = currentPage * announcementsPerPage;
  const indexOfFirstAnnouncement =
    indexOfLastAnnouncement - announcementsPerPage;
  const currentAnnouncements = announcements.slice(
    indexOfFirstAnnouncement,
    indexOfLastAnnouncement,
  );

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(announcements.length / announcementsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map((number) => {
    if (number !== currentPage) {
      return (
        <PageNumber key={number} value={number} onClick={handlePageClick}>
          {number}
        </PageNumber>
      );
    } else {
      return (
        <SelectedPageNumber key={number} id={number.toString()}>
          {number}
        </SelectedPageNumber>
      );
    }
  });

  return (
    <>
      {noAnnouncements ? (
        noAnnouncementsTexts
      ) : (
        <>
          <AnnouncementsListWrapper>
            {currentAnnouncements.map((announcement) => {
              return <AnnouncementCard {...announcement} />;
            })}
          </AnnouncementsListWrapper>

          {announcements.length > 6 ? (
            <PageNumbersWrapper>
              <ArrowButton
                key='prev'
                onClick={
                  currentPage === 1 ? handleNoOnClick : handlePreviousPage
                }
              >
                {'<'}
              </ArrowButton>
              {renderPageNumbers}
              <ArrowButton
                key='next'
                onClick={
                  currentPage === pageNumbers[pageNumbers.length - 1]
                    ? handleNoOnClick
                    : handleNextPage
                }
              >
                {'>'}
              </ArrowButton>
            </PageNumbersWrapper>
          ) : null}
        </>
      )}
    </>
  );
};

export default AnnouncementsList;
