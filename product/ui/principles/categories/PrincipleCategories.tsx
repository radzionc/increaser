import { VStack } from '@lib/ui/css/stack'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { PageHeaderControlsArea } from '@product/app/ui/page/header/PageHeaderControlsAreaProvider'
import styled from 'styled-components'

import { ActivePrincipleCategory } from './ActivePrincipleCategory'
import { AddPrincipleCategory } from './AddPrincipleCategory'
import { CurrentPrincipleCategoryProvider } from './CurrentPrincipleCategoryProvider'
import { usePrincipleCategories } from './hooks/usePrincipleCategories'
import { PrincipleCategoryItem } from './PrincipleCategoryItem'

const Container = styled(VStack)`
  max-width: 560px;
  width: 100%;
`

export const PrincipleCategories = () => {
  const items = usePrincipleCategories()

  return (
    <>
      <PageHeaderControlsArea>
        <AddPrincipleCategory />
      </PageHeaderControlsArea>
      <ActiveItemIdProvider initialValue={null}>
        <ActivePrincipleCategory />
        <Container>
          {items.map((item) => (
            <CurrentPrincipleCategoryProvider key={item.id} value={item}>
              <PrincipleCategoryItem />
            </CurrentPrincipleCategoryProvider>
          ))}
        </Container>
      </ActiveItemIdProvider>
    </>
  )
}
