import styled, { css, keyframes } from 'styled-components'

import { SnackbarPlacement } from './SnackbarPlacement'
import { useSnackbar } from './useSnackbar'
import { getCSSUnit } from '@increaser/ui/ui/utils/getCSSUnit'
import { defaultTransition } from '@increaser/ui/ui/animations/transitions'
import { Text } from '@increaser/ui/ui/Text'
import { ProgressLine } from 'ui/ProgressLine'

const getVerticalMoveAnimation = (offset: number | string) => {
  const animation = keyframes`
    0% {
      opacity: 0;
      transform: translateY(${getCSSUnit(offset)});
    }

    100% {
      opacity: 1;
      transform: translateY(0);
    }
  `

  return css`
    animation: ${animation} ${defaultTransition};
    animation-fill-mode: both;
  `
}

const Container = styled.div<{ placement: SnackbarPlacement }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  border-radius: 8px;
  background: ${({ theme }) => theme.colors.background.toCssValue()};
  box-shadow: ${({ theme }) => theme.shadows.medium};

  ${({ placement }) =>
    placement === 'top'
      ? css`
          width: 100%;
          border-radius: 0 0 8px 8px;
          ${getVerticalMoveAnimation(-40)}
        `
      : css`
          min-width: 400px;
          white-space: nowrap;
          ${getVerticalMoveAnimation(48)}
        `}
`

const TextWrapper = styled.div`
  margin: 8px 20px;
`

interface Props {
  placement: SnackbarPlacement
}

export const Snackbar = ({ placement }: Props) => {
  const { currentSnackbar } = useSnackbar()

  if (!currentSnackbar) return null

  return (
    <Container placement={placement}>
      <TextWrapper>
        <Text>{currentSnackbar.text}</Text>
      </TextWrapper>
      <ProgressLine
        startedAt={currentSnackbar.showedAt}
        duration={currentSnackbar.duration}
      />
    </Container>
  )
}
