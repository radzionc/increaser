import { getColor } from '@increaser/ui/theme/getters'
import Link from 'next/link'
import { Path } from 'router/Path'
import styled from 'styled-components'
import { SlidingTime } from 'ui/SlidingTime'
import { useCurrentFocus } from './CurrentFocusProvider'
import { transition } from '@increaser/ui/css/transition'
import { useRhythmicRerender } from '@increaser/ui/hooks/useRhythmicRerender'
import { centerContent } from '@increaser/ui/css/centerContent'
import { SessionProgress } from './SessionProgress'
import { CenterAbsolutely } from '@increaser/ui/layout/CenterAbsolutely'
import { MS_IN_SEC } from '@increaser/utils/time'
import { interactive } from '@increaser/ui/css/interactive'

const Wrapper = styled.div`
  position: fixed;
  top: 8px;
  right: 8px;
`

const Container = styled.div`
  height: 160px;
  width: 100px;

  ${interactive};
  background: ${getColor('foreground')};
  font-weight: 600;
  font-size: 28px;
  ${centerContent};
  ${transition};

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
      <Link href={Path.Focus}>
        <Container>
          <SessionProgress />
          <CenterAbsolutely>
            <SlidingTime getSeconds={getSeconds} />
          </CenterAbsolutely>
        </Container>
      </Link>
    </Wrapper>
  )
}
