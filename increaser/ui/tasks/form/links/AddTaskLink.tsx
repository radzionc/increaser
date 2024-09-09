import styled from 'styled-components'
import { LinkIcon } from '@lib/ui/icons/LinkIcon'
import { ExpandableSelectorContainer } from '@lib/ui/select/ExpandableSelectorContainer'
import { ValueFinishProps } from '@lib/ui/props'
import { TaskLink } from '@increaser/entities/Task'
import { Opener } from '@lib/ui/base/Opener'
import { AddTaskOverlay } from './AddTaskOverlay'

const Container = styled(ExpandableSelectorContainer)``

export const AddTaskLink = ({ onFinish }: ValueFinishProps<TaskLink>) => {
  return (
    <Opener
      renderOpener={({ onOpen }) => (
        <Container onClick={onOpen}>
          <LinkIcon />
        </Container>
      )}
      renderContent={({ onClose }) => (
        <AddTaskOverlay
          onFinish={(value) => {
            if (value) {
              onFinish(value)
            }
            onClose()
          }}
        />
      )}
    />
  )
}
