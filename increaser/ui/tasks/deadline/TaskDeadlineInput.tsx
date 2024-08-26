import { CalendarIcon } from '@lib/ui/icons/CalendarIcon'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { HStack } from '@lib/ui/layout/Stack'
import { InputProps } from '@lib/ui/props'
import { Text } from '@lib/ui/text'
import { matchColor } from '@lib/ui/theme/getters'
import styled from 'styled-components'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'
import { formatTaskDeadline } from '@increaser/entities-utils/task/formatTaskDeadline'
import {
  TaskDeadlineOption,
  useTaskDeadlineOptions,
} from './useTaskDeadlineOptions'
import { useState } from 'react'
import { useFloatingOptions } from '@lib/ui/floating/useFloatingOptions'
import { match } from '@lib/utils/match'
import { ExpandableSelectorContainer } from '@lib/ui/select/ExpandableSelectorContainer'
import { FloatingFocusManager } from '@floating-ui/react'
import { OptionContent } from '@lib/ui/select/OptionContent'
import { FloatingOptionsContainer } from '@lib/ui/floating/FloatingOptionsContainer'
import { OptionItem } from '@lib/ui/select/OptionItem'
import { WithSelectionMark } from '@lib/ui/select/WithSelectionMark'
import { Match } from '@lib/ui/base/Match'

const Icon = styled(IconWrapper)<{ isOverdue: boolean }>`
  color: ${matchColor('isOverdue', {
    true: 'idle',
    false: 'text',
  })};
`

type TaskDeadlineInputView = 'options' | 'custom'

const getOptionKey = (option: TaskDeadlineOption) =>
  option === 'custom'
    ? 'Custom...'
    : formatTaskDeadline({ deadlineAt: option, now: Date.now() })

export const TaskDeadlineInput = ({
  value,
  onChange,
}: InputProps<number | null>) => {
  const now = useRhythmicRerender(convertDuration(1, 'min', 'ms'))

  const [view, setView] = useState<TaskDeadlineInputView>('options')

  const options = useTaskDeadlineOptions(value)

  const isOverdue = value ? value < now : false

  const {
    getReferenceProps,
    getFloatingProps,
    getOptionProps,
    isOpen,
    setIsOpen,
    activeIndex,
    context,
  } = useFloatingOptions({
    strategy: 'fixed',
    floatingOptionsWidthSameAsOpener: false,
    selectedIndex: match(view, {
      options: () => (value === null ? null : options.indexOf(value)),
      custom: () => null,
    }),
    placement: 'bottom-start',
    options: match(view, {
      options: () => options.map(getOptionKey),
      custom: () => [],
    }),
  })

  return (
    <>
      <ExpandableSelectorContainer isActive={isOpen} {...getReferenceProps()}>
        <OptionContent>
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
        </OptionContent>
      </ExpandableSelectorContainer>
      {isOpen && (
        <FloatingFocusManager context={context} modal returnFocus>
          <FloatingOptionsContainer {...getFloatingProps()}>
            <Match
              value={view}
              options={() => (
                <>
                  {options.map((option, index) => (
                    <OptionItem
                      key={getOptionKey(option)}
                      isActive={activeIndex === index}
                      {...getOptionProps({
                        index,
                        onSelect: () => {
                          if (option === 'custom') {
                            setView('custom')
                            return
                          }

                          onChange(option)
                          setIsOpen(false)
                        },
                      })}
                    >
                      <OptionContent>
                        <WithSelectionMark isSelected={value === option}>
                          {getOptionKey(option)}
                        </WithSelectionMark>
                      </OptionContent>
                    </OptionItem>
                  ))}
                </>
              )}
              custom={() => <p>calendar input will be here!</p>}
            />
          </FloatingOptionsContainer>
        </FloatingFocusManager>
      )}
    </>
  )
}
