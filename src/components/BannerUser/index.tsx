import { Container } from './styles';
import logo from '../../assets/img-banner.png'

export function BannerUser(){
  return (
    <Container>

        <div>
          <h1>FAÇA A SUA APOSTA COM <span>PLAY-BET 1X1</span> </h1>
        </div>

        <img src={logo} alt="logo" />
        
    </Container>
  );
}