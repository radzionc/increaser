import { CalendarIcon } from '@lib/ui/icons/CalendarIcon'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { HStack } from '@lib/ui/layout/Stack'
import { InputProps } from '@lib/ui/props'
import { ExpandableSelector } from '@lib/ui/select/ExpandableSelector'
import { Text } from '@lib/ui/text'
import { matchColor } from '@lib/ui/theme/getters'
import styled from 'styled-components'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'
import { formatTaskDeadline } from '@increaser/entities-utils/task/formatTaskDeadline'
import { useTaskDeadlineOptions } from './useTaskDeadlineOptions'
import { Opener } from '@lib/ui/base/Opener'
import { CustomTaskDeadlineOverlay } from './CustomTaskDeadlineOverlay'

const Icon = styled(IconWrapper)<{ isOverdue: boolean }>`
  color: ${matchColor('isOverdue', {
    true: 'idle',
    false: 'text',
  })};
`

export const TaskDeadlineInput = ({
  value,
  onChange,
}: InputProps<number | null>) => {
  const now = useRhythmicRerender(convertDuration(1, 'min', 'ms'))

  const options = useTaskDeadlineOptions(value)

  const isOverdue = value ? value < now : false

  return (
    <Opener
      renderOpener={({ isOpen, onOpen }) =>
        isOpen ? null : (
          <ExpandableSelector
            floatingOptionsWidthSameAsOpener={false}
            showToggle={false}
            openerContent={
              <HStack alignItems="center" gap={8}>
                <Icon isOverdue={isOverdue} style={{ fontSize: 14 }}>
                  <CalendarIcon />
                </Icon>
                <Text>
                  {value
                    ? formatTaskDeadline({
                        deadlineAt: value,
                        now,
                      })
                    : 'Set a deadline'}
                </Text>
              </HStack>
            }
            value={value}
            onChange={(option) => {
              if (option === 'custom') {
                onOpen()
                return
              }

              onChange(option)
            }}
            options={options}
            getOptionKey={(option) =>
              option === 'custom'
                ? 'Custom...'
                : formatTaskDeadline({ deadlineAt: option, now })
            }
          />
        )
      }
      renderContent={({ onClose }) => (
        <CustomTaskDeadlineOverlay
          onFinish={(value) => {
            if (value) {
              onChange(value)
            }

            onClose()
          }}
        />
      )}
    />
  )
}
