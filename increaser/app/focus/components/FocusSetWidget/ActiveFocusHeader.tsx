import { HStack } from '@lib/ui/css/stack'
import styled from 'styled-components'
import { useFocus } from '@increaser/ui/focus/FocusContext'
import { Button } from '@lib/ui/buttons/Button'
import { PauseFocusSession } from './PauseFocusSession'
import { CropLastInterval } from './CropLastInterval'

import { FocusDurationSelector } from './FocusDurationSelector'
import { ActiveFocusTimeWithBreakdown } from './ActiveFocusTimeWithBreakdown'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { sidebarConfig } from '../../../navigation/Sidebar/config'
import { Header } from '@lib/ui/layout/Header'

const Container = styled(Header)`
  min-height: ${toSizeUnit(sidebarConfig.headerHeight)};

  > * {
    height: 40px;
  }
`

export const ActiveFocusHeader = () => {
  const { cancel, stop } = useFocus()

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
        <Button type="submit" kind="primary" onClick={stop}>
          Finish
        </Button>
      </HStack>
    </Container>
  )
}
