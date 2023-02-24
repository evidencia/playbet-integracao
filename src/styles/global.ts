import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  
  :root{
    --green-900: #05d27c; 
    --green: green;
    --red: red;


    --white: #fff;
    --text-title: #E1E1E6;
    --text-body: #C4C4CC;

    --background: #121214;
    

    --card: #323238;
    --card-table: #29292E;
  }
  
  * {
    margin: 0;
    padding: 0;
    outline: none;
    box-sizing: border-box;
  }

  // font-size: 16px (Desktop) é a padrão para Desktop
  
  html{
    @media (max-width: 1080px) {
      font-size: 93.75%; // 15px
    }
    
    @media (max-width: 720px) {
      font-size: 87.5%; // 14px
    }
  }

  body{
    background: var(--background);
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button {
    font-family: 'Inter', sans-serif;
    font-weight: 400;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 600;
  }

  button {
    cursor: pointer;
  }

  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .react-modal-overlay{
    background: rgba(0, 0, 0, 0.75);
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;

    display: flex;
    align-items: center;
    justify-content: center;
  }
  .react-modal-content{
    width: 100%;
    max-width: 576px;
    background: rgb(32, 32, 36);
    padding: 3rem;
    position: relative;
    border-radius: 0.24rem;

  }

  .depositModal{
    width: 100%;

    input, select{
      width: 100%;
      height: 3rem;
      background: #121214;
      padding: 1rem;
      border: 0;
      border-radius: 0.25rem;
      color: rgb(168, 168, 179);

    }

    div {
      display: flex;
      gap: 10px;
      margin: 1rem 0px;
    }

    button {
      width: 100%;
      height: 3rem;
      background: #05d27c;
      border: 0;
      border-radius: 0.25rem;
      margin: 1rem 0px;
      color: white;

      transition: filter 0.2s;

      &:hover{
        filter: brightness(0.9);
      }
  }
`;
