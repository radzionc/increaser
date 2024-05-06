import { transition } from '@lib/ui/css/transition'
import { ComponentWithValueProps, UIComponentProps } from '@lib/ui/props'
import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { getProjectColor } from '@increaser/ui/projects/utils/getProjectColor'
import styled, { css, useTheme } from 'styled-components'
import { Set } from '@increaser/entities/User'
import { LinesFiller } from './LinesFiller'
import { HSLA } from '@lib/ui/colors/HSLA'
import { useTrackTime } from './TrackTimeProvider'

const Container = styled.div<{ isInteractive: boolean; $color: HSLA }>`
  border-radius: 2px;
  overflow: hidden;
  position: absolute;
  width: 100%;
  ${transition};

  color: ${({ $color }) => $color.getVariant({ a: () => 0.4 }).toCssValue()};
  background: ${({ $color }) =>
    $color.getVariant({ a: () => 0.1 }).toCssValue()};

  border: 2px solid;

  ${({ isInteractive, $color }) =>
    isInteractive &&
    css`
      cursor: pointer;
      &:hover {
        color: ${$color.toCssValue()};
      }
    `}
`

type SessionProps = ComponentWithValueProps<Set> &
  UIComponentProps & {
    index: number
  }

export const Session = ({ value, index, ...rest }: SessionProps) => {
  const { setState, currentSet } = useTrackTime()
  const { projectsRecord } = useProjects()

  const theme = useTheme()

  const color = getProjectColor(projectsRecord, theme, value.projectId)

  if (currentSet?.index === index) {
    return null
  }

  return (
    <Container
      onClick={
        !currentSet
          ? () => {
              setState((state) => ({
                ...state,
                currentSet: {
                  ...value,
                  index,
                },
              }))
            }
          : undefined
      }
      isInteractive={!currentSet}
      $color={color}
      {...rest}
    >
      <LinesFiller rotation={index % 2 === 0 ? 45 : -45} />
    </Container>
  )
}
