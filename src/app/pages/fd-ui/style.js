import styled from 'styled-components'

export const Container = styled.div(props => `
  width: 100%;
  margin: 0 auto;
  // max-width: 1660px;
  max-width: 80rem;
`)

export const OuterWrapper = styled.div(props => `
  width: 100%;
`)

export const InnerWrapper = styled.div(props => `
  display: flex;
  flex-direction: column;
  width: 100%;
`)

export const HeaderTextWrapper = styled.div(props => `
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -moz-column-gap: 25px;
  -webkit-column-gap: 25px;
  column-gap: 25px;
  position: relative;
  margin-top: 60px;
  padding-bottom: 60px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
`)

export const HeaderTextIcon = styled.div(props => `
  position: absolute;
  top: 0;
  left: 0;
`)

export const HeaderTextContent = styled.div(props => `
  > p,
  > h1 {
    padding-left: 93px;
  }
  > h1 {
    font-size: 52px;
    font-weight: bold;
    padding-bottom: 25px;
    line-height: 1.2;
  }
  > p {
    font-size: 16px;
    font-weight: 500;
    width: 60%;
    color: #5f5f5f;
  }
`)

export const HolderWrapper = styled.div(props => `
  display: flex;
  justify-content: space-between;
  > div {
    width: 40%;
  }
`)

export const Lhs = styled.div(props => `
`)

export const Rhs = styled.div(props => `
  display: flex;
  flex-direction: column;
`)

export const Calcvalue = styled.div(props => `
  text-align: center;
  padding-top: 30px;
  > h2 {
    font-size: 16px;
  }
  > span {
    font-size: 24px;
    font-weight: 500;
  }
`)

export const CalcGraph = styled.div(props => `
  display: flex;
  flex-direction: column;
  > p {
    color: #828282;
    line-height: 1;
    margin-top: 5px;
    font-size: 12px;
    text-transform: capitalize;
  }
`)

export const Legend = styled.p(props => `
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: #828282;
  line-height: 1;
  position: relative;
  padding-left: 20px;
  margin-bottom: 10px;
  &::before {
    background: ${props?.color};
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 10px;
    height: 10px;
    display: flex;
    margin-right: 10px;
    border-radius: 10px;
  }
  > span {
    color: ${props?.color};
  }
`)

export const Graph = styled.div(props => `
  width: 100%;
  background: #ff0049;
  display: flex;
  height: 100px;
  border-radius: 6px;
  margin-top: 20px;
  position: relative;
  overflow: hidden;
  &::before {
    content: "";
    display: flex;
    width: ${props?.width}%;
    height: 100%;
    background: #253844;
    position: absolute;
    top: 0;
    left: 0;
    transition: ease-in-out.5s;
  }
`)

export const RadioWrapper = styled.div(props => `
  width: 100%;
  display: flex;
  justify-content: space-between;
  > div {
    // width: 40%;
    width: fit-content;
    display: flex;
    align-items: center;
    // margin-top: 16px;
    cursor: pointer;
    margin-top: 10px;
    > label {
      margin-left: 10px;
      // font-size: 13.33px;
      font-size: 16px;
    }
  }
`)

export const InputWrapper = styled.div(props => `
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 60px;

  > div {
    width: 100%;
    display: flex;
    p {
      text-transform: capitalize;
      width: 50%;
      display: flex;
      align-items: center;
    }
    input[type=text],
    input[type=number] {
      position: relative;
      width: 50%;
      text-align: right;
      background: transparent;
      height: 36px;
      // padding-right: 14px;
      border-radius: 3px;
      font-weight: 500;
      // &::${props?.psudo?.pos}{
      //   content:"${props?.psudo?.content}";
      //   position: absolute;
      //   top: 0;
      //   left: 0;
      // }
    }
  }
  // input[type=radio],
  select,
  input[type=range] {
    background: transparent;
    width: 100%;
    cursor: pointer;
    border-radius: 15px;
    margin-top: 16px;
    outline: none;
    transition: ease-in-out.5s;
  }
  select {
    font-size: 16px;
    margin-top: 10px;
  }
  input[type=range] {
    height: 3px;
  }
  option {
    text-transform: capitalize:
  }
`)
