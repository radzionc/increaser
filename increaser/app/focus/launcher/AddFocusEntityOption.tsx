import styled from 'styled-components'
import { getColor } from '@lib/ui/theme/getters'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'

import { UnstyledButton } from '@lib/ui/buttons/UnstyledButton'
import { PlusIcon } from '@lib/ui/icons/PlusIcon'
import { ClickableComponentProps } from '@lib/ui/props'
import { hStack } from '@lib/ui/css/stack'
import { tightListItemConfig } from '@lib/ui/list/tightListItemConfig'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { panelDefaultPadding } from '@lib/ui/css/panel'
import { focusLauncherConfig } from './config'
import { HeaderPromptContentFrame } from './HeaderPromptContentFrame'

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

type AddFocusEntityOptionProps = ClickableComponentProps & {
  focusEntityName: string
}

export const AddFocusEntityOption = ({
  onClick,
  focusEntityName,
}: AddFocusEntityOptionProps) => {
  return (
    <Container onClick={onClick} type="button">
      <HeaderPromptContentFrame icon={<PlusIcon />}>
        Add {focusEntityName}
      </HeaderPromptContentFrame>
    </Container>
  )
}
