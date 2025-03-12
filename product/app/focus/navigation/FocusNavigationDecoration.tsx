import { useCurrentPage } from '@product/app/navigation/hooks/useCurrentPage'
import { ActiveFocusTime } from '@product/ui/focus/FocusSetWidget/ActiveFocusTime'
import { useFocusIntervals } from '@product/ui/focus/state/focusIntervals'
import React from 'react'
import styled from 'styled-components'

const Position = styled.div`
  position: absolute;
  right: 8px;
`

const Container = styled(ActiveFocusTime)`
  font-size: 16px;
  height: 32px;
`

export const FocusNavigationDecoration = () => {
  const page = useCurrentPage()

  const [intervals] = useFocusIntervals()

  const isActive = page === 'focus'

  if (isActive || !intervals) return null

  return (
    <Position>
      <Container />
    </Position>
  )
}
