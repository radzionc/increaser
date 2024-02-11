import { Opener } from '@lib/ui/base/Opener'
import { IconButton } from '@lib/ui/buttons/IconButton'
import { MoreHorizontalIcon } from '@lib/ui/icons/MoreHorizontalIcon'
import { BottomSlideOver } from '@lib/ui/modal/BottomSlideOver'
import { useCurrentTask } from './CurrentTaskProvider'
import { useDeleteTaskMutation } from '../api/useDeleteHabitMutation'
import { SeparatedByLine } from '@lib/ui/layout/SeparatedByLine'
import { MenuOption } from '@lib/ui/menu/MenuOption'
import { TrashBinIcon } from '@lib/ui/icons/TrashBinIcon'
import { VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { ManageTaskDeadline } from './ManageTaskDeadline'
import { deadlineName } from '@increaser/entities/Task'

export const ManageTaskSlideover = () => {
  const { id } = useCurrentTask()

  const { mutate: deleteTask } = useDeleteTaskMutation()

  return (
    <Opener
      renderOpener={({ onOpen }) => (
        <IconButton
          title="Manage task"
          icon={<MoreHorizontalIcon />}
          onClick={onOpen}
        />
      )}
      renderContent={({ onClose }) => (
        <BottomSlideOver title="Manage task" onClose={onClose}>
          <SeparatedByLine gap={20}>
            <VStack gap={12}>
              <Text weight="bold" size={14} color="supporting">
                Deadline
              </Text>
              <ManageTaskDeadline
                render={({ value, onChange, options }) => (
                  <>
                    {options.map((option) => (
                      <MenuOption
                        isSelected={value === option}
                        key={option}
                        text={deadlineName[option]}
                        onSelect={() => onChange(option)}
                        view="slideover"
                      />
                    ))}
                  </>
                )}
              />
            </VStack>
            <MenuOption
              kind="alert"
              view="slideover"
              text="Delete task"
              icon={<TrashBinIcon />}
              onSelect={() => deleteTask({ id })}
            />
          </SeparatedByLine>
        </BottomSlideOver>
      )}
    />
  )
}
