import styled from 'styled-components'

export const BreakdownRowContent = styled.div`
  display: grid;
  gap: 8px;
  grid-template-columns: 20px 120px 1fr 40px;
  align-items: center;
  font-size: 14px;
  font-weight: 500;

  > * {
    &:first-child {
      justify-self: center;
      font-size: 18px;
    }
    &:last-child {
      justify-self: end;
    }
  }
`
