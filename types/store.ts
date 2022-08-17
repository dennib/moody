import { User } from 'firebase/auth';

export interface IAuthStoreDefaultValues {
  isAuthenticated: boolean;
  user: User | null;
}

export interface IAuthStore extends IAuthStoreDefaultValues {
  handleLogin: (email: string, password: string) => Promise<void>;
  handleSignUp: (
    displayName: string,
    email: string,
    password: string
  ) => Promise<void>;
  handleLogout: () => Promise<void>;
}
