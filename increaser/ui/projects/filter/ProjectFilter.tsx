import { ExpandableSelector } from '@lib/ui/select/ExpandableSelector'

import { HStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { useProjectFilter } from './useProjectFilter'
import { useActiveProjects } from '../hooks/useActiveProjects'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { findBy } from '@lib/utils/array/findBy'

export const ProjectFilter = () => {
  const items = useActiveProjects()
  const [value, setValue] = useProjectFilter()

  const getProjectFilterName = (id: string | null) => {
    if (!id) {
      return 'All projects'
    }

    return shouldBePresent(findBy(items, 'id', id)).name
  }

  return (
    <ExpandableSelector
      value={value}
      onChange={setValue}
      floatingOptionsWidthSameAsOpener={false}
      options={[...items.map((item) => item.id), null]}
      getOptionKey={getProjectFilterName}
      renderOption={(option) => (
        <HStack alignItems="center" gap={8}>
          {option && (
            <Text color="contrast">
              {shouldBePresent(findBy(items, 'id', option)).emoji}
            </Text>
          )}

          <Text>{getProjectFilterName(option)}</Text>
        </HStack>
      )}
    />
  )
}
