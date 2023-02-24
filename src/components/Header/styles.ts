import styled from "styled-components";

export const Container = styled.header`
  max-width: 1120px;
  margin: 0 auto;

  display: flex;
  justify-content: space-between;
  align-items: center;

  img{
    width: 150px;
    height: 150px;
  }

  header{
    
    ul{
      display: flex;
      align-items: center;
      gap: 1rem;

      button{
        min-width: 120px;
        padding: 0.70rem;
        border: 1px solid #05d27c;
        border-radius: 0.25rem;
        background: transparent;
        color: #C4C4CC;
        font-size: 0.94rem;
        font-weight: 500;
        
        display: flex;
        justify-content: center;
        align-items: center;

        svg{
          margin-left: 8px;
        }

        &:hover{
          color: #fff;
          background: #05d27c;
        }
      }

      li{
        
        list-style: none;

        a{
          text-decoration: none;
          font-size: 0.94rem;
          
          color: #C4C4CC;

          &:hover{
            filter: brightness(0.9);
          }
        }
      }
    }
  }

  div {
    display: flex;
    align-items: center;
    gap: 1rem;

    p{
      display: flex;
      align-items: center;
      gap: 0.30rem;

      color: #05d27c;
    }

    div{


      display: flex;
      align-items: center;
      justify-content: center;

      img{
        width: 50px;
        height: 50px;
        border-radius: 100%;

        display: flex;
        align-items: center;
        justify-content: center;

        object-fit: cover;
      }
    }
    
  }
`;