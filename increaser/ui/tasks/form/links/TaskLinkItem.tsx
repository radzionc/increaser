import { TaskLink } from '@increaser/entities/Task'
import { ActionInsideInteractiveElement } from '@lib/ui/base/ActionInsideInteractiveElement'
import { IconButton } from '@lib/ui/buttons/IconButton'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { interactive } from '@lib/ui/css/interactive'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { hStack } from '@lib/ui/css/stack'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { CloseIcon } from '@lib/ui/icons/CloseIcon'
import { ExternalLinkIcon } from '@lib/ui/icons/ExternalLinkIcon'
import { Spacer } from '@lib/ui/layout/Spacer'
import { ExternalLink } from '@lib/ui/navigation/Link/ExternalLink'
import { ComponentWithValueProps, RemovableComponentProps } from '@lib/ui/props'
import { Text } from '@lib/ui/text'
import { getHoverVariant } from '@lib/ui/theme/getHoverVariant'
import { getColor } from '@lib/ui/theme/getters'
import styled from 'styled-components'

type TaskLinkProps = ComponentWithValueProps<TaskLink> & RemovableComponentProps

const Wrapper = styled(ActionInsideInteractiveElement)`
  ${interactive};
  ${hStack({
    alignItems: 'center',
    gap: 4,
  })}
`

const height = 36

const closeButtonPadding = 2

const Container = styled(ExternalLink)`
  height: ${toSizeUnit(height)};
  padding-left: 12px;
  padding-right: ${toSizeUnit(closeButtonPadding)};
  ${borderRadius.s};
  background: ${getColor('foreground')};
  border: 1px solid ${getColor('mist')};
  ${hStack({
    alignItems: 'center',
    gap: 8,
  })}
  &:hover {
    background: ${getHoverVariant('foreground')};
    color: ${getColor('contrast')};
  }
`

const CloseButton = styled(IconButton)`
  ${sameDimensions(height - closeButtonPadding * 2)};
`

export const TaskLinkItem = ({ value, onRemove }: TaskLinkProps) => {
  return (
    <Wrapper
      action={
        <CloseButton
          kind="secondary"
          onClick={onRemove}
          title="Delete link"
          icon={<CloseIcon />}
        />
      }
      actionPlacerStyles={{
        right: closeButtonPadding,
      }}
      render={({ actionSize }) => (
        <Container to={value.url}>
          <Text centerVertically style={{ gap: 8 }}>
            <ExternalLinkIcon />
            {value.name}
          </Text>
          <Spacer {...actionSize} />
        </Container>
      )}
    />
  )
}
