import { Row } from 'antd';
import React, { useState, useEffect } from 'react';
import { AnnouncementCard } from '../AnnouncementCard';
import styled from 'styled-components';
import { AnnouncementProps } from '../../containers/announcements/ducks/types';

const COLUMNS_PER_ROW = 3;
const NO_ANNOUNCEMENTS_HEADER = 'There are currently no announcements!';
const NO_ANNOUNCEMENTS_SUBHEADER = 'Come back later for future updates!';

const AnnouncementRow = styled(Row)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin-bottom: 20px;
`;
const NoAnnouncementsSubText = styled.span`
  display: block;
  text-align: center;
`;

const NoAnnouncementsText = styled(NoAnnouncementsSubText)`
  color: #ce4a00;
  font-size: 36px;
  font-weight: 800;
`;

const PageNumbersWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const PageNumber = styled.li`
  font-size: 30px;
  list-style-type: none;
  margin: 1rem;
  cursor: pointer;
`;

export interface AnnouncementsListProps {
  announcements: AnnouncementProps[];
}

const AnnouncementsList: React.FC<AnnouncementsListProps> = (props) => {
  const [numRows, setNumRows] = useState(2);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePageClick = (event: any) => {
    setCurrentPage(event.target.id);
  };

  const rowArray = Array(numRows);
  const lastRowOfPage = (numRows * currentPage) - 1;
  const firstRowOfPage = lastRowOfPage - (numRows - 1);

  let index = 0;
  for (let i = firstRowOfPage; i <= lastRowOfPage; i++) {
    rowArray[index] = i;
    index++;
  }

  console.log(props.announcements.slice(
    (1 * COLUMNS_PER_ROW) * currentPage,
    (1 * COLUMNS_PER_ROW + COLUMNS_PER_ROW) * currentPage,
  ));

  const getAnnouncementRows = () =>
    [rowArray].map((row, i) =>
      props.announcements.slice(
        (i * COLUMNS_PER_ROW) * currentPage,
        (i * COLUMNS_PER_ROW + COLUMNS_PER_ROW) * currentPage,
      )
    );



  console.log(getAnnouncementRows())

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(props.announcements.length / (numRows * COLUMNS_PER_ROW)); i++) {
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
      {numRows ? (
        getAnnouncementRows().map(row => {
          return (
            <AnnouncementRow>
                {row.map(announcement => {
                    return <AnnouncementCard {...announcement} />;
                })}
            </AnnouncementRow>
          );
        })
      ) : (
        <div>
          <NoAnnouncementsText>{NO_ANNOUNCEMENTS_HEADER}</NoAnnouncementsText>
          <NoAnnouncementsSubText>
            {NO_ANNOUNCEMENTS_SUBHEADER}
          </NoAnnouncementsSubText>
        </div>
      )}
      <PageNumbersWrapper>
        {renderPageNumbers}
      </PageNumbersWrapper>
    </>
  );
};

export default AnnouncementsList;
