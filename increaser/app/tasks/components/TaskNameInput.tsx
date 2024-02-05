import styled from 'styled-components'

export const TaskNameInput = styled.input`
  background: transparent;
  border: none;
  height: 100%;
  margin: 0;
  width: 100%;
  outline: none;
  color: ${({ theme }) => theme.colors.text.toCssValue()};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textShy.toCssValue()};
  }
`
