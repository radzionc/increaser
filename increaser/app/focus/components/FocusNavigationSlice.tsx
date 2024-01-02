import { getColor } from '@lib/ui/theme/getters'
import Link from 'next/link'
import styled from 'styled-components'
import { SlidingTime } from '@increaser/app/ui/SlidingTime'
import { useCurrentFocus } from './CurrentFocusProvider'
import { transition } from '@lib/ui/css/transition'
import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'
import { centerContent } from '@lib/ui/css/centerContent'
import { SessionProgress } from './SessionProgress'
import { CenterAbsolutely } from '@lib/ui/layout/CenterAbsolutely'
import { MS_IN_SEC } from '@lib/utils/time'
import { interactive } from '@lib/ui/css/interactive'
import { AppPath } from '@increaser/ui/navigation/AppPath'

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

  &:hover {
    transform: scale(1.05);
  }
`

export const FocusNavigationSlice = () => {
  const { startedAt } = useCurrentFocus()

  const now = useRhythmicRerender()

  const getSeconds = () => (now - startedAt) / MS_IN_SEC

  return (
    <Wrapper>
      <Link href={AppPath.Focus}>
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
