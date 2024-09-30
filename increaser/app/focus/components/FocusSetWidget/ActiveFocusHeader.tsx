import { HStack } from '@lib/ui/css/stack'
import styled from 'styled-components'
import { Button } from '@lib/ui/buttons/Button'
import { PauseFocusSession } from './PauseFocusSession'
import { CropLastInterval } from './CropLastInterval'

import { FocusDurationSelector } from './FocusDurationSelector'
import { ActiveFocusTimeWithBreakdown } from './ActiveFocusTimeWithBreakdown'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { sidebarConfig } from '../../../navigation/Sidebar/config'
import { Header } from '@lib/ui/layout/Header'
import { useCancelFocus } from '../../hooks/useCancelFocus'
import { FinishFocus } from './finish/FinishFocus'

const Container = styled(Header)`
  min-height: ${toSizeUnit(sidebarConfig.headerHeight)};

  > * {
    height: 40px;
  }
`

export const ActiveFocusHeader = () => {
  const cancel = useCancelFocus()

  return (
    <Container>
      <HStack fullHeight alignItems="center" gap={12}>
        <PauseFocusSession />
        <HStack fullHeight alignItems="center">
          <ActiveFocusTimeWithBreakdown />
          <FocusDurationSelector />
        </HStack>
      </HStack>
      <HStack gap={8}>
        <CropLastInterval />
        <Button kind="outlined" onClick={cancel}>
          Cancel
        </Button>
        <FinishFocus />
      </HStack>
    </Container>
  )
}
