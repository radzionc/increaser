import { useActiveProjects } from '../../hooks/useActiveProjects'
import { useProject } from '../../hooks/useProject'
import { useProjectFilter } from './state/projectFilter'
import { HStack } from '@lib/ui/css/stack'
import { Text } from '@lib/ui/text'
import { Filter } from '@lib/ui/data/filter/Filter'

export const ManageProjectFilter = () => {
  const [projectId, setValue] = useProjectFilter()
  const project = useProject(projectId)
  const items = useActiveProjects()

  return (
    <Filter
      value={project ?? null}
      onChange={(value) => setValue(value ? value.id : null)}
      items={items}
      title={'Filter by project'}
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
