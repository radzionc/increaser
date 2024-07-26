import {
  PrinciplesViewProvider,
  PrinciplesViewSelector,
  RenderPrinciplesView,
} from './PrinciplesView'
import { Principles } from './Principles'
import { PrincipleCategories } from './categories/PrincipleCategories'
import { PrinciplesContainer } from './PrinciplesContainer'

export const ManagePrinciples = () => {
  return (
    <PrinciplesContainer gap={32}>
      <PrinciplesViewProvider>
        <PrinciplesViewSelector />
        <RenderPrinciplesView
          principles={() => <Principles />}
          categories={() => <PrincipleCategories />}
        />
      </PrinciplesViewProvider>
    </PrinciplesContainer>
  )
}
