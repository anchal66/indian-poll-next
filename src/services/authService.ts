import { auth } from '../lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

const useAuth = () => {
  const [user, loading, error] = useAuthState(auth);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).catch((error) => {
      console.error(error);
    });
  };

  const logout = () => {
    signOut(auth).catch((error) => {
      console.error(error);
    });
  };

  return { user, loading, error, googleSignIn, logout };
};

export { useAuth };
