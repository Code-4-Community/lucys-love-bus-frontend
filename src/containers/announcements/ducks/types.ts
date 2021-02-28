import { AsyncRequest } from '../../../utils/asyncRequest';
import { C4CState } from '../../../store';
import { ThunkAction } from 'redux-thunk';
import { AnnouncementsActions } from './actions';
import { ApiExtraArgs } from '../../../api/publicApiClient';

export interface AnnouncementsReducerState {
    readonly announcements: AsyncRequest<AnnouncementProps[], any>;
}

export type AnnouncementsThunkAction<R> = ThunkAction<
    R,
    C4CState,
    ApiExtraArgs,
    AnnouncementsActions
>;

export interface AnnouncementProps {
    imageSrc?: string;
    title: string;
    created: Date;
    description: string;
}
