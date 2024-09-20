import { HStack } from '@lib/ui/css/stack'
import styled from 'styled-components'
import { useFocus } from '@increaser/ui/focus/FocusContext'
import { Button } from '@lib/ui/buttons/Button'
import { PauseFocusSession } from './PauseFocusSession'
import { CropLastInterval } from './CropLastInterval'

import { PageHeader } from '../../../ui/page/header/PageHeader'
import { FocusDurationSelector } from './FocusDurationSelector'
import { ActiveFocusTimeWithBreakdown } from './ActiveFocusTimeWithBreakdown'

const Container = styled(HStack)`
  width: 100%;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
  height: 40px;
`

export const ActiveFocusHeader = () => {
  const { cancel, stop } = useFocus()

  return (
    <PageHeader>
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
    </PageHeader>
  )
}
