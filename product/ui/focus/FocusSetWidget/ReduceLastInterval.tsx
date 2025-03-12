import { FloatingFocusManager } from '@floating-ui/react'
import { TitledFloatingOptionsContainer } from '@lib/ui/floating/TitledFloatingOptionsContainer'
import { useFloatingOptions } from '@lib/ui/floating/useFloatingOptions'
import { MinusIcon } from '@lib/ui/icons/MinusIcon'
import { OptionContent } from '@lib/ui/select/OptionContent'
import { OptionItem } from '@lib/ui/select/OptionItem'
import { intervalRange } from '@lib/utils/interval/intervalRange'
import { formatDuration } from '@lib/utils/time/formatDuration'

import { useReduceLastFocusInterval } from '../hooks/useReduceLastFocusInterval'

import { FocusHeaderIconButton } from './FocusHeaderIconButton'

type ReduceLastIntervalProps = {
  max: number
}

const optionToString = (option: number) =>
  formatDuration(option, 'min', {
    minUnit: 'min',
    maxUnit: 'h',
    kind: 'l',
  })

export const ReduceLastInterval = ({ max }: ReduceLastIntervalProps) => {
  const reduceLastInterval = useReduceLastFocusInterval()

  const options = intervalRange({ start: 1, end: max })

  const {
    getReferenceProps,
    getFloatingProps,
    getOptionProps,
    isOpen,
    setIsOpen,
    activeIndex,
    context,
  } = useFloatingOptions({
    selectedIndex: null,
    strategy: 'fixed',
    options: options.map(optionToString),
  })

  return (
    <>
      <FocusHeaderIconButton
        title="Got distracted? Adjust your focus session to account for the distraction."
        icon={<MinusIcon />}
        {...getReferenceProps()}
        isActive={isOpen}
      />
      {isOpen && (
        <FloatingFocusManager context={context} modal>
          <TitledFloatingOptionsContainer
            title="Deduct from your session"
            {...getFloatingProps()}
          >
            {options.map((option, index) => (
              <OptionItem
                key={option}
                isActive={activeIndex === index}
                {...getOptionProps({
                  index,
                  onSelect: () => {
                    reduceLastInterval(option)
                    setIsOpen(false)
                  },
                })}
              >
                <OptionContent key={option}>
                  {optionToString(option)}
                </OptionContent>
              </OptionItem>
            ))}
          </TitledFloatingOptionsContainer>
        </FloatingFocusManager>
      )}
    </>
  )
}
