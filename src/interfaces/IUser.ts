export type UserProfile = {
  name?: string;
  cpf?: string;
  phoneNumber?: string;
}

export interface IUpdateUser {
  user: {
    username?: string;
    email?: string;
    birthdate?: string;
  };
  profile: UserProfile;
}

export default interface IUser {
  id: string;
  username: string;
  email: string;
  birthdate: string;
  account: {
    id: string;
    balance: number;
  };
  profile: {
    fullName: string | null;
    cpf: string | null;
    phoneNumber: string | null;
    validPhoneNumber: boolean;
  };
  roles: string[];
}
