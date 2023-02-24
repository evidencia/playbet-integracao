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

`;