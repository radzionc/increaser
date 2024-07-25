import { VStack } from '@lib/ui/layout/Stack'
import styled from 'styled-components'
import {
  PrinciplesViewProvider,
  PrinciplesViewSelector,
  RenderPrinciplesView,
} from './PrinciplesView'
import { Principles } from './Principles'
import { Categories } from './categories/Categories'

const Container = styled(VStack)`
  max-width: 560px;
  width: 100%;
  gap: 32px;
`

export const ManagePrinciples = () => {
  return (
    <Container>
      <PrinciplesViewProvider>
        <PrinciplesViewSelector />
        <RenderPrinciplesView
          principles={() => <Principles />}
          categories={() => <Categories />}
        />
      </PrinciplesViewProvider>
    </Container>
  )
}
