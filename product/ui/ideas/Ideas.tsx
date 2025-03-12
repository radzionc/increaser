import { VStack } from '@lib/ui/css/stack'
import { EmptyState } from '@lib/ui/data/empty/EmptyState'
import { NoFilterMatches } from '@lib/ui/data/filter/NoFilterMatches'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { getProjectId } from '@product/entities-utils/project/getProjectId'
import styled from 'styled-components'

import { LearnMoreShyAction } from '../info/LearnMoreShyAction'
import {
  useFilterByProject,
  useProjectFilter,
} from '../projects/filter/project/state/projectFilter'
import { useProject } from '../projects/hooks/useProject'

import { ActiveIdea } from './ActiveIdea'
import { AddIdea } from './AddIdea'
import { useIdeas } from './hooks/useIdeas'
import { IdeasList } from './IdeasList'

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
