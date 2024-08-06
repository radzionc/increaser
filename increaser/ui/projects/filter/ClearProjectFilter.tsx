import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { useProject } from '../hooks/useProject'
import { useProjectFilter } from './ProjectFilterProvider'
import { Text } from '@lib/ui/text'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { CloseIcon } from '@lib/ui/icons/CloseIcon'
import styled from 'styled-components'
import { getColor } from '@lib/ui/theme/getters'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { UnstyledButton } from '@lib/ui/buttons/UnstyledButton'
import { EmojiTextPrefix } from '@lib/ui/text/EmojiTextPrefix'
import { centerContent } from '@lib/ui/css/centerContent'
import { borderRadius } from '@lib/ui/css/borderRadius'

const size = 36

const Action = styled(IconWrapper)`
  ${centerContent};
`

const Container = styled(UnstyledButton)`
  display: flex;
  gap: 1px;
  background: ${getColor('mist')};
  border: 1px solid ${getColor('mist')};
  ${borderRadius.s};
  overflow: hidden;

  &:hover ${Action} {
    background: ${getColor('foreground')};
    color: ${getColor('contrast')};
  }

  > * {
    background: ${getColor('background')};

    &:first-child {
      ${horizontalPadding(12)}
      height: ${toSizeUnit(size)};
      ${centerContent};
      font-size: 14px;
      font-weight: 500;
    }

    &:last-child {
      ${sameDimensions(size)}
    }
  }
`

export const ClearProjectFilter = () => {
  const [projectId, setValue] = useProjectFilter()
  const { name, emoji } = shouldBePresent(
    useProject(shouldBePresent(projectId)),
  )

  return (
    <Container onClick={() => setValue(null)}>
      <Text>
        <EmojiTextPrefix emoji={emoji} />
        {name}
      </Text>
      <Action>
        <CloseIcon />
      </Action>
    </Container>
  )
}
