import { Row } from 'antd';
import React, { useEffect } from 'react';
import { AnnouncementCard } from '../AnnouncementCard';
import styled from 'styled-components';
import { getAnnouncements } from '../../containers/announcements/ducks/thunks';
import { asyncRequestIsComplete } from '../../utils/asyncRequest';
import { connect, useDispatch } from 'react-redux';
import { AnnouncementProps, AnnouncementsReducerState } from '../../containers/announcements/ducks/types';
import { C4CState } from '../../store';

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

interface AnnouncementsProps {
    readonly announcements: AnnouncementsReducerState['announcements'];
}

export interface AnnouncementsListProps extends AnnouncementsProps {
    limit?: number
}

const AnnouncementsList: React.FC<AnnouncementsListProps> = props => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAnnouncements(props.limit));
    }, [dispatch]);

    const getNumRows = (announcements: AnnouncementProps[]): number =>
        Math.ceil(announcements.length / COLUMNS_PER_ROW);

    const getAnnouncementRows = (numRows: number, announcements: AnnouncementProps[]) =>
        [...Array(numRows)].map((row, i) => announcements.slice(i * COLUMNS_PER_ROW, i * COLUMNS_PER_ROW + COLUMNS_PER_ROW));

    return (
        <>
            { asyncRequestIsComplete(props.announcements) &&
                <div>
                    {
                        getNumRows(props.announcements.result) > 0 ? (
                            getAnnouncementRows(getNumRows(props.announcements.result), props.announcements.result).map((row, i) => {
                                return (
                                    <AnnouncementRow>
                                        {row.map((announcement, i) => {
                                            return (
                                                announcement.imageSrc ?
                                                    <AnnouncementCard
                                                        {...{
                                                            imageSrc: announcement.imageSrc,
                                                            title: announcement.title,
                                                            created: announcement.created,
                                                            description: announcement.description
                                                        }}
                                                        key={i}
                                                    />
                                                    :
                                                    <AnnouncementCard
                                                        {...{
                                                            title: announcement.title,
                                                            created: announcement.created,
                                                            description: announcement.description
                                                        }}
                                                        key={i}
                                                    />
                                            )
                                        })}
                                    </AnnouncementRow>
                                )
                            })
                        ) : (
                                <div>
                                    <NoAnnouncementsText>{NO_ANNOUNCEMENTS_HEADER}</NoAnnouncementsText>
                                    <NoAnnouncementsSubText>{NO_ANNOUNCEMENTS_SUBHEADER}</NoAnnouncementsSubText>
                                </div>
                            )
                    }
                </div>
            }
        </>
    );
};

const mapStateToProps = (state: C4CState): AnnouncementsProps => {
    return {
        announcements: state.announcementsState.announcements,
    };
};

export default connect(mapStateToProps)(AnnouncementsList);
