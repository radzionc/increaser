import { Opener } from '@lib/ui/base/Opener'
import { UnstyledButton } from '@lib/ui/buttons/UnstyledButton'
import { withSecondaryAction } from '@lib/ui/buttons/WithSecondaryAction'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { ChevronDownIcon } from '@lib/ui/icons/ChevronDownIcon'
import { getHoverVariant } from '@lib/ui/theme/getHoverVariant'
import { getColor } from '@lib/ui/theme/getters'
import { Tooltip } from '@lib/ui/tooltips/Tooltip'
import styled from 'styled-components'

import { useStopFocus } from '../../hooks/useStopFocus'

import { editAndFinishTitle } from './config'
import { FinishFocusOverlay } from './FinishFocusOverlay'
import { CurrentFocusEndTimeProvider } from './state/CurrentFocusEndTime'

const Container = styled.div`
  ${withSecondaryAction({
    height: 40,
  })}
  ${borderRadius.s};
  border-width: 0px;
  gap: 1px;
  background: ${({ theme }) =>
    theme.colors.primary.getVariant({ l: () => 64 }).toCssValue()};

  > * {
    background: ${getColor('primary')};
    color: ${getColor('contrast')};

    &:first-child {
      ${horizontalPadding(20)};
      font-weight: 600;
    }

    &:last-child {
      width: 32px;
      font-size: 14px;
    }

    &:hover {
      background: ${getHoverVariant('primary')};
    }
  }
`

export const FinishFocus = () => {
  const stop = useStopFocus()

  return (
    <Opener
      renderOpener={({ onOpen }) => (
        <Tooltip
          content={editAndFinishTitle}
          renderOpener={(props) => (
            <Container>
              <UnstyledButton onClick={() => stop()}>Finish</UnstyledButton>
              <UnstyledButton onClick={onOpen} {...props}>
                <ChevronDownIcon />
              </UnstyledButton>
            </Container>
          )}
        />
      )}
      renderContent={({ onClose }) => (
        <CurrentFocusEndTimeProvider>
          <FinishFocusOverlay onClose={onClose} />
        </CurrentFocusEndTimeProvider>
      )}
    />
  )
}
