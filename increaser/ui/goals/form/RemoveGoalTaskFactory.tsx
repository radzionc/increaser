import { IconButton } from '@lib/ui/buttons/IconButton'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { ClickableComponentProps } from '@lib/ui/props'
import styled from 'styled-components'
import { CloseIcon } from '@lib/ui/icons/CloseIcon'
import { tightListConfig } from '@lib/ui/list/tightListConfig'

const Container = styled(IconButton)`
  ${sameDimensions(
    tightListConfig.verticalPadding * 2 + tightListConfig.lineHeight,
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
