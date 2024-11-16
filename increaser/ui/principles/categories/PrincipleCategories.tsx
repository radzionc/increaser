import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { usePrincipleCategories } from './hooks/usePrincipleCategories'
import { VStack } from '@lib/ui/css/stack'
import { AddPrincipleCategory } from './AddPrincipleCategory'
import { CurrentPrincipleCategoryProvider } from './CurrentPrincipleCategoryProvider'
import { PrincipleCategoryItem } from './PrincipleCategoryItem'
import styled from 'styled-components'
import { PageHeaderControlsArea } from '@increaser/app/ui/page/header/PageHeaderControlsAreaProvider'
import { ActivePrincipleCategory } from './ActivePrincipleCategory'

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
