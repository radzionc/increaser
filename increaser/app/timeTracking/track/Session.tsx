import { transition } from '@lib/ui/css/transition'
import { ComponentWithValueProps, UIComponentProps } from '@lib/ui/props'
import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { getProjectColor } from '@increaser/ui/projects/utils/getProjectColor'
import styled, { css, useTheme } from 'styled-components'
import { Set } from '@increaser/entities/User'
import { HSLA } from '@lib/ui/colors/HSLA'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { LinesFiller } from '@lib/ui/visual/LinesFiller'

const Container = styled.div<{ isInteractive: boolean; $color: HSLA }>`
  position: absolute;
  overflow: hidden;
  width: 100%;

  ${borderRadius.xs};
  ${transition};

  color: ${({ $color }) => $color.getVariant({ a: () => 0.4 }).toCssValue()};
  background: ${({ $color }) =>
    $color.getVariant({ a: () => 0.1 }).toCssValue()};

  border: 2px solid
    ${({ $color }) => $color.getVariant({ a: () => 0.6 }).toCssValue()};

  ${({ isInteractive, $color }) =>
    isInteractive &&
    css`
      cursor: pointer;
      &:hover {
        border-color: ${$color.toCssValue()};
        color: ${$color.toCssValue()};
      }
    `}
`

type SessionProps = ComponentWithValueProps<Set> &
  UIComponentProps & {
    index: number
    onSelect?: () => void
  }

export const Session = ({ value, index, onSelect, ...rest }: SessionProps) => {
  const { projectsRecord } = useProjects()

  const theme = useTheme()

  const color = getProjectColor(projectsRecord, theme, value.projectId)

  return (
    <Container
      onClick={onSelect}
      isInteractive={!!onSelect}
      $color={color}
      {...rest}
    >
      <LinesFiller density={0.28} rotation={45 * (index % 2 === 0 ? 1 : -1)} />
    </Container>
  )
}
