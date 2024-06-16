import { Button } from '@lib/ui/buttons/Button'
import { UniformColumnGrid } from '@lib/ui/layout/UniformColumnGrid'
import { Modal } from '@lib/ui/modal'
import { FinishableComponentProps } from '@lib/ui/props'
import { useState } from 'react'
import { useResetHabitsMutation } from '../../../api/useResetHabitsMutation'
import { useOrderedHabits } from '@increaser/ui/habits/hooks/useOrderedHabits'
import { ChecklistItem } from '@lib/ui/checklist/ChecklistItem'
import { EmojiTextPrefix } from '@lib/ui/text/EmojiTextPrefix'
import { VStack } from '@lib/ui/layout/Stack'
import { SeparatedByLine } from '@lib/ui/layout/SeparatedByLine'

export const ResetHabitsOverlay = ({ onFinish }: FinishableComponentProps) => {
  const habits = useOrderedHabits()

  const [selectedHabits, setSelectedHabits] = useState<string[]>([])

  const { mutate } = useResetHabitsMutation()

  return (
    <Modal
      width={440}
      title="Start Fresh with Habits"
      subTitle="Select the habits you want to reset or choose to start fresh with all your habits. This action will clear the tracked data and help you restart with a clean slate, empowering you to achieve your goals with renewed focus."
      onClose={onFinish}
      footer={
        <UniformColumnGrid gap={20}>
          <Button type="button" size="l" onClick={onFinish} kind="secondary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              mutate(selectedHabits)
              onFinish()
            }}
            size="l"
          >
            Reset
          </Button>
        </UniformColumnGrid>
      }
    >
      <SeparatedByLine gap={8}>
        <div>
          <ChecklistItem
            value={selectedHabits.length === habits.length}
            name={'Select all'}
            onChange={(value) => {
              setSelectedHabits(value ? habits.map((habit) => habit.id) : [])
            }}
          />
        </div>
        <VStack>
          {habits.map((habit) => (
            <ChecklistItem
              key={habit.id}
              value={selectedHabits.includes(habit.id)}
              onChange={(value) => {
                setSelectedHabits((prev) =>
                  value
                    ? [...prev, habit.id]
                    : prev.filter((id) => id !== habit.id),
                )
              }}
              name={
                <>
                  <EmojiTextPrefix emoji={habit.emoji} />
                  {habit.name}
                </>
              }
            />
          ))}
        </VStack>
      </SeparatedByLine>
    </Modal>
  )
}
