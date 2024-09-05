import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { usePrincipleCategories } from './hooks/usePrincipleCategories'
import { VStack } from '@lib/ui/css/stack'
import { AddPrincipleCategory } from './AddPrincipleCategory'
import { CurrentPrincipleCategoryProvider } from './CurrentPrincipleCategoryProvider'
import { PrincipleCategoryItem } from './PrincipleCategoryItem'

export const PrincipleCategories = () => {
  const items = usePrincipleCategories()

  return (
    <VStack>
      <ActiveItemIdProvider initialValue={null}>
        {items.map((item) => (
          <CurrentPrincipleCategoryProvider key={item.id} value={item}>
            <PrincipleCategoryItem />
          </CurrentPrincipleCategoryProvider>
        ))}
      </ActiveItemIdProvider>
      <AddPrincipleCategory />
    </VStack>
  )
}
