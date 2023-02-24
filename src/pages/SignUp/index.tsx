import { Link, useNavigate } from 'react-router-dom';
import { Container, Content } from './styles';
import {
  AppleLogo,
  FacebookLogo,
  GoogleLogo,
  InstagramLogo,
  User,
} from 'phosphor-react';
import IRegister from '../../interfaces/IRegister';
import { useEffect, useState } from 'react';
import formatDate from '../../utils/formatDate';
import requests from '../../services/requests';
import { InputEvent } from '../../types/InputEvent';

export function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<IRegister>({
    birthdate: '',
    email: '',
    password: '',
    username: '',
  });

  const formatDateString = (date: string) => {
    const year = date.split('-')[0];
    const month = date.split('-')[1];
    const day = date.split('-')[2];
    return `${day}/${month}/${year}`;
  };

  const handleChange = (e: InputEvent) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.name === 'birthdate'
          ? formatDateString(e.target.value)
          : e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await requests.post.auth.register(formData);
      navigate('/signin');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Content>
        <span className='avatar'>
          <User />
        </span>

        <h3>Registra-se</h3>

        <form onSubmit={handleSubmit}>
          <div className='field-group'>
            <input
              name='username'
              type='text'
              placeholder='Nome de usuário'
              required
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className='field-group'>
            <input
              name='birthdate'
              type='date'
              placeholder='Data de nascimento'
              data-date-format
              required
              onChange={handleChange}
            />
          </div>

          <div className='field-group'>
            <input
              name='email'
              type='email'
              placeholder='E-mail'
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className='field-group'>
            <input
              name='password'
              type='password'
              placeholder='Senha'
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <label>
            <input type='checkbox' />
            Li e concordo com os termos de uso.
          </label>

          <div className='btn'>
            <button>Cadastra-se</button>
          </div>

          <ul>
            <li>
              <a href=''>
                <FacebookLogo size={25} />
              </a>
            </li>
            <li>
              <a href=''>
                <InstagramLogo size={25} />
              </a>
            </li>
            <li>
              <a href=''>
                <GoogleLogo size={25} />
              </a>
            </li>
            <li>
              <a href=''>
                <AppleLogo size={25} />
              </a>
            </li>
          </ul>

          <div className='link'>
            <Link to='#'></Link>
            <Link to='/signin'>Já tenho conta? Login</Link>
          </div>
        </form>
      </Content>
    </Container>
  );
}
