import { Footer } from '../../components/Footer';
import { FooterBottom } from '../../components/FototerBottom';
import { Header } from '../../components/Header';
import { Container } from './styles';
import Modal from 'react-modal';
import IUser, { IUpdateUser, UserProfile } from '../../interfaces/IUser';
import { ReactEventHandler, useEffect, useState } from 'react';
import requests from '../../services/requests';
import formatDate from '../../utils/formatDate';
import { InputEvent } from '../../types/InputEvent';

export function Profile() {
  const [userData, setUserData] = useState<IUser>();
  const [phoneModalIsOpen, setPhoneModalIsOpen] = useState(false);
  const [formData, setFormData] = useState<IUpdateUser>({
    user: {},
    profile: {},
  });
  const [phoneCode, setPhoneCode] = useState('');

  function openModal() {
    setPhoneModalIsOpen(true);
  }

  function closeModal() {
    setPhoneModalIsOpen(false);
  }

  const handleChange = (e: InputEvent) => {
    const userProperties = ['username', 'email', 'birthdate'];
    if (userProperties.some((property) => property === e.target.name)) {
      setFormData({
        ...formData,
        user: {
          ...formData.user,
          [e.target.name]: e.target.value,
        },
      });
    } else {
      setFormData({
        ...formData,
        profile: {
          ...formData.profile,
          [e.target.name]: e.target.value,
        },
      });
    }
  };

  const getUserData = async () => {
    try {
      const data = await requests.get.auth.userInformations();
      setUserData(data);

      const toSkipCountryCode = 2;

      setFormData({
        user: {
          birthdate: formatDate(data.birthdate),
          email: data.email,
          username: data.username,
        },
        profile: {
          phoneNumber: data.profile.phoneNumber
            ? data.profile.phoneNumber.slice(toSkipCountryCode)
            : '',
          name: data.profile.fullName ?? '',
          cpf: data.profile.cpf ?? '',
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const formatProfileInformations = (data: UserProfile) => {
    let profile: UserProfile = {};

    if (data.cpf) {
      profile = { ...profile, cpf: data.cpf?.replace(/\D/g, '') };
    }

    if (data.phoneNumber) {
      profile = {
        ...profile,
        phoneNumber: `55${formData.profile.phoneNumber?.replace(/\D/g, '')}`,
      };
    }

    if (data.name) profile = { ...profile, name: formData.profile.name };

    return profile;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const profileData = formatProfileInformations(formData.profile);

    try {
      await requests.put.users.editUser(formData);

      await requests.put.users.editProfile({
        ...formData,
        profile: profileData,
      });

      await getUserData();
    } catch (error) {
      console.error(error);
    }
  };

  const phoneMask = (value: string | undefined) => {
    if (!value) return '';
    value = value.replace(/\D/g, '');
    value = value.replace(/(\d{2})(\d)/, '($1) $2');
    value = value.replace(/(\d)(\d{4})$/, '$1-$2');
    return value;
  };

  const sendPhoneSMS = async () => {
    if (!userData) return;
    const phoneNumber = userData.profile.phoneNumber;
    if (phoneNumber) await requests.post.auth.sendSMS(phoneNumber);
  };

  const validatePhone = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!userData) throw new Error('User not found');
      await requests.post.auth.phoneAuthentication({
        phoneNumber: userData.profile.phoneNumber as string,
        code: phoneCode,
      });
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Container>
      <Header />

      <Modal
        isOpen={phoneModalIsOpen}
        onRequestClose={closeModal}
        overlayClassName='react-modal-overlay'
        className='react-modal-content'
      >
        <form className='depositModal' onSubmit={validatePhone}>
          <input
            id='phone-code'
            type='text'
            placeholder='Código SMS'
            maxLength={6}
            value={phoneCode}
            onChange={(e: InputEvent) => setPhoneCode(e.target.value)}
          />
          <button type='submit'>Enviar</button>
        </form>
      </Modal>

      <section>
        <form onSubmit={handleSubmit}>
          <p>Informações pessoais</p>

          <div>
            <input
              name='username'
              type='text'
              placeholder='Nome de usuário'
              value={formData.user.username}
              onChange={handleChange}
            />
            <input
              name='email'
              type='email'
              placeholder='E-mail'
              value={formData.user.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <input
              name='name'
              type='text'
              value={formData.profile.name}
              placeholder='Nome'
              onChange={handleChange}
            />
            <input
              name='cpf'
              type='text'
              value={formData.profile.cpf}
              placeholder='CPF'
              onChange={handleChange}
            />
          </div>

          <div>
            <input
              name='birthdate'
              type='text'
              placeholder='Data de nascimento'
              value={formData.user.birthdate}
              onChange={handleChange}
            />
            <input
              name='phoneNumber'
              type='text'
              maxLength={15}
              value={phoneMask(formData.profile.phoneNumber)}
              onChange={handleChange}
              style={{ width: '100%' }}
              placeholder={'(xx) xxxxx-xxxx'}
            />
          </div>

          <div>
            <button style={{ fontSize: '18px' }}>Salvar</button>
            <button
              disabled={
                !!!userData?.profile.phoneNumber ||
                userData?.profile.validPhoneNumber
              }
              onClick={async () => {
                await sendPhoneSMS();
                openModal();
              }}
              style={{ fontSize: '18px' }}
            >
              Validar telefone
            </button>
          </div>
        </form>
      </section>

      <Footer />
      <FooterBottom />
    </Container>
  );
}
