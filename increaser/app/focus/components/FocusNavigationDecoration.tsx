import styled, { useTheme } from 'styled-components'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { useCurrentPage } from '@increaser/app/navigation/hooks/useCurrentPage'
import React from 'react'
import { useFocus } from '@increaser/ui/focus/FocusContext'
import { FocusPassedTime } from '@increaser/ui/focus/FocusPassedTime'
import { useFocusTargetProject } from '../hooks/useFocusTargetProject'

const Container = styled.div`
  position: absolute;
  right: 8px;
  padding: 4px 8px;
  ${borderRadius.s};
  border: 2px solid;
`

export const FocusNavigationDecoration = () => {
  const page = useCurrentPage()

  const { intervals } = useFocus()

  const isActive = page === 'focus'

  const { colors } = useTheme()

  const project = useFocusTargetProject()

  if (isActive || !intervals) return null

  return (
    <Container
      style={{
        color: (project
          ? colors.getLabelColor(project.color)
          : colors.mistExtra
        ).toCssValue(),
      }}
    >
      <FocusPassedTime />
    </Container>
  )
}
