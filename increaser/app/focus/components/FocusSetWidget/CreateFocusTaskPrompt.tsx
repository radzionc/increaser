import { getColor } from '@lib/ui/theme/getters'

import styled from 'styled-components'
import { transition } from '@lib/ui/css/transition'
import { interactive } from '@lib/ui/css/interactive'
import { OptionContent } from '@lib/ui/select/OptionContent'
import { HStack } from '@lib/ui/layout/Stack'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { focusSetWidgetConfig } from './config'
import { PlusIcon } from '@lib/ui/icons/PlusIcon'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { Opener } from '@lib/ui/base/Opener'
import { CreateFocusTaskOverlay } from './CreateFocusTaskOverlay'
import { defaultOrder } from '@lib/utils/order/getLastItemOrder'

const IconContainer = styled(IconWrapper)`
  font-size: 16px;
  ${transition};
`

const Container = styled(HStack)`
  ${interactive};
  width: 100%;
  align-items: center;
  gap: 8px;
  ${transition};
  background: ${getColor('background')};
  padding: ${toSizeUnit(focusSetWidgetConfig.padding)};
  font-weight: 500;

  &:hover {
    background: ${getColor('foreground')};
    color: ${getColor('contrast')};
  }
`

export const CreateFocusTaskPrompt = () => {
  return (
    <Opener
      renderOpener={({ onOpen }) => (
        <Container onClick={onOpen}>
          <IconContainer>
            <PlusIcon />
          </IconContainer>
          <OptionContent>Add a task</OptionContent>
        </Container>
      )}
      renderContent={({ onClose }) => (
        <CreateFocusTaskOverlay order={defaultOrder} onFinish={onClose} />
      )}
    />
  )
}
