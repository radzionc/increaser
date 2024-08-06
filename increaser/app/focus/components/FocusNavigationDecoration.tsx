import styled, { useTheme } from 'styled-components'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { useCurrentPage } from '@increaser/app/navigation/hooks/useCurrentPage'
import { getLastItem } from '@lib/utils/array/getLastItem'
import React from 'react'
import { useFocus } from '@increaser/ui/focus/FocusContext'
import { FocusPassedTime } from '@increaser/ui/focus/FocusPassedTime'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'

const Container = styled.div`
  position: absolute;
  right: 8px;
  padding: 4px 8px;
  ${borderRadius.s};
  border: 2px solid;
`

export const FocusNavigationDecoration = () => {
  const page = useCurrentPage()

  const { session } = useFocus()

  const { projects } = useAssertUserState()

  const isActive = page === 'focus'

  const theme = useTheme()

  if (isActive || !session) return null

  const { projectId } = getLastItem(session.intervals)

  return (
    <Container
      style={{
        color: theme.colors
          .getLabelColor(projects[projectId].color)
          .toCssValue(),
      }}
    >
      <FocusPassedTime />
    </Container>
  )
}
