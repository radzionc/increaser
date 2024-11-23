import { HStack } from '@lib/ui/css/stack'
import styled from 'styled-components'
import { Button } from '@lib/ui/buttons/Button'
import { PauseFocusSession } from './PauseFocusSession'
import { CropLastInterval } from './CropLastInterval'

import { FocusDurationSelector } from './FocusDurationSelector'
import { ActiveFocusTimeWithBreakdown } from './ActiveFocusTimeWithBreakdown'
import { Header } from '@lib/ui/layout/Header'
import { FinishFocus } from './finish/FinishFocus'
import { useCancelFocus } from '../hooks/useCancelFocus'

const Container = styled(Header)`
  min-height: 56px;

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
