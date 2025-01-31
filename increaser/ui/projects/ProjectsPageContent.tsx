import { VStack } from '@lib/ui/css/stack'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'

import { ProjectList } from './ProjectList'
import { useFilteredByStatusProjects } from './hooks/useFilteredByStatusProjects'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { useProjectStatusFilter } from './filter/status/ProjectStatusFilterProvider'
import { AddProject } from './AddProject'
import { LearnMoreShyAction } from '@lib/ui/info/LearnMoreShyAction'
import { EmptyState } from '@lib/ui/data/empty/EmptyState'

export const ProjectsPageContent = () => {
  const [status] = useProjectStatusFilter()

  const projects = useFilteredByStatusProjects()

  if (isEmpty(projects)) {
    return (
      <EmptyState
        title={`You have no "${status}" projects yet`}
        action={
          <>
            <LearnMoreShyAction value="trackTime" />
            <AddProject />
          </>
        }
      />
    )
  }

  return (
    <ActiveItemIdProvider initialValue={null}>
      <VStack>
        <ProjectList />
      </VStack>
    </ActiveItemIdProvider>
  )
}
