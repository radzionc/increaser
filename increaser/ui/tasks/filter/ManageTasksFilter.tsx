import { ExpandableSelector } from '@lib/ui/select/ExpandableSelector'

import { HStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { findBy } from '@lib/utils/array/findBy'
import { useActiveProjects } from '../../projects/hooks/useActiveProjects'
import { useTasksFilter } from './TasksFilterProvider'

export const ManageTasksFilter = () => {
  const items = useActiveProjects()
  const [{ projectId }, setValue] = useTasksFilter()

  const getProjectFilterName = (id: string | null) => {
    if (!id) {
      return 'All projects'
    }

    return shouldBePresent(findBy(items, 'id', id)).name
  }

  return (
    <ExpandableSelector
      value={projectId}
      onChange={(projectId) => setValue((prev) => ({ ...prev, projectId }))}
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
