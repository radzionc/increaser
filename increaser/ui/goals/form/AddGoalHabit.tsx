import { Opener } from '@lib/ui/base/Opener'
import { PanelModal } from '@lib/ui/modal/PanelModal'
import { ComponentWithOptionsProps, ValueFinishProps } from '@lib/ui/props'
import styled from 'styled-components'
import { hStack } from '@lib/ui/css/stack'
import { PlusIcon } from '@lib/ui/icons/PlusIcon'
import { UnstyledButton } from '@lib/ui/buttons/UnstyledButton'
import { withSecondaryAction } from '@lib/ui/buttons/WithSecondaryAction'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { CreateHabitForm } from '@increaser/app/habits/components/manage/form/CreateHabitForm'
import { SelectGoalHabit } from './SelectGoalHabit'

const Container = styled(UnstyledButton)`
  outline: none;
  ${hStack({
    alignItems: 'center',
    gap: 8,
  })}
`

const Wrapper = styled.div`
  ${withSecondaryAction({ height: 40 })};
  ${borderRadius.s};
`

export const AddGoalHabit = ({
  onFinish,
  options,
}: ValueFinishProps<string> & ComponentWithOptionsProps<string>) => {
  return (
    <Wrapper>
      <Opener
        renderOpener={({ onOpen }) => (
          <Container onClick={onOpen}>
            <PlusIcon />
            Add a daily habit
          </Container>
        )}
        renderContent={({ onClose }) => (
          <PanelModal onFinish={onClose}>
            <CreateHabitForm
              onFinish={(habit) => {
                onClose()
                if (habit) {
                  onFinish(habit.id)
                }
              }}
            />
          </PanelModal>
        )}
      />
      {options.length > 0 && (
        <SelectGoalHabit options={options} onFinish={onFinish} />
      )}
    </Wrapper>
  )
}
