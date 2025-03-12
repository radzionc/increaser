import { VStack } from '@lib/ui/css/stack'
import { EmptyState } from '@lib/ui/data/empty/EmptyState'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { LearnMoreShyAction } from '@product/ui/info/LearnMoreShyAction'

import { AddProject } from './AddProject'
import { useProjectStatusFilter } from './filter/status/ProjectStatusFilterProvider'
import { useFilteredByStatusProjects } from './hooks/useFilteredByStatusProjects'
import { ProjectList } from './ProjectList'

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
