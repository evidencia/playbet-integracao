import { InstagramLogo } from 'phosphor-react';
import logo from '../../assets/logo.png'
import age from '../../assets/maior.png'

import { Container } from './styles';
import { Link } from 'react-router-dom';

export function Footer(){
  return (
    <Container>

      <main>
        <div>
          <img src={logo} alt="logo" />
          <p>Todos os direitos reservados</p>
        </div>

        <img src={age} alt="maior de 18 anos" />

        <ul>
          <li><Link to="">Sobre</Link></li>
          <li><a href="">Regras</a></li>
          <li><a href="">Termos de uso</a></li>
        </ul>
      </main>
    </Container>
  );
}