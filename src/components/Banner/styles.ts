import styled from "styled-components";

export const Container = styled.div`
  max-width: 1120px;
  margin: 0 auto;


  color: white;

  img{
    weight: 100%;
    height: 150px;
    display: block;
    object-fit: cover;
  }

  main {
    width: 100%;
    height: calc(100vh - 150px);

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1{
      font-size: 4rem;
      font-weight: 700;

      span{
        display: block;
        text-align: center;
      } 
    }

    div{
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 15px;

      button{
        min-width: 230px;
        height: 3.5rem;
        border-radius: 0.25rem;
        font-size: 1rem;
        font-weight: 400;
        padding: 1rem;
        border: 2px solid var(--green-900); 
        color: white;
        margin-top: 4rem;
        background: transparent;

        transition: filter 0.2s;

        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;

        &:hover{
          filter: brightness(0.9);
          background: var(--green-900);
        }
      }
    }
  }
  
`;