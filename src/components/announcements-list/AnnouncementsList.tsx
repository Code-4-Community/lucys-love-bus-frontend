import { Row } from 'antd';
import React from 'react';
import { AnnouncementCard } from '../AnnouncementCard';
import { AnnouncementCardProps } from '../AnnouncementCard';
import styled from 'styled-components';
import axios, { AxiosInstance } from 'axios';

const COLUMNS_PER_ROW = 3
const ANNOUNCEMENTS = '/api/v1/announcements/'
const AuthAxiosInstance: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_DOMAIN,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});
const getAllAnnouncements: () => void = () => {
    AuthAxiosInstance.get(ANNOUNCEMENTS).then(
        (response) => console.log(response.data)
    );
}
    
const AnnouncementRow = styled(Row)`
    display: grid;
    grid-auto-flow: column;
    margin-bottom: 20px;
`

export const AnnouncementsList: React.FC = () => {
    getAllAnnouncements();
    // mock data to use for now
    const announcement1: AnnouncementCardProps = {
        title: 'VIRTUAL Slow Flow Restorative Yoga',
        date: new Date('2020/12/12'),
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ',
        src:
            'https://facts.net/wp-content/uploads/2020/07/monarch-butterfly-facts.jpg',
    };
    const announcement2: AnnouncementCardProps = {
        title: 'VIRTUAL Slow Flow Restorative Yoga',
        date: new Date('2020/11/28'),
        description:
            'Find some time for self-care and join yoga teacher Sarah Oleson for a peaceful and rejuvenating virtual restorative yoga session! Find a comfortable spot and grab a mat and a blanket and/or bolster. Open to all abilities. ',
        src:
            'https://facts.net/wp-content/uploads/2020/07/monarch-butterfly-facts.jpg',
    };
    const announcement3: AnnouncementCardProps = {
        title: 'VIRTUAL Slow Flow Restorative Yoga',
        date: new Date('2020/11/18'),
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborumLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    };
    const announcement4: AnnouncementCardProps = {
        title: 'VIRTUAL Slow Flow Restorative Yoga',
        date: new Date('2020/11/18'),
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborumLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        src:
            'https://facts.net/wp-content/uploads/2020/07/monarch-butterfly-facts.jpg',
    };
    const announcement5: AnnouncementCardProps = {
        title: 'VIRTUAL Slow Flow Restorative Yoga',
        date: new Date('2020/11/18'),
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborumLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    };
    const announcement6: AnnouncementCardProps = {
        title: 'VIRTUAL Slow Flow Restorative Yoga',
        date: new Date('2020/11/28'),
        description:
            'Find some time for self-care and join yoga teacher Sarah Oleson for a peaceful and rejuvenating virtual restorative yoga session! Find a comfortable spot and grab a mat and a blanket and/or bolster. Open to all abilities. ',
        src:
            'https://facts.net/wp-content/uploads/2020/07/monarch-butterfly-facts.jpg',
    };

    const announcements: AnnouncementCardProps[] = [announcement1, announcement2, announcement3, announcement4, announcement5, announcement6];

    let rows = [...Array(Math.ceil(announcements.length / COLUMNS_PER_ROW))];
    let announcementRows = rows.map((row, i) => announcements.slice(i * COLUMNS_PER_ROW, i * COLUMNS_PER_ROW + COLUMNS_PER_ROW));
    return (
        <div className="cards">
            {
                announcementRows.map((row, i) => {
                    return (
                        <AnnouncementRow>
                            {row.map((announcement, i) => {
                                return (
                                    <AnnouncementCard {...announcement} key={i} />
                                )
                            })}
                        </AnnouncementRow>
                    )
                })
            }
        </div>
    );
};
