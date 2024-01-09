import { getColor } from '@lib/ui/theme/getters'
import Link from 'next/link'
import styled from 'styled-components'
import { transition } from '@lib/ui/css/transition'
import { centerContent } from '@lib/ui/css/centerContent'
import { CenterAbsolutely } from '@lib/ui/layout/CenterAbsolutely'
import { interactive } from '@lib/ui/css/interactive'
import { AppPath } from '@increaser/ui/navigation/AppPath'
import { SessionProgress } from '@increaser/ui/focus/SessionProgress'
import { FocusPassedTime } from '@increaser/ui/focus/FocusPassedTime'

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
  return (
    <Wrapper>
      <Link href={AppPath.Focus}>
        <Container>
          <SessionProgress />
          <CenterAbsolutely>
            <FocusPassedTime />
          </CenterAbsolutely>
        </Container>
      </Link>
    </Wrapper>
  )
}
