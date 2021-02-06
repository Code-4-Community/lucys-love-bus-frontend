import { Row } from 'antd';
import React from 'react';
import { AnnouncementCard } from '../AnnouncementCard';
import styled from 'styled-components';
import axios, { AxiosInstance } from 'axios';

const COLUMNS_PER_ROW = 3
const NO_ANNOUNCEMENTS_MESSAGE = "There are currently no announcements!"
const ANNOUNCEMENTS = '/api/v1/announcements/'
const AuthAxiosInstance: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_DOMAIN,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});
    
const AnnouncementRow = styled(Row)`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    margin-bottom: 20px;
`

export const AnnouncementsList: React.FC = () => {
    const [announcements, setAnnouncements] = React.useState<Array<any>>([]);

    React.useEffect(() => {
        (async function () {
            let announcementsData = await AuthAxiosInstance.get(ANNOUNCEMENTS)
                .then(response => response.data)
                .then(data => { return data.announcements as any[] })
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
                rows.length > 1 ? (
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
