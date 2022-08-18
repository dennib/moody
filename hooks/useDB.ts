import { endOfToday, startOfToday } from 'date-fns';
import { db } from 'firebase';
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  addDoc,
  QueryDocumentSnapshot,
  DocumentData,
} from 'firebase/firestore';
import { useAuthSelector } from 'stores/auth';
import { IMood, Moods } from 'types/mood';

const useDB = () => {
  const { user } = useAuthSelector();
  const moodsRef = collection(db, 'moods');
  const todayStart = startOfToday();
  const todayEnd = endOfToday();

  const getTodayMood = async (): Promise<IMood | undefined> => {
    if (!user) return;
    const q = query(
      moodsRef,
      where('userId', '==', user?.uid),
      where('date', '>=', todayStart),
      where('date', '<=', todayEnd)
    );
    try {
      const moods: IMood[] = [];
      const moodDocs = await getDocs(q);

      moodDocs.forEach(moodDoc => moods.push(moodDoc.data() as IMood));
      return moods[0] || null;
    } catch (err) {
      console.log(err);
    }
  };

  const saveMood = async (
    currentMood: Moods,
    message: string
  ): Promise<void> => {
    if (!user) return;
    const q = query(
      moodsRef,
      where('userId', '==', user?.uid),
      where('date', '>=', todayStart),
      where('date', '<=', todayEnd)
    );
    const nextMood: IMood = {
      userId: user.uid,
      date: new Date(),
      value: currentMood,
      message,
    };
    try {
      const moods: QueryDocumentSnapshot<DocumentData>[] = [];
      const moodDocs = await getDocs(q);
      moodDocs.forEach(moodDoc => moods.push(moodDoc));

      if (moods.length) await setDoc(doc(db, 'moods', moods[0].id), nextMood);
      else await addDoc(collection(db, 'moods'), nextMood);
    } catch (err) {
      console.log(err);
    }
  };

  return { getTodayMood, saveMood };
};

export { useDB };
