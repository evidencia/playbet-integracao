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

    .link {
      display: flex;
      justify-content: space-between;


      a{
        color: var(--text-body);
        transition: filter 0.2s;
        text-decoration: none;


        &:hover{
          filter: brightness(0.9);
          text-decoration: underline #05d27c;
    
        }

        & + a {
          margin-left: 30px;
          margin-bottom: 30px;
        }
      }
      
    }

    .btn {
      button {
        width: 100%;
        top: 20px;
        left: 0;
        right: 0;
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

        &:hover,  &:active,  &:focus,{
          outline: none !important;
          -webkit-box-shadow: none;
          box-shadow: none !important;
          color: var(--text-title);
          border: 1px solid red;
        }
        
      } 
    }

`;
