import { IconButton } from '@lib/ui/buttons/IconButton'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { ClickableComponentProps } from '@lib/ui/props'
import styled from 'styled-components'
import { CloseIcon } from '@lib/ui/icons/CloseIcon'
import { tightListItemConfig } from '@lib/ui/list/tightListItemConfig'

const Container = styled(IconButton)`
  ${sameDimensions(
    tightListItemConfig.verticalPadding * 2 + tightListItemConfig.lineHeight,
  )}
`

export const RemoveGoalTaskFactory = ({ onClick }: ClickableComponentProps) => {
  return (
    <Container
      kind="secondary"
      icon={<CloseIcon />}
      onClick={onClick}
      title="Disconnect task from this goal"
    />
  )
}
