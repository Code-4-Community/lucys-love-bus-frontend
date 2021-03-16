import { getAnnouncementRows } from '../ducks/selectors';
import { Announcement } from '../ducks/types';

const COLUMNS_PER_ROW = 3;
const a1: Announcement = {
    title: "title 1",
    created: new Date("2021-03-08 17:30:30 +0000"),
    description: "description1",
    imageSrc: "https://facts.net/wp-content/uploads/2020/07/monarch-butterfly-facts.jpg"
};
const a2: Announcement = {
    title: "title 1",
    created: new Date("2021-03-08 17:30:30 +0000"),
    description: "description1",
    imageSrc: "https://facts.net/wp-content/uploads/2020/07/monarch-butterfly-facts.jpg"
};
const a3: Announcement = {
    title: "title 1",
    created: new Date("2021-03-08 17:30:30 +0000"),
    description: "description1",
    imageSrc: "https://facts.net/wp-content/uploads/2020/07/monarch-butterfly-facts.jpg"
};
const a4: Announcement = {
    title: "title 1",
    created: new Date("2021-03-08 17:30:30 +0000"),
    description: "description1",
    imageSrc: "https://facts.net/wp-content/uploads/2020/07/monarch-butterfly-facts.jpg"
};
const a5: Announcement = {
    title: "title 1",
    created: new Date("2021-03-08 17:30:30 +0000"),
    description: "description1",
    imageSrc: "https://facts.net/wp-content/uploads/2020/07/monarch-butterfly-facts.jpg"
};

describe('Announcements Selectors', () => {
    describe('getAnnouncementRows', () => {
        it('returns an array of 2 rows, where the first row has 3 announcements and the second row has 2', () => {
            const announcements: Announcement[] = [a1, a2, a3, a4, a5]
            const numRows: number = Math.ceil(announcements.length / COLUMNS_PER_ROW); // Math.ceil(5 / 3) = 2

            expect(getAnnouncementRows(numRows, announcements)).toHaveLength(2);
            expect(getAnnouncementRows(numRows, announcements)).toEqual([ [a1, a2, a3], [a4, a5] ]);
        });

        it('returns an array of 1 row, where the one row has both announcements', () => {
            const announcements: Announcement[] = [a1, a2]
            const numRows: number = Math.ceil(announcements.length / COLUMNS_PER_ROW); // Math.ceil(2 / 3) = 1

            expect(getAnnouncementRows(numRows, announcements)).toHaveLength(1);
            expect(getAnnouncementRows(numRows, announcements)).toEqual([ [a1, a2] ]);
        });

        it('returns an empty array because there are no announcements', () => {
            const announcements: Announcement[] = []
            const numRows: number = Math.ceil(announcements.length / COLUMNS_PER_ROW); // Math.ceil(0 / 3) = 0

            expect(getAnnouncementRows(numRows, announcements)).toHaveLength(0);
            expect(getAnnouncementRows(numRows, announcements)).toEqual([]);
        });
    });
});
