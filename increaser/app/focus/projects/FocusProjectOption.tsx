import { UnstyledButton } from '@lib/ui/buttons/UnstyledButton'
import {
  ClickableComponentProps,
  ComponentWithActiveState,
} from '@lib/ui/props'
import { getColor } from '@lib/ui/theme/getters'
import styled, { css } from 'styled-components'
import { useCurrentProject } from '@increaser/ui/projects/CurrentProjectProvider'
import { Text } from '@lib/ui/text'
import { hStack } from '@lib/ui/css/stack'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { panelDefaultPadding } from '@lib/ui/css/panel'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { tightListItemConfig } from '@lib/ui/list/tightListItemConfig'
import { focusLauncherConfig } from '../launcher/config'
import { useFocusTarget } from '../state/useFocusTarget'

const Container = styled(UnstyledButton)<ComponentWithActiveState>`
  ${hStack({
    fullWidth: true,
    alignItems: 'center',
    gap: 8,
  })}

  line-height: ${toSizeUnit(tightListItemConfig.lineHeight)};

  ${horizontalPadding(panelDefaultPadding)};
  height: ${toSizeUnit(focusLauncherConfig.optionMinHeight)};

  ${({ isActive }) =>
    isActive
      ? css`
          background: ${getColor('mistExtra')};
          color: ${getColor('contrast')};
        `
      : css`
          &:hover {
            background: ${getColor('mist')};
          }
        `};
`

export const FocusProjectOption = ({ onClick }: ClickableComponentProps) => {
  const [{ projectId }] = useFocusTarget()

  const { id, name, emoji } = useCurrentProject()
  const isSelected = id === projectId

  return (
    <Container onClick={onClick} isActive={isSelected}>
      <Text color="contrast">{emoji}</Text>
      <Text cropped>{name}</Text>
    </Container>
  )
}
