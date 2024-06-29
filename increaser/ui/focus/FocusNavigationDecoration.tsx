import { useFocus } from './FocusContext'
import { FocusPassedTime } from './FocusPassedTime'
import styled, { useTheme } from 'styled-components'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { useCurrentPage } from '@increaser/app/navigation/hooks/useCurrentPage'
import { useAssertUserState } from '../user/UserStateContext'

const Container = styled.div`
  position: absolute;
  right: 8px;
  padding: 4px 8px;
  ${borderRadius.s};
  border: 2px solid;
`

export const FocusNavigationDecoration = () => {
  const page = useCurrentPage()

  const { currentSet } = useFocus()

  const { projects } = useAssertUserState()

  const isActive = page === 'focus'

  const theme = useTheme()

  if (isActive || !currentSet) return null

  return (
    <Container
      style={{
        color: theme.colors
          .getLabelColor(projects[currentSet.projectId].color)
          .toCssValue(),
      }}
    >
      <FocusPassedTime />
    </Container>
  )
}
