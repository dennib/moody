import { IDBDate } from 'types/firebase';

export const convertDBDate = (dbDate: IDBDate): Date =>
  new Date(dbDate.seconds * 1000);
