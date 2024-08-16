import styled from 'styled-components'

export const TaskBoardContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(280px, 1fr);
  overflow-x: auto;
  flex: 1;
  padding-bottom: 20px;
`
