import { HStack } from '@lib/ui/css/stack'
import { Text } from '@lib/ui/text'
import { Filter } from '@lib/ui/data/filter/Filter'
import { findBy } from '@lib/utils/array/findBy'
import { useExlorePrincipleCategoryFilter } from './state/explorePrincipleCategoryFilter'
import { defaultPrincipleCategories } from '@increaser/entities/PrincipleCategory'

export const ExplorePrinciplesCategoryFilter = () => {
  const [id, setValue] = useExlorePrincipleCategoryFilter()
  const items = defaultPrincipleCategories
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
