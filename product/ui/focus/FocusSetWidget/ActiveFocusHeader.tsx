import { Button } from '@lib/ui/buttons/Button'
import { HStack } from '@lib/ui/css/stack'
import { Header } from '@lib/ui/layout/Header'
import styled from 'styled-components'

import { useCancelFocus } from '../hooks/useCancelFocus'

import { ActiveFocusTimeWithBreakdown } from './ActiveFocusTimeWithBreakdown'
import { CropLastInterval } from './CropLastInterval'
import { FinishFocus } from './finish/FinishFocus'
import { FocusDurationSelector } from './FocusDurationSelector'
import { PauseFocusSession } from './PauseFocusSession'

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
