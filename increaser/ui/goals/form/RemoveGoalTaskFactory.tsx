import { IconButton } from '@lib/ui/buttons/IconButton'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { ClickableComponentProps } from '@lib/ui/props'
import styled from 'styled-components'
import { taskFactoryConfig } from '../../taskFactories/config'
import { CloseIcon } from '@lib/ui/icons/CloseIcon'

const Container = styled(IconButton)`
  ${sameDimensions(
    taskFactoryConfig.verticalPadding * 2 + taskFactoryConfig.contentMinHeight,
  )}
`

export const RemoveGoalTaskFactory = ({ onClick }: ClickableComponentProps) => {
  return (
    <Container
      icon={<CloseIcon />}
      onClick={onClick}
      title="Disconnect task from this goal"
    />
  )
}
