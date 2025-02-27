import {
  OuterWrapper,
  InnerWrapper
} from './style'

const DialogBox = ({ title, message, onClick }) => {
  return (
    <OuterWrapper onClick={onClick}>
      <InnerWrapper>
        <h2>{title}</h2>
        <p>{message}</p>
        <button onClick={onClick} autoFocus>
          OK
        </button>
      </InnerWrapper>
    </OuterWrapper>
  )
}

export default DialogBox
