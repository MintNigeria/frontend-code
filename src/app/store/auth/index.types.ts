import { userType } from 'src/app/types/index.types';

export interface ILogin {
  email: string;
  password: string;
}

export interface IChangePassword {
  currentPassword: string;
  confirmPassword: string;
  newPassword: string;
}

export interface ICreatePassword {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IUser {
  firstName: string | null | undefined;
  lastName: string | null | undefined;
  role: string | null | undefined;
  userType: userType | null | undefined;
  email: string | null | undefined;
  phoneNumber?: string | null | undefined;
  name?: string | null;
  institutionProfile: string[] | undefined;
  permission?: string[] | undefined;
}

export interface IResetPassword {
  token: string;
  newPassword: string;
}

export interface IAuthStateInterface {
  isAuthenticated?: boolean;
  user?: {
    firstName: string | null;
    lastName: string | null;
    role?: string | null;
    lastLogin: string | null;
    id?: string | null;
    email: string | null;
  };
  message?: string | null;

  permissions?: string | null;

  basicProfile?: IUser | null;
}
