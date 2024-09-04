import styled from 'styled-components'
import { getColor } from '@lib/ui/theme/getters'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'

import { UnstyledButton } from '@lib/ui/buttons/UnstyledButton'
import { focusLauncherConfig } from '../config'
import { PlusIcon } from '@lib/ui/icons/PlusIcon'
import { ClickableComponentProps } from '@lib/ui/props'
import { HeaderPromptContentFrame } from '../HeaderPromptContentFrame'
import { hStack } from '@lib/ui/css/stack'
import { tightListItemConfig } from '@lib/ui/list/tightListItemConfig'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { panelDefaultPadding } from '@lib/ui/css/panel'

const Container = styled(UnstyledButton)`
  ${hStack({
    fullWidth: true,
    alignItems: 'center',
  })}

  line-height: ${toSizeUnit(tightListItemConfig.lineHeight)};

  ${horizontalPadding(panelDefaultPadding)};
  height: ${toSizeUnit(focusLauncherConfig.optionMinHeight)};

  outline: none;

  color: ${getColor('textSupporting')};

  &:hover {
    background: ${getColor('mist')};
    color: ${getColor('textPrimary')};
  }
`

export const AddTaskOption = ({ onClick }: ClickableComponentProps) => {
  return (
    <Container onClick={onClick} type="button">
      <HeaderPromptContentFrame icon={<PlusIcon />}>
        Add a task
      </HeaderPromptContentFrame>
    </Container>
  )
}
