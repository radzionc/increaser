import styled from 'styled-components'
import { getColor } from '@lib/ui/theme/getters'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'

import { UnstyledButton } from '@lib/ui/buttons/UnstyledButton'
import { focusLauncherConfig } from '../config'
import { PlusIcon } from '@lib/ui/icons/PlusIcon'
import { ClickableComponentProps } from '@lib/ui/props'
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

export const AddTaskPrompt = ({ onClick }: ClickableComponentProps) => {
  return (
    <Container onClick={onClick} type="button">
      <HeaderPromptContentFrame icon={<PlusIcon />}>
        Add a task
      </HeaderPromptContentFrame>
    </Container>
  )
}
