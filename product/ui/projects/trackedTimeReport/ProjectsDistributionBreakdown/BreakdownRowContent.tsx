import styled from 'styled-components'

export const BreakdownRowContent = styled.div`
  display: grid;
  gap: 8px;
  grid-template-columns: 148px 1fr 40px;
  align-items: center;
  font-size: 14px;
  font-weight: 500;

  > * {
    &:last-child {
      justify-self: end;
    }
  }
`
