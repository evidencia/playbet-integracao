import { Container, Content } from './styles';
import { Envelope} from 'phosphor-react';
import { Link } from 'react-router-dom';


export function ForgotPassword() {
  return (
    <Container>
      <Content>
        <span className="avatar">
          <Envelope />
        </span>

        <h3>Recuperar sua senha?</h3>

        <form>
          <div className='field-group'>
            <input type="email" placeholder="E-mail" required/>
          </div>

          <div className="link">
            <Link to="#"></Link>
            <Link to="/signin">Já tenho conta? Login!</Link>
          </div>

          <div className='btn'>
            <button>Reset password</button>
          </div>
        </form>
      </Content>
    </Container>
  );
}
