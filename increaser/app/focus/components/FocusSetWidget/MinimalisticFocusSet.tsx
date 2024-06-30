import { FocusPassedTime } from '@increaser/ui/focus/FocusPassedTime'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import styled, { keyframes } from 'styled-components'
import { Text } from '@lib/ui/text'
import { useFocus } from '@increaser/ui/focus/FocusContext'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { Button } from '@lib/ui/buttons/Button'
import { useCurrentFocus } from '@increaser/ui/focus/CurrentFocusProvider'
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

const FillerContainer = styled.div`
  height: 2px;
  width: 100%;
  bottom: -2px;
  position: absolute;
`

export const Filler = styled.div`
  height: 100%;
  background: ${getColor('primary')};
`

export const MinimalisticFocusSet = () => {
  const { cancel, stop, focusDuration } = useFocus()
  const { startedAt } = useCurrentFocus()

  return (
    <Wrapper>
      <Container>
        <FillerContainer>
          <RhytmicRerender
            render={() => (
              <Filler
                style={{
                  width: toPercents(
                    Math.min(
                      (Date.now() - startedAt) /
                        convertDuration(focusDuration, 'min', 'ms'),
                      1,
                    ),
                  ),
                }}
              />
            )}
          />
        </FillerContainer>
        <Content>
          <Text as="div" weight="bold" size={36} height="small">
            <FocusPassedTime />
          </Text>
          <HStack gap={8}>
            <Button size="l" type="button" kind="outlined" onClick={cancel}>
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
