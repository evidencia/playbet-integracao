import React, { useState } from 'react';

import './styles.css';
import { Coins, CurrencyCircleDollar, List, X } from 'phosphor-react';
import { Link, useNavigate } from 'react-router-dom';

import logo from '../../assets/logo.png';
import formatToBRL from '../../utils/formatToBRL';

export const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  const getUserBalance = () => {
    const userData = JSON.parse(localStorage.getItem('playbet:user') || '');
    if (!userData) return 0;
    return userData.accountBalance;
  };

  return (
    <nav className="navbar">
      <Link to="/home">
        <img src={logo} alt="logo" />
      </Link>

      <ul 
        className={isMobile ? "nav-links-mobile" : "nav-links"}
        onClick={() => setIsMobile(false)}
      >
        <li><Link to='/bets'>Minhas apostas</Link></li>
        <li><Link to='/saques'>Saques</Link></li>
        
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
        {isMobile ? <X />  : <List />}
      </button>
    </nav>
  );
}