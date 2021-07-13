import { range } from 'lodash';
import { default as React, useState } from 'react';
import styled from 'styled-components';
import { Announcement } from '../../containers/announcements/ducks/types';
import { LIGHT_GREY, LINK } from '../../utils/colors';
import {
  NO_ANNOUNCEMENTS_HEADER,
  NO_ANNOUNCEMENTS_SUBHEADER,
} from '../../utils/copy';
import { AnnouncementCard } from '../AnnouncementCard';
import { NoContent } from '../NoContent';

const AnnouncementsListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 40px;
`;

const PageNumbersWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 3em;
`;

const PageNumber = styled.li`
  font-size: 30px;
  list-style-type: none;
  cursor: pointer;
  padding: 0px 16px;
  border: 1px solid ${LIGHT_GREY};
  box-sizing: border-box;
  border-radius: 4px;
  margin: 0px 8px;
`;

const SelectedPageNumber = styled(PageNumber)`
  color: ${LINK};
  border: 1px solid ${LINK};
`;

const ArrowButton = styled(PageNumber)`
  color: ${LIGHT_GREY};
`;

export interface AnnouncementsListProps {
  announcements: Announcement[];
}
const ANNOUNCEMENTS_PER_PAGE = 6;

const AnnouncementsList: React.FC<AnnouncementsListProps> = ({
  announcements,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleNextPage = () => {
    setCurrentPage((page) => page + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((page) => page - 1);
  };

  const handleNoOnClick = () => {
    setCurrentPage((page) => page);
  };

  const handlePageClick = (pageNum: number) => {
    setCurrentPage(() => pageNum);
  };

  const noAnnouncements: boolean = announcements.length === 0;
  const indexOfLastAnnouncement: number = currentPage * ANNOUNCEMENTS_PER_PAGE;
  const indexOfFirstAnnouncement: number =
    indexOfLastAnnouncement - ANNOUNCEMENTS_PER_PAGE;
  const currentAnnouncements: Announcement[] = announcements.slice(
    indexOfFirstAnnouncement,
    indexOfLastAnnouncement,
  );

  const lastPage: number =
    Math.ceil(announcements.length / ANNOUNCEMENTS_PER_PAGE) + 1;

  return (
    <>
      {noAnnouncements ? (
        <NoContent
          header={NO_ANNOUNCEMENTS_HEADER}
          subheader={NO_ANNOUNCEMENTS_SUBHEADER}
        />
      ) : (
        <>
          <AnnouncementsListWrapper>
            {currentAnnouncements.map((announcement, i) => {
              return <AnnouncementCard {...announcement} key={i} />;
            })}
          </AnnouncementsListWrapper>

          {announcements.length > ANNOUNCEMENTS_PER_PAGE ? (
            <PageNumbersWrapper>
              <ArrowButton
                key="prev"
                onClick={
                  currentPage === 1 ? handleNoOnClick : handlePreviousPage
                }
              >
                {'<'}
              </ArrowButton>
              {range(1, lastPage).map((num: number) =>
                num !== currentPage ? (
                  <PageNumber
                    key={num}
                    value={num}
                    onClick={() => handlePageClick(num)}
                  >
                    {num}
                  </PageNumber>
                ) : (
                  <SelectedPageNumber key={num} value={num}>
                    {num}
                  </SelectedPageNumber>
                ),
              )}
              <ArrowButton
                key="next"
                onClick={
                  currentPage === lastPage - 1
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
