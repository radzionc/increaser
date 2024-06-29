import { FocusPassedTime } from '@increaser/ui/focus/FocusPassedTime'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import styled, { keyframes } from 'styled-components'
import { Text } from '@lib/ui/text'
import { useFocus } from '@increaser/ui/focus/FocusContext'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { Button } from '@lib/ui/buttons/Button'
import { useCurrentFocus } from '@increaser/ui/focus/CurrentFocusProvider'
import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { transition } from '@lib/ui/css/transition'
import { RhytmicRerender } from '@lib/ui/base/RhytmicRerender'
import { toPercents } from '@lib/utils/toPercents'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { getColor } from '@lib/ui/theme/getters'
import { CurrentFocusTask } from './CurrentFocusTask'
import { focusSetWidgetConfig } from './config'
import { FocusAudioWidget } from '../../audio/FocusAudioWidget'

const Wrapper = styled(VStack)`
  width: 100%;
  ${borderRadius.m};
  border: 2px solid ${getColor('mist')};
  overflow: hidden;
  gap: 2px;
  background: ${getColor('mist')};
`

const Container = styled(HStack)`
  width: 100%;
  position: relative;
  background: ${getColor('background')};
`

const Content = styled(HStack)`
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: ${toSizeUnit(focusSetWidgetConfig.padding)};
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

export const Filler = styled.div`
  height: 4px;
  bottom: 0;
  position: absolute;

  ${transition};

  background: ${getColor('primary')};
`

export const MinimalisticFocusSet = () => {
  const { cancel, stop, focusDuration } = useFocus()
  const currentSet = useCurrentFocus()
  const { projectsRecord } = useProjects()
  const color = projectsRecord[currentSet.projectId].hslaColor

  return (
    <Wrapper>
      <Container
        style={{
          color: color.toCssValue(),
        }}
      >
        <RhytmicRerender
          render={() => (
            <Filler
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
            <Button size="l" kind="primary" onClick={stop}>
              Finish
            </Button>
          </HStack>
        </Content>
      </Container>
      <FocusAudioWidget />
      <CurrentFocusTask />
    </Wrapper>
  )
}
