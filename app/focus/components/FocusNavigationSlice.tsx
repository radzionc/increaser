import { getColor } from '@increaser/ui/ui/theme/getters'
import { interactiveCSS } from '@increaser/ui/ui/utils/interactiveCSS'
import Link from 'next/link'
import { Path } from 'router/Path'
import styled from 'styled-components'
import { SlidingTime } from 'ui/SlidingTime'
import { useCurrentFocus } from './CurrentFocusProvider'
import { defaultTransitionCSS } from '@increaser/ui/ui/animations/transitions'
import { useRhythmicRerender } from '@increaser/ui/hooks/useRhythmicRerender'
import { centerContentCSS } from '@increaser/ui/ui/utils/centerContentCSS'
import { SessionProgress } from './SessionProgress'
import { CenterAbsolutely } from '@increaser/ui/ui/CenterAbsolutely'
import { MS_IN_SEC } from '@increaser/utils/time'

const Wrapper = styled.div`
  position: fixed;
  top: 8px;
  right: 8px;
`

const Container = styled(Link)`
  height: 160px;
  width: 100px;

  ${interactiveCSS};
  background: ${getColor('foreground')};
  font-weight: 600;
  font-size: 28px;
  ${centerContentCSS};
  ${defaultTransitionCSS};

  :hover {
    transform: scale(1.05);
  }
`

export const FocusNavigationSlice = () => {
  const { startedAt } = useCurrentFocus()

  const now = useRhythmicRerender()

  const getSeconds = () => (now - startedAt) / MS_IN_SEC

  return (
    <Wrapper>
      <Container href={Path.Focus}>
        <SessionProgress />
        <CenterAbsolutely>
          <SlidingTime getSeconds={getSeconds} />
        </CenterAbsolutely>
      </Container>
    </Wrapper>
  )
}
