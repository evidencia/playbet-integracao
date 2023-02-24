import ILogin from './ILogin';

export default interface IRegister extends ILogin {
  username: string;
  birthdate: string;
}
