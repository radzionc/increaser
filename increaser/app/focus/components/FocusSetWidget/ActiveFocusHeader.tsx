import { HStack } from '@lib/ui/css/stack'
import styled from 'styled-components'
import { useFocus } from '@increaser/ui/focus/FocusContext'
import { Button } from '@lib/ui/buttons/Button'
import { PauseFocusSession } from './PauseFocusSession'
import { CropLastInterval } from './CropLastInterval'

import { PageHeader } from '../../../ui/page/header/PageHeader'
import { ActiveFocusTime } from './ActiveFocusTime'

const Container = styled(HStack)`
  width: 100%;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
`

export const ActiveFocusHeader = () => {
  const { cancel, stop } = useFocus()

  return (
    <PageHeader>
      <Container>
        <HStack alignItems="center" gap={12}>
          <PauseFocusSession />
          <ActiveFocusTime />
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
