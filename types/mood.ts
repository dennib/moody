export enum Moods {
  BAD = -1,
  AVERAGE = 0,
  GREAT = 1,
}

export interface IMood {
  date: Date;
  value: Moods;
  userId: string;
}
