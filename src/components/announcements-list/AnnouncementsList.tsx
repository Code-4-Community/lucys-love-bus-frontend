import { Row } from 'antd';
import React, { useState, useEffect } from 'react';
import { AnnouncementCard } from '../AnnouncementCard';
import styled from 'styled-components';
import { AnnouncementProps } from '../../containers/announcements/ducks/types';

const COLUMNS_PER_ROW = 3
const NO_ANNOUNCEMENTS_HEADER = "There are currently no announcements!"
const NO_ANNOUNCEMENTS_SUBHEADER = "Come back later for future updates!"

const AnnouncementRow = styled(Row)`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    margin-bottom: 20px;
`
const NoAnnouncementsSubText = styled.span`
    display: block;
    text-align: center;
`

const NoAnnouncementsText = styled(NoAnnouncementsSubText)`
    color: #ce4a00;
    font-size: 36px;
    font-weight: 800;
`

export interface AnnouncementsListProps {
    announcements: AnnouncementProps[]
}

const AnnouncementsList: React.FC<AnnouncementsListProps> = props => {
    const [numRows, setNumRows] = useState(0);

    useEffect(() => {
        let rows = Math.ceil(props.announcements.length / COLUMNS_PER_ROW);
        setNumRows(rows);
    }, [props.announcements])

    const getAnnouncementRows = () =>
        [...Array(numRows)].map((row, i) => props.announcements.slice(i * COLUMNS_PER_ROW, i * COLUMNS_PER_ROW + COLUMNS_PER_ROW));

    return (
        <>
            {
                numRows ? (
                    getAnnouncementRows().map((row, i) => {
                        return (
                            <AnnouncementRow>
                                {row.map((announcement, i) => {
                                    return (
                                        <AnnouncementCard {...announcement} />
                                    )
                                })}
                            </AnnouncementRow>
                        )
                    })
                ) : <div>
                        <NoAnnouncementsText>{NO_ANNOUNCEMENTS_HEADER}</NoAnnouncementsText>
                        <NoAnnouncementsSubText>{NO_ANNOUNCEMENTS_SUBHEADER}</NoAnnouncementsSubText>
                    </div>
            }
        </>
    );
};

export default AnnouncementsList;
