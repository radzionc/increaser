import { Text } from '@lib/ui/text'
import styled from 'styled-components'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { getColor } from '@lib/ui/theme/getters'
import { useCurrentProject } from '@increaser/ui/projects/CurrentProjectProvider'
import { projectsConfig } from './config'
import { ChecklistItemFrame } from '@lib/ui/checklist/ChecklistItemFrame'
import { Center } from '@lib/ui/layout/Center'

const Name = styled(Text)`
  text-align: start;
  color: ${getColor('contrast')};
  line-height: ${toSizeUnit(projectsConfig.contentMinHeight)};
`

export const ProjectItemContent = () => {
  const { name, emoji } = useCurrentProject()

  return (
    <ChecklistItemFrame>
      <Center>
        <Text color="contrast">{emoji}</Text>
      </Center>
      <Name>{name}</Name>
    </ChecklistItemFrame>
  )
}
