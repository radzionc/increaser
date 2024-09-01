import { UnstyledButton } from '@lib/ui/buttons/UnstyledButton'
import { absoluteOutline } from '@lib/ui/css/absoluteOutline'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { cropText } from '@lib/ui/css/cropText'
import { interactive } from '@lib/ui/css/interactive'
import { TakeWholeSpace } from '@lib/ui/css/takeWholeSpace'
import {
  ClickableComponentProps,
  ComponentWithActiveState,
} from '@lib/ui/props'
import { getColor } from '@lib/ui/theme/getters'
import styled, { css } from 'styled-components'
import { useFocusLauncher } from '../state/useFocusLauncher'
import { useCurrentProject } from '@increaser/ui/projects/CurrentProjectProvider'
import { Text } from '@lib/ui/text'

const Outline = styled(TakeWholeSpace)<ComponentWithActiveState>`
  ${absoluteOutline(8, 0)};
  ${borderRadius.s};
  pointer-events: none;

  ${({ isActive }) =>
    isActive &&
    css`
      background: ${getColor('mist')};
      border: 2px solid ${getColor('mistExtra')};
    `};
`

const Container = styled(UnstyledButton)<ComponentWithActiveState>`
  ${interactive};
  position: relative;
  ${cropText};
  overflow: visible;

  display: flex;
  align-items: center;
  gap: 8px;

  ${({ isActive }) =>
    !isActive
      ? css`
          &:hover ${Outline} {
            background: ${getColor('mist')};
          }
        `
      : css`
          color: ${getColor('contrast')};
        `}
`

export const FocusProjectOption = ({ onClick }: ClickableComponentProps) => {
  const [{ projectId }] = useFocusLauncher()

  const { id, name, emoji } = useCurrentProject()
  const isSelected = id === projectId

  return (
    <Container onClick={onClick} isActive={isSelected}>
      <Outline isActive={isSelected} />
      <Text color="contrast">{emoji}</Text>
      <Text cropped>{name}</Text>
    </Container>
  )
}
