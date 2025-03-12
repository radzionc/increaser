import { UnstyledButton } from '@lib/ui/buttons/UnstyledButton'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { panelDefaultPadding } from '@lib/ui/css/panel'
import { hStack } from '@lib/ui/css/stack'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { PlusIcon } from '@lib/ui/icons/PlusIcon'
import { tightListItemConfig } from '@lib/ui/list/tightListItemConfig'
import { OnClickProp } from '@lib/ui/props'
import { getColor } from '@lib/ui/theme/getters'
import styled from 'styled-components'

import { focusLauncherConfig } from '../config'
import { HeaderPromptContentFrame } from '../HeaderPromptContentFrame'

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

type AddFocusEntityOptionProps = OnClickProp & {
  focusEntityName: string
}

export const AddFocusEntityOption = ({
  onClick,
  focusEntityName,
}: AddFocusEntityOptionProps) => {
  return (
    <Container onClick={onClick}>
      <HeaderPromptContentFrame icon={<PlusIcon />}>
        Add {focusEntityName}
      </HeaderPromptContentFrame>
    </Container>
  )
}
