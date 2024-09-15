import { FocusPassedTime } from '@increaser/ui/focus/FocusPassedTime'
import {
  HStackSeparatedBy,
  slashSeparator,
} from '@lib/ui/layout/StackSeparatedBy'
import { TitleFocusDurationSelector } from '../../../home/components/TitleFocusDurationSelector'
import { SessionIntervals } from './SessionIntervals'
import { Text } from '@lib/ui/text'
import { round } from '@lib/ui/css/round'
import { getColor } from '@lib/ui/theme/getters'
import styled from 'styled-components'

const FillerContainer = styled.div`
  height: 2px;
  width: 100%;
  bottom: -8px;
  position: absolute;
  ${round};
  background: ${getColor('mistExtra')};
  overflow: hidden;
`

export const ActiveFocusTime = () => {
  return (
    <div style={{ position: 'relative' }}>
      <HStackSeparatedBy
        style={{ position: 'relative' }}
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
      <FillerContainer>
        <SessionIntervals />
      </FillerContainer>
    </div>
  )
}
