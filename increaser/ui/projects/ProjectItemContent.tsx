import { Text } from '@lib/ui/text'
import styled from 'styled-components'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { getColor } from '@lib/ui/theme/getters'
import { EmojiTextPrefix } from '@lib/ui/text/EmojiTextPrefix'
import { useCurrentProject } from '@increaser/ui/projects/CurrentProjectProvider'
import { projectsConfig } from './config'

const Name = styled(Text)`
  text-align: start;
  font-weight: 500;
  color: ${getColor('contrast')};
  font-size: 14px;
  line-height: ${toSizeUnit(projectsConfig.contentMinHeight)};
`

export const ProjectItemContent = () => {
  const { name, emoji } = useCurrentProject()

  return (
    <Name>
      <EmojiTextPrefix emoji={emoji} />
      {name}
    </Name>
  )
}
