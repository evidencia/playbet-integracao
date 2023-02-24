import styled from "styled-components";

export const Container = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  margin-top: 4rem;
  height: calc(100vh - 150px);
  font-size: 0.94rem;


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

    
    span{
    }
  }
}
`;
