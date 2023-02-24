import styled from "styled-components";

export const Container = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--background);
  padding: 1rem;

`;

export const Content = styled.div`
  position: relative;
  background: rgb(32, 32, 36);
  border-radius: 10px;
  padding: 3rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  .avatar{
    width: 80px;
    height: 80px;
    background: #05d27c;
    border-radius: 50%;
    font-size: 30px;
    margin: 0 auto;
    margin-bottom: 10px;

    svg {
      display: block;
      margin: 25px auto;
      color: white;
    }
  }

  h3 {
    margin-bottom: 5px;
    color: white;
  }

  form{    
    width: 100%;

    .field-group {
      width: 100%;
      height: 50px !important;

      display: flex;
      align-items: center;
    
      border-radius: 5px;
      margin: 1rem 0px;
      
      -webkit-transition: all 0.2s ease-in-out;
      -o-transition: all 0.2s ease-in-out;
      transition: all 0.2s ease-in-out;

      input {
        width: 100%;
        height: 45px;
        padding: 0px 15px;
        border-radius: 0.25rem;
        background: var(--background);

        border: none;
        color: var(--text-title);
        font-size: 1rem;

        &:focus{
          border: 1px solid #05d27c;
        }
      }

    }

    label{
      color: #C4C4CC;
      input{
        margin-right: 10px;
      }

    }

    .link {
      display: flex;
      justify-content: space-between;
      margin: 10px 0px;


      a{
        color: var(--text-body);
        transition: filter 0.2s;
        text-decoration: none;


        &:hover{
          filter: brightness(0.9);
          text-decoration: underline #05d27c;
    
        }

        & + a {
          margin-left: 200px;
        }
      }
      
    }

    .btn {
      position: relative;
      margin: 20px 0px;

      button {
        width: 100%;
        margin: 0 auto;
        padding: 1rem;
        color: white;
        font-size: 1rem; 
        font-weight: 700;
        border-radius: .25rem;
        border: none;

        background: #05d27c;

        -webkit-box-shadow: none !important;
        box-shadow: none !important;
        transition: filter 0.2s;

        &:hover{
          filter: brightness(0.9);
          text-decoration: underline #05d27c;
    
        }
        
      } 
    }

    ul{
      width: 100%;

      display: flex;
      align-items: center;
      justify-content: center;

      li{
        width: 40px;
        height: 40px;
        background: #121214;
        border-radius: 100%;

        display: flex;
        align-items: center;
        justify-content: center;

        & + li{
          margin-left: 10px;
        }

        transition: all 0.2s ease-in-out;

        &:hover{
            background: #05d27c;
            cursor: pointer;
        }

        a{
          display: flex;
          align-items: center;
          justify-content: center;

          color: var(--text-title);

          
        }
      }
    }

  }

`;
