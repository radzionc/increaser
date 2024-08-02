import { ExpandableSelector } from '@lib/ui/select/ExpandableSelector'

import { HStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { findBy } from '@lib/utils/array/findBy'
import { useActiveProjects } from '../hooks/useActiveProjects'
import { useProjectFilter } from './ProjectFilterProvider'

export const ManageProjectFilter = () => {
  const items = useActiveProjects()
  const [projectId, setValue] = useProjectFilter()

  const getProjectFilterName = (id: string | null) => {
    if (!id) {
      return 'All projects'
    }

    return shouldBePresent(findBy(items, 'id', id)).name
  }

  return (
    <ExpandableSelector
      value={projectId}
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
