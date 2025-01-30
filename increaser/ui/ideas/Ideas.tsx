import { VStack } from '@lib/ui/css/stack'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import styled from 'styled-components'
import { ActiveIdea } from './ActiveIdea'
import { IdeasList } from './IdeasList'
import { getProjectId } from '@increaser/entities-utils/project/getProjectId'
import {
  useFilterByProject,
  useProjectFilter,
} from '../projects/filter/project/state/projectFilter'
import { useIdeas } from './hooks/useIdeas'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { useProject } from '../projects/hooks/useProject'
import { AddIdea } from './AddIdea'
import { NoFilterMatches } from '@lib/ui/data/filter/NoFilterMatches'
import { EmptyState } from '@lib/ui/data/empty/EmptyState'
import { LearnMoreShyAction } from '@lib/ui/info/LearnMoreShyAction'

const Container = styled(VStack)`
  max-width: 560px;
`

export const Ideas = () => {
  const [projectId, setProjectFilter] = useProjectFilter()
  const project = useProject(projectId)

  const ideas = useFilterByProject(useIdeas(), getProjectId)

  if (isEmpty(ideas)) {
    if (project) {
      return (
        <NoFilterMatches
          title={`"${project.name}" has no ideas yet`}
          onRemove={() => setProjectFilter(null)}
          action={<AddIdea />}
        />
      )
    }

    return (
      <EmptyState
        title="Start with your first idea"
        action={
          <>
            <LearnMoreShyAction value="tasks" />
            <AddIdea />
          </>
        }
      />
    )
  }

  return (
    <Container>
      <ActiveItemIdProvider initialValue={null}>
        <ActiveIdea />
        <IdeasList />
      </ActiveItemIdProvider>
    </Container>
  )
}
