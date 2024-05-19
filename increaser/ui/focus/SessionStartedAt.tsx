import { Opener } from '@lib/ui/base/Opener'

import { UpdateSetStartTimeOverlay } from './UpdateSetStartTimeOverlay'
import { shouldBeDefined } from '@lib/utils/assert/shouldBeDefined'
import { PlayIcon } from '@lib/ui/icons/PlayIcon'
import { useFocus } from '@increaser/ui/focus/FocusContext'
import styled from 'styled-components'
import { SelectContainer } from '@lib/ui/select/SelectContainer'
import { interactive } from '@lib/ui/css/interactive'
import { getHoverVariant } from '@lib/ui/theme/getHoverVariant'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { HStack } from '@lib/ui/layout/Stack'
import { getColor } from '@lib/ui/theme/getters'
import { Text } from '@lib/ui/text'
import { formatTime } from '@lib/utils/time/formatTime'

const Container = styled(SelectContainer)`
  ${interactive};

  &:hover {
    background: ${getHoverVariant('foreground')};
  }
`

const IconContainer = styled(IconWrapper)`
  color: ${getColor('textShy')};
`

export const SessionStartedAt = () => {
  const { currentSet: optionalCurrentSet, updateStartTime } = useFocus()
  const { startedAt } = shouldBeDefined(optionalCurrentSet)

  return (
    <Opener
      renderOpener={({ onOpen }) => (
        <Container onClick={onOpen}>
          <HStack gap={8} alignItems="center">
            <IconContainer>
              <PlayIcon />
            </IconContainer>
            <Text>{formatTime(startedAt)}</Text>
          </HStack>
        </Container>
      )}
      renderContent={({ onClose }) => (
        <UpdateSetStartTimeOverlay
          onClose={onClose}
          onSubmit={(value) => {
            updateStartTime(value)
            onClose()
          }}
        />
      )}
    />
  )
}
