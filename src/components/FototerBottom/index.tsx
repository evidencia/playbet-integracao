import { InstagramLogo } from 'phosphor-react';
import logo from '../../assets/logo.png'
import age from '../../assets/maior.png'

import { Container } from './styles';

export function FooterBottom(){
  return (
    <Container>
      <footer>
        <ul>
          <li>
            <a href=""><InstagramLogo size={32} /></a>
          </li>
        </ul>
      </footer>
    </Container>
  );
}