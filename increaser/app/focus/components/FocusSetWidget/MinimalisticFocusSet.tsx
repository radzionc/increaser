import { FocusPassedTime } from '@increaser/ui/focus/FocusPassedTime'
import { HStack, VStack } from '@lib/ui/css/stack'
import styled from 'styled-components'
import { Text } from '@lib/ui/text'
import { useFocus } from '@increaser/ui/focus/FocusContext'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { Button } from '@lib/ui/buttons/Button'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { getColor } from '@lib/ui/theme/getters'
import { focusSetWidgetConfig } from './config'
import { FocusAudioWidget } from '../../audio/FocusAudioWidget'
import { PauseFocusSession } from './PauseFocusSession'
import { SessionIntervals } from './SessionIntervals'
import { CropLastInterval } from './CropLastInterval'
import { FocusTaskInput } from '../../launcher/task/FocusTaskInput'

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
  flex-wrap: wrap;
  gap: 20px;
`

const FillerContainer = styled.div`
  height: 2px;
  width: 100%;
  bottom: -2px;
  position: absolute;
`
export const MinimalisticFocusSet = () => {
  const { cancel, stop } = useFocus()

  return (
    <Wrapper>
      <Container>
        <FillerContainer>
          <SessionIntervals />
        </FillerContainer>
        <Content>
          <HStack alignItems="center" gap={12}>
            <PauseFocusSession />
            <Text as="div" weight="600" size={36} height="small">
              <FocusPassedTime />
            </Text>
          </HStack>
          <HStack gap={8}>
            <CropLastInterval />
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
      <FocusTaskInput />
    </Wrapper>
  )
}
