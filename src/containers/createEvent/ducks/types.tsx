export interface NewEventInformation {
    title: string;
    spotsAvailable: number;
    capacity: number;
    thumbnail?: string;
    details: {
      description: string;
      location: string;
      start: Date;
      end: Date;
    };
  }
  