import requests from '../services/requests';
import { saveUserInStorage } from './localStorage';

export default async function setUserData() {
  try {
    const user = await requests.get.auth.userInformations();

    const userInformations = {
      id: user.id,
      username: user.username,
      email: user.email,
      accountBalance: user.account.balance,
      isPhoneNumberValid: user.profile.validPhoneNumber,
    };

    saveUserInStorage(userInformations);
  } catch (error) {
    console.error(error);
  }
}
