import { Announcement } from "./types";

const COLUMNS_PER_ROW = 3;

export const getAnnouncementRows = (numRows: number, announcements: Announcement[]): Announcement[][] => {
    return [...Array(numRows)].map((row, i) => {
        return (
            announcements.slice(
                i * COLUMNS_PER_ROW,
                i * COLUMNS_PER_ROW + COLUMNS_PER_ROW,
            )
        )
    });
};
