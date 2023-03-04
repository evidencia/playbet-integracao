import { IUserInStorage } from '../interfaces/IUser';

export function getUserInStorage(): IUserInStorage | void {
  const userInStorage = localStorage.getItem('playbet:user');
  if (userInStorage) return JSON.parse(userInStorage);
}

export function saveUserInStorage(userData: IUserInStorage) {
  localStorage.setItem('playbet:user', JSON.stringify(userData));
}
