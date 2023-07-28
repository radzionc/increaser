import styled, { css } from 'styled-components'

import { Snackbar } from './Snackbar'
import { SnackbarPlacement } from './SnackbarPlacement'
import { zIndex } from '@increaser/ui/ui/zIndex'
import { useIsScreenWidthLessThan } from '@increaser/ui/ui/hooks/useIsScreenWidthLessThan'

const Container = styled.div<{ placement: SnackbarPlacement }>`
  z-index: ${zIndex.snackbar};
  position: fixed;

  ${({ placement }) =>
    placement === 'top'
      ? css`
          top: 0px;
          width: 100%;
        `
      : css`
          left: 50%;
          bottom: 8px;
          transform: translate(-50%, 0);
        `}
`

export const SnackbarOverlay = () => {
  const isSmallScreen = useIsScreenWidthLessThan(600)
  const placement: SnackbarPlacement = isSmallScreen ? 'top' : 'bottom'

  return (
    <Container placement={placement}>
      <Snackbar placement={placement} />
    </Container>
  )
}
