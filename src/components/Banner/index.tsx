import { ArrowRight } from 'phosphor-react';
import logo from '../../assets/logo.png'
import { Container } from './styles';
import { useNavigate } from 'react-router-dom';

export function Banner(){
  const navigate = useNavigate();

  return (
    <Container>
      <img src={logo} alt="logo" />
        <main>
          <h1>BEST ONLINE GAMING <span> CLUB FOR ALL TIME</span></h1>

          <div>
            <button onClick={() => navigate('/signin')}>
              Entrar
              <ArrowRight size={18} weight="bold" />
            </button>

            <button onClick={() => navigate('/signup')}>
              Criar conta
              <ArrowRight size={18} weight="bold" />
            </button>
          </div>
        </main>
    </Container>
  );
}