import { Text } from '@lib/ui/text'
import styled from 'styled-components'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { useCurrentProject } from '@increaser/ui/projects/CurrentProjectProvider'
import { projectsConfig } from './config'
import { PrefixedItemFrame } from '@lib/ui/list/PrefixedItemFrame'
import { HStack } from '@lib/ui/css/stack'
import { ProjectBudgetTag } from './budget/ProjectBudgetTag'

const Name = styled(Text)`
  text-align: start;
  line-height: ${toSizeUnit(projectsConfig.contentMinHeight)};
`

export const ProjectItemContent = () => {
  const { name, emoji, allocatedMinutesPerWeek } = useCurrentProject()

  return (
    <HStack
      fullWidth
      alignItems="center"
      justifyContent="space-between"
      gap={20}
    >
      <PrefixedItemFrame prefix={<Text color="contrast">{emoji}</Text>}>
        <Name>{name}</Name>
      </PrefixedItemFrame>
      {allocatedMinutesPerWeek && allocatedMinutesPerWeek > 0 ? (
        <ProjectBudgetTag />
      ) : null}
    </HStack>
  )
}
