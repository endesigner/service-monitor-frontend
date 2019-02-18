import styled from 'styled-components'

export const AppWrapper = styled.div`
  * {
    font-family: 'Verdana';
    font-size: 20px;
    box-sizing: border-box;
  }

  .controls {
    padding-left: 20px;
    margin-bottom: 10px;
    margin-top: 10px;
    button {
      width: 200px;
    }
  }
`
export const CheckBox = styled.input`
  padding: 0;
  margin: 0;
  width: 20px;
  display: inline-block;
`
export const Input = styled.input`
  background-color: #ccc;
  width: 200px;
  padding: 0.3em;
  margin:0;
  background-color: #eee;
`
export const Link = styled.a`
  display: inline-block;

  :hover {
    background-color: #eee;
  }

  span {
    display: inline-block;
    width: 200px;
    padding: 0.3em;
    margin:0;
    overflow: hidden;
  }
`
export const Row = styled.div`
  div {
    display: inline-block;
  }
`

export const Status = styled.div`
  font-weight: bold;
  margin-left: 10px;
  width: 100px;
`
