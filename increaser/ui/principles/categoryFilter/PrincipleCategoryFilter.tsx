import { HStack } from '@lib/ui/css/stack'
import { Text } from '@lib/ui/text'
import { Filter } from '@lib/ui/data/filter/Filter'
import { usePrincipleCategoryFilter } from './state/principleCategoryFilter'
import { usePrincipleCategories } from '../categories/hooks/usePrincipleCategories'
import { findBy } from '@lib/utils/array/findBy'

export const PrincipleCategoryFilter = () => {
  const [id, setValue] = usePrincipleCategoryFilter()
  const items = usePrincipleCategories()
  const item = id ? findBy(items, 'id', id) ?? null : null

  return (
    <Filter
      value={item}
      onChange={(value) => setValue(value ? value.id : null)}
      items={items}
      title={'Filter by category'}
      getItemKey={({ name }) => name}
      renderItem={({ emoji, name }) => (
        <HStack alignItems="center" gap={8}>
          <Text color="contrast">{emoji}</Text>
          <Text>{name}</Text>
        </HStack>
      )}
    />
  )
}
