import { withSecondaryAction } from '@lib/ui/buttons/WithSecondaryAction'
import { useStopFocus } from '../../../hooks/useStopFocus'
import { UnstyledButton } from '@lib/ui/buttons/UnstyledButton'
import styled from 'styled-components'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { getColor } from '@lib/ui/theme/getters'
import { getHoverVariant } from '@lib/ui/theme/getHoverVariant'
import { ChevronDownIcon } from '@lib/ui/icons/ChevronDownIcon'
import { Tooltip } from '@lib/ui/tooltips/Tooltip'
import { Opener } from '@lib/ui/base/Opener'
import { FinishFocusOverlay } from './FinishFocusOverlay'
import { CurrentFocusEndTimeProvider } from './state/CurrentFocusEndTime'
import { editAndFinishTitle } from './config'

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
