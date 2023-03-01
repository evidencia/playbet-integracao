import styled from "styled-components";

export const Container = styled.header`
  max-width: 1120px;
  height: calc(100vh - 150px);
  margin: 0 auto;


  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    h1{
      font-size: 3rem;
      color: #C4C4CC;

      span{
        color: #05d27c;
      }
    }
  }

    //Mobile 
    @media only screen and (max-width: 600px) {
    padding: 0 2rem;
    flex-direction: column ;

    div {
      text-align: center;
      h1{
        font-size: 2rem;
        margin-top: 80px;
      }
    }

    img{
      width: 300px;
      height: 300px;
    }
  }
        
        //Leptop 
    @media only screen and (min-width: 701px) {
      padding: 0 2rem;

      div {
        h1{
          font-size: 2.2rem;
          display: flex;
          flex-direction: column;
          span{

          }
        }
      }

      img{
        width: 340px;
        height: 300px;
      }
    }
`;

