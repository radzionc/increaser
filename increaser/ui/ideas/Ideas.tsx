import { VStack } from '@lib/ui/css/stack'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import styled from 'styled-components'
import { ActiveIdea } from './ActiveIdea'
import { IdeasList } from './IdeasList'

const Container = styled(VStack)`
  max-width: 560px;
`

export const Ideas = () => {
  return (
    <Container>
      <ActiveItemIdProvider initialValue={null}>
        <ActiveIdea />
        <IdeasList />
      </ActiveItemIdProvider>
    </Container>
  )
}
