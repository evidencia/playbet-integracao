import styled from "styled-components";

export const Container = styled.div`
  height: 40vh;
  background: #121214;
  border-top: 1px solid #323238;
  border-bottom: 1px solid #323238;

  main{
    max-width: 1120px;
    margin: 0 auto;

    display: flex;
    align-items: center;
    justify-content: space-between;

    div {

      img{
        width: 200px;
        height: 200px;
      }

      p{
        font-size: 400;
        color: #C4C4CC;

        & + p{
          margin-top: 10px;
        }
      }
    }

    img{
      width: 60px;
      height: 60px;
    }

    ul {
      li{
        list-style: none;

        & + li{
          margin-top: 10px;
        }

        a{
          text-decoration: none;
          color: #C4C4CC;

          transition: filter 0.3s;

          &:hover{
            filter: brightness(0.9);
            border-bottom: 1px solid #05d27c;
          }

         
        }
      }
    }
  }

  //Mobile 
  @media only screen and (max-width: 600px) {
    padding: 0 2rem;

    main{
      align-items: start;
      flex-direction: column;

      div{
        img{
          width: 130px;
          height: 130px;
          display: block;
        }

        p{
          display: none;
        }
      }

      img{
          display: none;
      }
    }
  }

  
  @media only screen and (min-width: 768px) {
    padding: 0 2rem;
  }
`;