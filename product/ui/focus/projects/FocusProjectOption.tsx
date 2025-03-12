import { UnstyledButton } from '@lib/ui/buttons/UnstyledButton'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { panelDefaultPadding } from '@lib/ui/css/panel'
import { hStack } from '@lib/ui/css/stack'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { tightListItemConfig } from '@lib/ui/list/tightListItemConfig'
import { OnClickProp, IsActiveProp } from '@lib/ui/props'
import { getColor } from '@lib/ui/theme/getters'
import { focusLauncherConfig } from '@product/ui/focus/launcher/config'
import { ProjectBudgetTag } from '@product/ui/projects/budget/ProjectBudgetTag'
import { useCurrentProject } from '@product/ui/projects/CurrentProjectProvider'
import styled, { css } from 'styled-components'

import { useFocusTarget } from '../state/focusTarget'

import { FocusProjectOptionContent } from './FocusProjectOptionContent'

const Container = styled(UnstyledButton)<IsActiveProp>`
  ${hStack({
    fullWidth: true,
    alignItems: 'center',
    gap: 8,
    justifyContent: 'space-between',
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

export const FocusProjectOption = ({ onClick }: OnClickProp) => {
  const { projectId } = useFocusTarget()

  const { id, name, emoji } = useCurrentProject()
  const isSelected = id === projectId

  return (
    <Container onClick={onClick} isActive={isSelected}>
      <FocusProjectOptionContent emoji={emoji} name={name} />
      <ProjectBudgetTag />
    </Container>
  )
}
