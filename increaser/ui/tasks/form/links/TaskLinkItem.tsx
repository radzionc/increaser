import { TaskLink } from '@increaser/entities/Task'
import { ActionInsideInteractiveElement } from '@lib/ui/base/ActionInsideInteractiveElement'
import { IconButton } from '@lib/ui/buttons/IconButton'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { hStack } from '@lib/ui/css/stack'
import { CloseIcon } from '@lib/ui/icons/CloseIcon'
import { ExternalLinkIcon } from '@lib/ui/icons/ExternalLinkIcon'
import { Spacer } from '@lib/ui/layout/Spacer'
import { ExternalLink } from '@lib/ui/navigation/Link/ExternalLink'
import { ComponentWithValueProps, RemovableComponentProps } from '@lib/ui/props'
import { Text } from '@lib/ui/text'
import { getColor } from '@lib/ui/theme/getters'
import styled from 'styled-components'

type TaskLinkProps = ComponentWithValueProps<TaskLink> & RemovableComponentProps

const Wrapper = styled(ActionInsideInteractiveElement)`
  ${hStack({
    alignItems: 'center',
    gap: 4,
  })}
`

const Container = styled(ExternalLink)`
  height: 40px;
  ${horizontalPadding(12)};
  ${borderRadius.s};
  background: ${getColor('mist')};
  color: ${getColor('contrast')};
  border: 1px solid ${getColor('mist')};
  ${hStack({
    alignItems: 'center',
    gap: 8,
  })}
  &:hover {
    background: ${getColor('mistExtra')};
  }
`

export const TaskLinkItem = ({ value, onRemove }: TaskLinkProps) => {
  return (
    <Wrapper
      action={
        <IconButton
          kind="secondary"
          onClick={onRemove}
          title="Delete link"
          icon={<CloseIcon />}
        />
      }
      actionPlacerStyles={{
        right: 4,
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
