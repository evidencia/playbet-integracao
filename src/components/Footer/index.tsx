import { InstagramLogo } from 'phosphor-react';
import logo from '../../assets/logo.png'
import age from '../../assets/maior.png'

import { Container } from './styles';

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
          <li><a href="">Sobre</a></li>
          <li><a href="">Regras</a></li>
          <li><a href="">Termos de uso</a></li>
        </ul>
      </main>
    </Container>
  );
}