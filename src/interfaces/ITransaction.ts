type TransactionType = 'deposito' | 'saque';

export interface INewTransaction {
  type: TransactionType;
  paymentMethod: string;
  userId: string;
  amount: number;
}

export type TransactionFilters = {
  type?: TransactionType;
  from?: string;
  to?: string;
};

export default interface ITransaction {
  id: string;
  transactionType: TransactionType;
  paymentMethod: string;
  amount: number;
  createdAt: string;
  user: {
    id: string;
    username: string;
    email: string;
    accountBalance: number;
  };
}
