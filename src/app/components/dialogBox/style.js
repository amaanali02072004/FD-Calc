import styled from 'styled-components'

export const OuterWrapper = styled.div(props => `
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: #00000094;
`)

export const InnerWrapper = styled.div(props => `
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  border-radius: 15px;
  width: 600px;
  padding: 15px;
  margin: 0 auto;
  margin-top: 50px;
  > h2 {
    width: 100%;
    color: #000;
    font-size: 24px;
    margin-bottom: 10px;
  }
  > p {
    width: 100%;
    color: #000;
    font-size: 16px;
    margin-bottom: 30px;
  }
  > button {
    width: fit-content;
    background: #007bff;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
  }
`)
