import { useFocus } from 'focus/hooks/useFocus'
import { useProjects } from 'projects/hooks/useProjects'
import { assertDefined } from 'shared/utils/assertDefined'
import styled from 'styled-components'
import { defaultTransitionCSS } from '@increaser/ui/ui/animations/transitions'
import { UnstyledButton } from '@increaser/ui/ui/buttons/UnstyledButton'
import { HSLA } from '@increaser/ui/ui/colors/HSLA'
import { centerContentCSS } from '@increaser/ui/ui/utils/centerContentCSS'

const Container = styled(UnstyledButton)<{ $color: HSLA }>`
  font-size: 18px;
  font-weight: 600;
  ${defaultTransitionCSS}
  ${centerContentCSS};
  width: 100%;
  height: 100%;
  border: 2px solid ${({ theme }) => theme.colors.mist.toCssValue()};
  border-radius: 20px;
  width: 120px;
  background: ${({ theme }) => theme.colors.background.toCssValue()};

  :hover {
    border-color: ${({ $color }) => $color.toCssValue()};
  }
`

interface FinishSessionProps {
  style?: React.CSSProperties
}

export const FinishSession = ({ style }: FinishSessionProps) => {
  const { currentSet, stop } = useFocus()
  const { projectsRecord } = useProjects()
  const project = projectsRecord[assertDefined(currentSet).projectId]

  return (
    <Container $color={project.hslaColor} style={style} onClick={stop}>
      Finish
    </Container>
  )
}
