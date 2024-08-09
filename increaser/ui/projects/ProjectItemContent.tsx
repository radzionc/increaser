import { Text } from '@lib/ui/text'
import styled from 'styled-components'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { useCurrentProject } from '@increaser/ui/projects/CurrentProjectProvider'
import { projectsConfig } from './config'
import { PrefixedItemFrame } from '@lib/ui/list/PrefixedItemFrame'

const Name = styled(Text)`
  text-align: start;
  line-height: ${toSizeUnit(projectsConfig.contentMinHeight)};
`

export const ProjectItemContent = () => {
  const { name, emoji } = useCurrentProject()

  return (
    <PrefixedItemFrame prefix={<Text color="contrast">{emoji}</Text>}>
      <Name>{name}</Name>
    </PrefixedItemFrame>
  )
}
