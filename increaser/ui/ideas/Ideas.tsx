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

const Container = styled(VStack)`
  max-width: 560px;
`

export const Ideas = () => {
  const [projectId, setProjectFilter] = useProjectFilter()
  const project = useProject(projectId)

  const ideas = useFilterByProject(useIdeas(), getProjectId)

  if (isEmpty(ideas) && project) {
    return (
      <NoFilterMatches
        title={`"${project.name}" has no ideas yet`}
        onRemove={() => setProjectFilter(null)}
        action={<AddIdea />}
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
