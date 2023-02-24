import styled from "styled-components";

export const Container = styled.div`
  max-width: 1120px;
  margin: 1rem auto;

  header{
    display: flex;
    justify-content: space-between;
    align-items: center;

    div{
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;

      button{
        width: 50px;
        height: 50px;
        border: none;
        border-radius: 0.25rem;
        
        font-size: 1rem;
        font-weight: 400;
        color: white;
        background: var(--green-900);

        display: flex;
        justify-content: center;
        align-items: center;
        transition: filter 0.2s;

        &:hover{
          filter: brightness(0.9);
        }
        
      }

      
    }
    
    
  };

  main{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;

    div{
      position: relative;
      
      &:hover{

        img{
         opacity: 0.3;
        }

        button{
          opacity: 1;
        }

      }


      margin: 80px 0px;

      img{
        max-width: 330px;
        height: 440px;
        border-radius: 0.25rem;
      }

      button{
        min-width: 150px;
        height: 3.5rem;
        padding: 1rem;
        text-align: center;
        opacity: 0;
        background: transparent;
        border: 2px solid #05d27c;
        border-radius: 0.25rem;
        color: #C4C4CC;
        
        transition: .5s ease;
        transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
        font-size: 1rem;

        position: absolute;
        top: 50%;
        left: 50%;

        &:hover{
          filter: brightness(0.9);
          background: #05d27c;
          color: white;
        }
      }
    }
  }
`;