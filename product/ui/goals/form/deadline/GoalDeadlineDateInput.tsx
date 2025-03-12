import { FloatingFocusManager } from '@floating-ui/react'
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
import { HStack } from '@lib/ui/css/stack'
import { FloatingOptionsContainer } from '@lib/ui/floating/FloatingOptionsContainer'
import { InputProps } from '@lib/ui/props'
import { ExpandableSelectorContainer } from '@lib/ui/select/ExpandableSelectorContainer'
import { OptionContent } from '@lib/ui/select/OptionContent'
import { Text } from '@lib/ui/text'
import { CalendarDayInput } from '@lib/ui/time/day/calendar/CalendarDayInput'
import { dayToString, fromDay, stringToDay, toDay } from '@lib/utils/time/Day'
import { addYears, format } from 'date-fns'
import { useMemo, useState } from 'react'

export const GoalDeadlineDateInput = ({
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
  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useDismiss(context, {
      escapeKey: true,
      outsidePress: true,
    }),
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
