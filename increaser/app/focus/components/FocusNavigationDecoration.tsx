import styled from 'styled-components'
import { useCurrentPage } from '@increaser/app/navigation/hooks/useCurrentPage'
import React from 'react'
import { ActiveFocusTime } from './FocusSetWidget/ActiveFocusTime'
import { useFocusIntervals } from '../hooks/useFocusIntervals'

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
