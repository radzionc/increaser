import { UnstyledButton } from '@lib/ui/buttons/UnstyledButton'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { PlusIcon } from '@lib/ui/icons/PlusIcon'
import { OnClickProp } from '@lib/ui/props'
import { getColor } from '@lib/ui/theme/getters'
import styled from 'styled-components'

import { focusLauncherConfig } from '../config'
import { HeaderPromptContentFrame } from '../HeaderPromptContentFrame'

const Container = styled(UnstyledButton)`
  width: 100%;
  height: ${toSizeUnit(focusLauncherConfig.sectionMinHeight)};

  outline: none;

  color: ${getColor('textSupporting')};
  &:hover {
    color: ${getColor('textPrimary')};
  }
`

export const AddTaskPrompt = ({ onClick }: OnClickProp) => {
  return (
    <Container onClick={onClick}>
      <HeaderPromptContentFrame icon={<PlusIcon />}>
        Add a task
      </HeaderPromptContentFrame>
    </Container>
  )
}
