import { HStack } from '@lib/ui/layout/Stack'
import { useProjectStatusFilter } from './filter/status/ProjectStatusFilterProvider'
import { SectionTitle } from '@lib/ui/text/SectionTitle'
import { capitalizeFirstLetter } from '@lib/utils/capitalizeFirstLetter'
import { ProjectStatusFilter } from './filter/status/ProjectStatusFilter'
import { useAssertUserState } from '../user/UserStateContext'
import { Text } from '@lib/ui/text'

export const ProjectsHeader = () => {
  const [status] = useProjectStatusFilter()
  const { projects } = useAssertUserState()

  const count = Object.values(projects).filter(
    (project) => project.status === status,
  ).length

  return (
    <HStack
      fullWidth
      alignItems="center"
      justifyContent="space-between"
      gap={20}
      wrap="wrap"
    >
      <SectionTitle>
        {capitalizeFirstLetter(status)} projects
        <Text style={{ marginLeft: 8 }} as="span" color="supporting">
          ({count})
        </Text>
      </SectionTitle>
      <ProjectStatusFilter />
    </HStack>
  )
}
