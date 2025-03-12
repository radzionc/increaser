import { HStack } from '@lib/ui/css/stack'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { PrefixedItemFrame } from '@lib/ui/list/PrefixedItemFrame'
import { Text } from '@lib/ui/text'
import { useCurrentProject } from '@product/ui/projects/CurrentProjectProvider'
import styled from 'styled-components'

import { ProjectBudgetTag } from './budget/ProjectBudgetTag'
import { projectsConfig } from './config'

const Name = styled(Text)`
  text-align: start;
  line-height: ${toSizeUnit(projectsConfig.contentMinHeight)};
`

export const ProjectItemContent = () => {
  const { name, emoji } = useCurrentProject()

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
      <ProjectBudgetTag />
    </HStack>
  )
}
