import styled from "styled-components";

export const Container = styled.div`
  

  section{
    max-width: 1120px;
    margin: 100px auto 200px auto;

    div{
      display: flex;
      justify-content: end;

      button{
        height: 3rem;
        border: 1px solid #05d27c;
        border-radius: 0.25rem;
        padding: 1rem;
        color: white;
        background: transparent;

        display: flex;
        justify-content: center;
        align-items: center;

        svg{
          margin-right: 10px;
        }

        transition: filter 0.2s;

        &:hover{
          filter: brightness(0.9);
          background: #05d27c;
        }
      }
    }

    table{
      width: 100%;
      border-spacing: 0 0.5rem;

      th{
        font-weight: 500;
        padding: 1rem 2rem;
        text-align: left;
        line-height: 1.5rem;
        color: rgb(168, 168, 179);
      }

      td{
        padding: 1rem 2rem;
        border: 1px solid rgb(32, 32, 36);
        background-color: rgb(32, 32, 36);
        color: var(--text-body);
        border-radius: 0;
        color: rgb(168, 168, 179);

        &.gain{
          color: #00B37E;
        }

        &.lost{
          color: #F75A68;
        }
      }
    }    
  }
  
`;