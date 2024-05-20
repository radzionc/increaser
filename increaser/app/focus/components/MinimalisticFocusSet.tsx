import { FocusPassedTime } from '@increaser/ui/focus/FocusPassedTime'
import { HStack } from '@lib/ui/layout/Stack'
import styled, { keyframes } from 'styled-components'
import { Text } from '@lib/ui/text'
import { useFocus } from '@increaser/ui/focus/FocusContext'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { Button } from '@lib/ui/buttons/Button'
import { useCurrentFocus } from '@increaser/ui/focus/CurrentFocusProvider'
import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { transition } from '@lib/ui/css/transition'
import { HSLA } from '@lib/ui/colors/HSLA'
import { RhytmicRerender } from '@lib/ui/base/RhytmicRerender'
import { toPercents } from '@lib/utils/toPercents'
import { convertDuration } from '@lib/utils/time/convertDuration'

const Container = styled(HStack)`
  height: 80px;
  width: 100%;
  ${borderRadius.m};
  border: 2px solid;
  overflow: hidden;
  position: relative;
`

const Content = styled(HStack)`
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  ${horizontalPadding(16)}
`

export const getFireplaceKeyframes = () => keyframes`
  0%{
    opacity: 1.0;
  }
  50%{
    opacity: 0.4;
  }
  100%{
    opacity: 1.0;
  }
`

export const Filler = styled.div<{ $color: HSLA }>`
  height: 100%;
  position: absolute;

  ${transition};

  background: linear-gradient(
    to right,
    transparent 0%,
    ${({ $color }) => $color.getVariant({ a: () => 0.4 }).toCssValue()} 100%
  );

  animation: ${getFireplaceKeyframes()} 6s ease-in-out infinite;
`

export const MinimalisticFocusSet = () => {
  const { cancel, stop, focusDuration } = useFocus()
  const currentSet = useCurrentFocus()
  const { projectsRecord } = useProjects()
  const color = projectsRecord[currentSet.projectId].hslaColor

  return (
    <Container
      style={{
        color: color.toCssValue(),
      }}
    >
      <RhytmicRerender
        render={() => (
          <Filler
            $color={color}
            style={{
              width: toPercents(
                Math.min(
                  (Date.now() - currentSet.startedAt) /
                    convertDuration(focusDuration, 'min', 'ms'),
                  1,
                ),
              ),
            }}
          />
        )}
      />
      <Content>
        <Text as="div" weight="bold" size={36} height="small">
          <FocusPassedTime />
        </Text>
        <HStack gap={8}>
          <Button size="l" kind="outlined" onClick={cancel}>
            Cancel
          </Button>
          <Button size="l" kind="reversed" onClick={stop}>
            Finish
          </Button>
        </HStack>
      </Content>
    </Container>
  )
}
