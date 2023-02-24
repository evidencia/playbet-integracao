import styled from "styled-components";

export const Container = styled.div`
  height: 10vh;
  background: #121214;

  footer{
    max-width: 1120px;
    margin: 0px auto;

    height: 10vh;


    ul{
      display: flex;
      align-items: center;
      gap: 10px;

      li{
        list-style: none;

        a{
          width: 42px;
          height: 42px;
          border-radius: 0.25rem;
          background: #201F24;
          margin-top: 15px;
          text-decoration: none;

          display: flex;
          align-items: center;
          justify-content: center;
          transition: filter 0.2s;



          svg{
            color: #05d27c;
          }
        }
      }
    }
  }
`;