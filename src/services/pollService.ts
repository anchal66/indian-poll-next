// src/services/pollService.ts
import { firestore } from '../lib/firebase';
import { collection, addDoc, doc, deleteDoc, updateDoc, onSnapshot, query, where, getDocs, getDoc } from 'firebase/firestore';

export const createPoll = (pollData: any) => {
  const pollsCollection = collection(firestore, 'polls');
  return addDoc(pollsCollection, pollData);
};

export const isPollUrlUnique = async (url: string): Promise<boolean> => {
  const pollsCollection = collection(firestore, 'polls');
  const q = query(pollsCollection, where("url", "==", url));
  const querySnapshot = await getDocs(q);
  return querySnapshot.empty;
};

export const getPolls = (observer: any) => {
  const pollsCollection = collection(firestore, 'polls');
  return onSnapshot(pollsCollection, observer);
};

export const deletePoll = (pollId: string) => {
  const pollDoc = doc(firestore, `polls/${pollId}`);
  return deleteDoc(pollDoc);
};

export const votePoll = async (pollId: string, optionIndex: number, userId: string | null) => {
  const pollDocRef = doc(firestore, `polls/${pollId}`);
  const pollDoc = await getDoc(pollDocRef);
  if (pollDoc.exists()) {
    const pollData = pollDoc.data();
    const deviceVotes = JSON.parse(localStorage.getItem(pollId) || '[]');

    if (pollData['requireSignIn']) {
      if (pollData['voters'] && pollData['voters'].includes(userId)) {
        throw new Error('User has already voted');
      } else {
        const voters = pollData['voters'] ? [...pollData['voters'], userId] : [userId];
        const options = pollData['options'];
        options[optionIndex].votes = (options[optionIndex].votes || 0) + 1;
        return updateDoc(pollDocRef, {
          options: options,
          voters: voters
        });
      }
    } else {
      if (userId) {
        if (pollData['voters'] && pollData['voters'].includes(userId)) {
          throw new Error('User has already voted');
        } else {
          const voters = pollData['voters'] ? [...pollData['voters'], userId] : [userId];
          const options = pollData['options'];
          options[optionIndex].votes = (options[optionIndex].votes || 0) + 1;
          localStorage.setItem(pollId, JSON.stringify([...deviceVotes, userId]));
          return updateDoc(pollDocRef, {
            options: options,
            voters: voters
          });
        }
      } else {
        if (deviceVotes.length > 0) {
          throw new Error('Device has already voted');
        } else {
          const options = pollData['options'];
          options[optionIndex].votes = (options[optionIndex].votes || 0) + 1;
          localStorage.setItem(pollId, JSON.stringify([null]));
          return updateDoc(pollDocRef, {
            options: options
          });
        }
      }
    }
  }
};


export const getMyPolls = (uid: string) => {
  const pollsCollection = collection(firestore, 'polls');
  const q = query(pollsCollection, where("creatorUid", "==", uid));
  return getDocs(q);
};

export const getPollByUrl = async (url: string): Promise<any> => {
  const pollsCollection = collection(firestore, 'polls');
  const q = query(pollsCollection, where("url", "==", url));
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    return { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() };
  }
  return undefined;
};
