import { MS_IN_MIN, MS_IN_SEC } from '@increaser/ui/shared/utils/time'
import { CenterAbsolutely } from '@increaser/ui/ui/CenterAbsolutely'
import { getColor } from '@increaser/ui/ui/theme/getters'
import { interactiveCSS } from '@increaser/ui/ui/utils/interactiveCSS'
import Link from 'next/link'
import { Path } from 'router/Path'
import styled from 'styled-components'
import { SlidingTime } from 'ui/SlidingTime'
import { useCurrentFocus } from './CurrentFocusProvider'
import { HSLA } from '@increaser/ui/ui/colors/HSLA'
import { useProjects } from 'projects/hooks/useProjects'
import { defaultTransitionCSS } from '@increaser/ui/ui/animations/transitions'
import { toPercents } from '@increaser/ui/shared/utils/toPercents'
import { useRhythmicRerender } from 'shared/hooks/useRhythmicRerender'
import { useFocus } from 'focus/hooks/useFocus'

const Container = styled.div<{ $color: HSLA }>`
  width: 100%;
  height: 40px;
  ${interactiveCSS};
  background: ${getColor('foreground')};
  position: relative;
  font-weight: 600;
  font-size: 20px;
  border: 1px solid ${getColor('background')};
`
// TODO: reuse with FillingBlock
const Filler = styled.div<{ $color: HSLA }>`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  ${defaultTransitionCSS};
  background: ${({ $color }) => $color.toCssValue()};
`

export const FocusNavigationSlice = () => {
  const { startedAt, projectId } = useCurrentFocus()

  const { projectsRecord } = useProjects()
  const color = projectsRecord[projectId].hslaColor

  const now = useRhythmicRerender()

  const { focusDuration } = useFocus()

  const msPassed = now - startedAt

  const getSeconds = () => (now - startedAt) / MS_IN_SEC

  return (
    <Link href={Path.Focus}>
      <Container $color={color}>
        <Filler
          $color={color}
          style={{
            width: toPercents(
              Math.min(msPassed / (focusDuration * MS_IN_MIN), 1),
            ),
          }}
        />
        <CenterAbsolutely>
          <SlidingTime getSeconds={getSeconds} />
        </CenterAbsolutely>
      </Container>
    </Link>
  )
}
