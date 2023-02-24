import styled from "styled-components";

export const Container = styled.div`

section{
  max-width: 1120px;
  margin: 100px auto 0px auto;

  height: calc(90vh - 150px);

  form{
    max-width: 600px;
    padding: 1.5rem;
    background: rgb(32, 32, 36);
    margin: 0 auto;
    border-radius: 0.25rem;

    p{
      color: rgb(168, 168, 179);
      margin: 10px 0px;
      font-size: 1rem;
      font-weight: 700;
    }



    div{
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      padding: 0.25rem;

      input{
        min-width: 50%;
        flex-direction: row;
        height: 3rem;
        padding: 1rem;
        margin: 5px 0px;
        background: #121214;
        border: 0;
        border-radius: 0.25rem;
        color: rgb(168, 168, 179);

      }
    }

    button{
      min-width: 49%;
      height: 3rem;
      background: #05d27c;
      border: 0;
      border-radius: 0.25rem;
      color: white;
      margin-top: 1rem;

      transition: filter 0.2s;

      &:hover{
        filter: brightness(0.9);
      }

    }
    
  }
}
`;