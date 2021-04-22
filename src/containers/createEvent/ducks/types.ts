export interface NewEventInformation {
  title: string;
  capacity: number;
  thumbnail?: string;
  price: number;
  details: {
    description: string;
    location: string;
    start: Date;
    end: Date;
  };
}
