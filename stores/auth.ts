import { signInWithEmailAndPassword } from 'firebase/auth';
import { useCallback } from 'react';
import { AsyncStorage } from 'react-native';
import { IAuthStore, IAuthStoreDefaultValues } from 'types/store';
import create from 'zustand';

import { subscribeWithSelector, persist } from 'zustand/middleware';
import { auth } from '../firebase';

const AUTH_STORE_STORAGE_KEY = 'moody-auth';

const DEFAULT_VALUES: IAuthStoreDefaultValues = {
  isAuthenticated: false,
  user: null,
};

const resetDefaults = () => useStore.setState({ ...DEFAULT_VALUES });

const handleLogin = async (email: string, password: string) => {
  try {
    const { user } = await signInWithEmailAndPassword(
      auth,
      email.trim(),
      password.trim()
    );
    useStore.setState({ user });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const handleLogout = async () => {
  try {
    await auth.signOut();
    resetDefaults();
  } catch (err) {
    console.log(err);
  }
};

const useStore = create(
  subscribeWithSelector(
    persist(
      (): IAuthStore => ({
        ...DEFAULT_VALUES,
        handleLogin,
        handleLogout,
      }),
      {
        getStorage: () => AsyncStorage,
        name: AUTH_STORE_STORAGE_KEY,
      }
    )
  )
);

useStore.subscribe(
  state => state.user,
  user => useStore.setState({ isAuthenticated: !!user })
);

const useAuthSelector = () => useStore(useCallback(state => state, []));

export { useAuthSelector, useStore as useAuthStore };
