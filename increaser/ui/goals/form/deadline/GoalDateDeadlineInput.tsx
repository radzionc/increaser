import { HStack } from '@lib/ui/css/stack'
import { InputProps } from '@lib/ui/props'
import { Text } from '@lib/ui/text'
import { useMemo, useState } from 'react'
import { ExpandableSelectorContainer } from '@lib/ui/select/ExpandableSelectorContainer'
import { FloatingFocusManager } from '@floating-ui/react'
import { OptionContent } from '@lib/ui/select/OptionContent'
import { FloatingOptionsContainer } from '@lib/ui/floating/FloatingOptionsContainer'
import {
  useClick,
  useFloating,
  useInteractions,
  autoUpdate,
  flip,
  offset,
  shift,
  useDismiss,
} from '@floating-ui/react'
import { CalendarDayInput } from '@lib/ui/time/day/calendar/CalendarDayInput'
import { dayToString, fromDay, stringToDay, toDay } from '@lib/utils/time/Day'
import { addYears, format } from 'date-fns'

export const GoalDateDeadlineInput = ({
  value,
  onChange,
}: InputProps<string>) => {
  const [isOpen, setIsOpen] = useState(false)

  const {
    context,
    floatingStyles,
    refs: { setReference, setFloating },
  } = useFloating({
    whileElementsMounted: autoUpdate,
    open: isOpen,
    placement: 'bottom-start',
    strategy: 'fixed',
    onOpenChange: setIsOpen,
    middleware: [offset(4), shift(), flip()],
  })

  const click = useClick(context)
  const dismiss = useDismiss(context, {
    escapeKey: true,
    outsidePress: true,
  })

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
  ])

  const [min, max] = useMemo(() => {
    const now = Date.now()

    return [now, addYears(Date.now(), 50).getTime()].map(toDay)
  }, [])

  const valueTimestamp = fromDay(stringToDay(value))

  return (
    <>
      <ExpandableSelectorContainer
        isActive={isOpen}
        ref={setReference}
        {...getReferenceProps()}
      >
        <OptionContent>
          <HStack alignItems="center" gap={8}>
            {value && <Text>{format(valueTimestamp, 'dd MMM yyyy')}</Text>}
          </HStack>
        </OptionContent>
      </ExpandableSelectorContainer>
      {isOpen && (
        <FloatingFocusManager context={context} modal returnFocus>
          <FloatingOptionsContainer
            ref={setFloating}
            style={{ ...floatingStyles, zIndex: 1 }}
            {...getFloatingProps()}
          >
            <CalendarDayInput
              min={min}
              max={max}
              value={stringToDay(value)}
              onChange={(value) => onChange(dayToString(value))}
            />
          </FloatingOptionsContainer>
        </FloatingFocusManager>
      )}
    </>
  )
}
