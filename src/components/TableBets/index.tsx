import { Container } from './styles';


export function TableBets() {
  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Nome do jogo</th>
            <th>Estado</th>
            <th>Saldo</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>10-02-2023</td>
            <td>Penalti</td>
            <td className='gain'>Ganho</td>
            <td>4,00 <span>R$</span></td>
          </tr>

          <tr>
            <td>10-02-2023</td>
            <td>Jogo da Velha</td>
            <td className='gain'>Ganho</td>
            <td>2,00 <span>R$</span></td>
          </tr>

          <tr>
            <td>10-02-2023</td>
            <td>Penalti</td>
            <td className='lost'>Perdido</td>
            <td>3,00 <span>R$</span></td>
          </tr>

          <tr>
            <td>10-02-2023</td>
            <td>Jogo da Velha</td>
            <td className='gain'>Ganho</td>
            <td>2,00 <span>R$</span></td>
          </tr>
        </tbody>
      </table>
    </Container>
  )
}
