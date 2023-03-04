import { useState, useEffect } from 'react';

import './styles.css';
import { Coins, CurrencyCircleDollar, List, X } from 'phosphor-react';
import { Link, useNavigate } from 'react-router-dom';

import logo from '../../assets/logo.png';
import formatToBRL from '../../utils/formatToBRL';
import { getUserInStorage } from '../../utils/localStorage';
import { IUserInStorage } from '../../interfaces/IUser';

export const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  function getUser(): IUserInStorage | void {
    const user = getUserInStorage();
    if (user) return user;
    navigate('/');
  }

  const getUserBalance = () => {
    const user = getUser();
    if (!user) return 0;
    return user.accountBalance;
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <nav className='navbar'>
      <Link to='/home'>
        <img src={logo} alt='logo' />
      </Link>

      <ul
        className={isMobile ? 'nav-links-mobile' : 'nav-links'}
        onClick={() => setIsMobile(false)}
      >
        <li>
          <Link to='/bets'>Minhas apostas</Link>
        </li>
        <li>
          <Link to='/saques'>Saques</Link>
        </li>

        <p>
          {formatToBRL(getUserBalance())}
          <Coins size={25} weight='duotone' />
        </p>
      </ul>

      <article>
        <button onClick={() => navigate('/deposit')}>
          Depositar
          <CurrencyCircleDollar size={20} />
        </button>
      </article>

      <button
        className='mobile-menu-icon'
        onClick={() => setIsMobile(!isMobile)}
      >
        {isMobile ? <X /> : <List />}
      </button>
    </nav>
  );
};
