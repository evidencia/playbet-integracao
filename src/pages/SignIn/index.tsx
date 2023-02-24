import { Container, Content } from './styles';
import { User, Lock, Envelope } from 'phosphor-react';
import { Link, useNavigate } from 'react-router-dom';
import requests, { setTokenHeaders } from '../../services/requests';
import { useState } from 'react';
import setUserData from '../../utils/setUserData';
import { InputEvent } from '../../types/InputEvent';

export function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: InputEvent) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { token } = await requests.post.auth.login(formData);
      setTokenHeaders(token);
      await setUserData();
      navigate('/home');
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

        <h3>Seja bem vindo</h3>

        <form onSubmit={handleSubmit}>
          <div className='field-group'>
            <input
              name='email'
              type='email'
              placeholder='E-mail'
              required
              onChange={handleChange}
            />
          </div>

          <div className='field-group'>
            <input
              name='password'
              type='password'
              placeholder='Senha'
              required
              onChange={handleChange}
            />
          </div>

          <div className='link'>
            <Link to='/recover'>Esqueceu a senha?</Link>
            <Link to='/signup'>Ainda não tenho conta!</Link>
          </div>

          <div className='btn'>
            <button type='submit'>Acessar</button>
          </div>
        </form>
      </Content>
    </Container>
  );
}
