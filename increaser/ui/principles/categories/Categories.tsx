import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { usePrincipleCategories } from './hooks/usePrincipleCategories'
import { VStack } from '@lib/ui/layout/Stack'
import { AddPrincipleCategory } from './AddPrincipleCategory'
import { CurrentPrincipleCategoryProvider } from './CurrentPrincipleCategoryProvider'

export const Categories = () => {
  const items = usePrincipleCategories()

  return (
    <VStack>
      <AddPrincipleCategory />
      <ActiveItemIdProvider initialValue={null}>
        {items.map((item) => (
          <CurrentPrincipleCategoryProvider key={item.id} value={item}>
            {item.name}
          </CurrentPrincipleCategoryProvider>
        ))}
      </ActiveItemIdProvider>
    </VStack>
  )
}
