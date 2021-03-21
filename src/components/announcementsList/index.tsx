import { Row } from 'antd';
import React, { useState, useEffect } from 'react';
import { AnnouncementCard } from '../AnnouncementCard';
import styled from 'styled-components';
import { Announcement } from '../../containers/announcements/ducks/types';
import { getAnnouncementRows } from '../../containers/announcements/ducks/selectors';

const COLUMNS_PER_ROW = 3;
const NO_ANNOUNCEMENTS_HEADER = 'There are currently no announcements!';
const NO_ANNOUNCEMENTS_SUBHEADER = 'Come back later for future updates!';
const NO_ANNOUNCEMENTS_HEADER_COLOR = '#ce4a00';

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
  color: ${NO_ANNOUNCEMENTS_HEADER_COLOR};
  font-size: 36px;
  font-weight: 800;
`;

export interface AnnouncementsListProps {
  announcements: Announcement[];
}

const AnnouncementsList: React.FC<AnnouncementsListProps> = ({
  announcements,
}) => {
  const [numRows, setNumRows] = useState(0);

  useEffect(() => {
    const rows = Math.ceil(announcements.length / COLUMNS_PER_ROW);
    setNumRows(rows);
  }, [announcements]);

  return (
    <>
      {numRows ? (
        getAnnouncementRows(numRows, announcements).map((row, i) => {
          return (
            <AnnouncementRow key={i}>
              {row.map((announcement, j) => (
                <AnnouncementCard key={j} {...announcement} />
              ))}
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
    </>
  );
};

export default AnnouncementsList;
