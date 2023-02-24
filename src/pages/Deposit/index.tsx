import { useEffect, useState } from 'react';
import { Plus } from 'phosphor-react';
import Modal from 'react-modal';
import { Footer } from '../../components/Footer';
import { FooterBottom } from '../../components/FototerBottom';
import { Header } from '../../components/Header';

import { Container } from './styles';
import requests from '../../services/requests';
import formatDate from '../../utils/formatDate';
import ITransaction from '../../interfaces/ITransaction';
import formatToBRL from '../../utils/formatToBRL';
import setUserData from '../../utils/setUserData';
import { InputEvent } from '../../types/InputEvent';

export function Deposit() {
  const [depositModalIsOpen, setDepositModalIsOpen] = useState(false);
  const [isFetching, setFetching] = useState(false);
  const [data, setData] = useState<ITransaction[]>([]);
  const [amount, setAmount] = useState(0);

  function openModal() {
    setDepositModalIsOpen(true);
  }

  function closeModal() {
    setDepositModalIsOpen(false);
  }

  const getTransactions = async () => {
    try {
      setFetching(true);
      const userData = JSON.parse(localStorage.getItem('playbet:user') || '');
      if (!userData) throw new Error('User not found');

      const transactions = await requests.get.transactions.fromUser(
        userData.id,
        { type: 'deposito' }
      );

      setData(transactions);
      setFetching(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userData = JSON.parse(localStorage.getItem('playbet:user') || '');
      if (!userData) throw new Error('User not found');

      await requests.post.transactions.create({
        amount,
        paymentMethod: 'PIX',
        type: 'deposito',
        userId: userData.id,
      });

      closeModal();
      setAmount(0);
      await setUserData();
      await getTransactions();
    } catch (error) {}
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <Container>
      <Header />
      <section>
        <div>
          <button onClick={openModal}>
            <Plus size={16} />
            Novo deposito
          </button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Identificação</th>
              <th>Nome</th>
              <th>Tipo de depósito</th>
              <th>Quantia</th>
              <th>Data</th>
            </tr>
          </thead>

          <tbody>
            {!isFetching && (
              <>
                {data.map(({ id, user, paymentMethod, amount, createdAt }) => (
                  <tr key={id}>
                    <td>{id}</td>
                    <td>{user.username}</td>
                    <td>{paymentMethod}</td>
                    <td>{formatToBRL(amount)}</td>
                    <td>{formatDate(createdAt)}</td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </section>

      <Modal
        isOpen={depositModalIsOpen}
        onRequestClose={closeModal}
        overlayClassName='react-modal-overlay'
        className='react-modal-content'
      >
        <form
          className='depositModal'
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
        >
          {/* <input
            type='text'
            placeholder='Numero do documento de identificação'
          /> */}

          <select>
            <option value='PIX'>PIX</option>
          </select>

          {/* <div>
            <input type='text' placeholder='Nome' />
            <input type='text' placeholder='Apelido' />
          </div> */}

          <input
            type='number'
            value={amount}
            onChange={(e: InputEvent) =>
              setAmount(Number(e.target.value))
            }
            placeholder='Quantia (BRL)'
          />

          <button>Depositar</button>
        </form>
      </Modal>
      <Footer />
      <FooterBottom />
    </Container>
  );
}
