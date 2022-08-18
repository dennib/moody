export enum Moods {
  BAD = -1,
  AVERAGE = 0,
  GREATE = 1,
}

export interface IMood {
  date: Date;
  value: Moods;
  userId: string;
}
