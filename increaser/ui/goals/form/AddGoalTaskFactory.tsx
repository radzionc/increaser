import { Opener } from '@lib/ui/base/Opener'
import { CreateTaskFactoryForm } from '../../taskFactories/form/CreateTaskFactoryForm'
import { PanelModal } from '@lib/ui/modal/PanelModal'
import { ComponentWithOptionsProps, ValueFinishProps } from '@lib/ui/props'
import styled from 'styled-components'
import { hStack } from '@lib/ui/css/stack'
import { PlusIcon } from '@lib/ui/icons/PlusIcon'
import { UnstyledButton } from '@lib/ui/buttons/UnstyledButton'
import { withSecondaryAction } from '@lib/ui/buttons/WithSecondaryAction'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { SelectGoalTaskFactory } from './SelectGoalTaskFactory'

const Container = styled(UnstyledButton)`
  ${hStack({
    alignItems: 'center',
    gap: 8,
  })}
`

const Wrapper = styled.div`
  ${withSecondaryAction({ height: 40 })};
  ${borderRadius.s};
`

export const AddGoalTaskFactory = ({
  onFinish,
  options,
}: ValueFinishProps<string> & ComponentWithOptionsProps<string>) => {
  return (
    <Wrapper>
      <Opener
        renderOpener={({ onOpen }) => (
          <Container onClick={onOpen}>
            <PlusIcon />
            Add a recurring task
          </Container>
        )}
        renderContent={({ onClose }) => (
          <PanelModal onFinish={onClose}>
            <CreateTaskFactoryForm
              onFinish={(taskFactory) => {
                onClose()
                if (taskFactory) {
                  onFinish(taskFactory.id)
                }
              }}
            />
          </PanelModal>
        )}
      />
      {options.length > 0 && (
        <SelectGoalTaskFactory options={options} onFinish={onFinish} />
      )}
    </Wrapper>
  )
}
