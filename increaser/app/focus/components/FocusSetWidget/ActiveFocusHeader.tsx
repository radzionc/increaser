import { FocusPassedTime } from '@increaser/ui/focus/FocusPassedTime'
import { HStack } from '@lib/ui/css/stack'
import styled from 'styled-components'
import { Text } from '@lib/ui/text'
import { useFocus } from '@increaser/ui/focus/FocusContext'
import { Button } from '@lib/ui/buttons/Button'
import { PauseFocusSession } from './PauseFocusSession'
import { CropLastInterval } from './CropLastInterval'
import {
  HStackSeparatedBy,
  slashSeparator,
} from '@lib/ui/layout/StackSeparatedBy'
import { TitleFocusDurationSelector } from '../../../home/components/TitleFocusDurationSelector'
import { PageHeader } from '../../../ui/page/header/PageHeader'
import { SessionIntervals } from './SessionIntervals'
import { round } from '@lib/ui/css/round'
import { getColor } from '@lib/ui/theme/getters'

const Container = styled(HStack)`
  width: 100%;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
`

const FillerContainer = styled.div`
  height: 2px;
  width: 100%;
  bottom: 0;
  position: absolute;
  ${round};
  background: ${getColor('mist')};
  overflow: hidden;
`

export const ActiveFocusHeader = () => {
  const { cancel, stop } = useFocus()

  return (
    <PageHeader>
      <Container>
        <HStack alignItems="center" gap={12}>
          <PauseFocusSession />
          <HStackSeparatedBy
            separator={
              <Text color="shy" as="span">
                {slashSeparator}
              </Text>
            }
            gap={12}
          >
            <Text as="div" weight="600" size={32} height="small">
              <FocusPassedTime />
            </Text>
            <TitleFocusDurationSelector />
          </HStackSeparatedBy>
        </HStack>
        <HStack gap={8}>
          <CropLastInterval />
          <Button type="button" kind="outlined" onClick={cancel}>
            Cancel
          </Button>
          <Button kind="primary" onClick={stop}>
            Finish
          </Button>
        </HStack>
      </Container>
      <FillerContainer>
        <SessionIntervals />
      </FillerContainer>
    </PageHeader>
  )
}
