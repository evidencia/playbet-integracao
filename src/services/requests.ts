import ILogin from '../interfaces/ILogin';
import IPhoneAuthentication from '../interfaces/IPhoneAuthentication';
import IRegister from '../interfaces/IRegister';
import {
  INewTransaction,
  TransactionFilters,
} from '../interfaces/ITransaction';
import IUser, { IUpdateUser } from '../interfaces/IUser';
import { api, ticTacToeApi } from '../lib/axios';

export const setTokenHeaders = (token: string) => {
  api.defaults.headers.common.Authorization = token;
};

const requests = {
  post: {
    auth: {
      register: async (body: IRegister) => {
        const { data } = await api.post('/auth/register', body);
        return data;
      },
      login: async (body: ILogin) => {
        const { data } = await api.post('/auth/login', body);
        return data;
      },
      sendSMS: async (phoneNumber: string) => {
        const { data } = await api.post('/auth/send-sms', { phoneNumber });
        return data;
      },
      phoneAuthentication: async (body: IPhoneAuthentication) => {
        const { data } = await api.post('/auth/phone', body);
        return data;
      },
    },
    transactions: {
      create: async (body: INewTransaction) => {
        const { data } = await api.post('/transactions/new', body);
        return data;
      },
    },
    emojis: {
      addToUser: async (body: { userId: string; emojiId: number }) => {
        await ticTacToeApi.post('/user/add-emoji', body);
      },
    },
  },
  get: {
    auth: {
      userInformations: async (): Promise<IUser> => {
        const { data } = await api.get('/auth/me');
        return data;
      },
    },
    transactions: {
      fromUser: async (userId: string, filters?: TransactionFilters) => {
        const { data } = await api.get(`/transactions/user/${userId}`, {
          params: filters,
        });
        return data;
      },
    },
    emojis: {
      userEmojis: async (userId: string) => {
        const { data } = await ticTacToeApi.get(`/user/${userId}/emojis`);
        return data;
      },
    },
  },
  put: {
    users: {
      editUser: async (body: IUpdateUser) => {
        const { data } = await api.put('/users/edit', body.user);
        return data;
      },
      editProfile: async (body: IUpdateUser) => {
        const { data } = await api.put('/users/edit-profile', body.profile);
        return data;
      },
    },
  },
};

export default requests;
