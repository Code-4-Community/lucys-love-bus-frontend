import { Row } from 'antd';
import React from 'react';
import { AnnouncementCard } from '../AnnouncementCard';
import styled from 'styled-components';
import { AppAxiosInstance } from '../../auth/axios'

const COLUMNS_PER_ROW = 3
const NO_ANNOUNCEMENTS_MESSAGE = "There are currently no announcements!"
const ANNOUNCEMENTS = '/api/v1/announcements/'
    
const AnnouncementRow = styled(Row)`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    margin-bottom: 20px;
`

export interface AnnouncementsListProps {
    limit?: number
}

export const AnnouncementsList: React.FC<AnnouncementsListProps> = props => {
    const [announcements, setAnnouncements] = React.useState<Array<any>>([]);

    React.useEffect(() => {
        (async function () {
            let announcementsData = await AppAxiosInstance.get(ANNOUNCEMENTS)
                .then(response => response.data)
                .then(data => { return data.announcements as any[] })
                .then(announcements => { return (props.limit && props.limit >= 0) ? announcements.slice(0, props.limit) : announcements })
                .catch(() => { return [] as any[] });
            setAnnouncements(announcementsData);
        })()
    }, []);

    let numRows = Math.ceil(announcements.length / COLUMNS_PER_ROW);
    let rows = [...Array(numRows)];
    let announcementRows = rows.map((row, i) => announcements.slice(i * COLUMNS_PER_ROW, i * COLUMNS_PER_ROW + COLUMNS_PER_ROW));
    return (
        <div>
            {
                rows.length > 0 ? (
                    announcementRows.map((row, i) => {
                        return (
                            <AnnouncementRow>
                                {row.map((announcement, i) => {
                                    return (
                                        announcement.src ? <AnnouncementCard {...{ src: announcement.src, title: announcement.title, date: new Date(announcement.created), description: announcement.description }} key={i} />
                                            : <AnnouncementCard {...{ title: announcement.title, date: new Date(announcement.created), description: announcement.description }} key={i} />
                                    )
                                })}
                            </AnnouncementRow>
                        )
                    })
                ) : NO_ANNOUNCEMENTS_MESSAGE
            }
        </div>
    );
};
