import styled from 'styled-components'

export const BreakdownRowContent = styled.div`
  display: grid;
  grid-gap: 8px;
  grid-template-columns: 40px 1fr 92px;
  align-items: center;
  font-size: 14px;

  > * {
    &:last-child {
      justify-self: end;
    }
  }
`
