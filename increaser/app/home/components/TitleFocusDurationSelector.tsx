import { ClickableTitlePart } from './ClickableTitlePart'
import { useFloatingOptions } from '@lib/ui/floating/useFloatingOptions'
import { FloatingOptionsContainer } from '@lib/ui/floating/FloatingOptionsContainer'
import { OptionItem } from '@lib/ui/select/OptionItem'
import { FloatingFocusManager } from '@floating-ui/react'
import { OptionContent } from '@lib/ui/select/OptionContent'
import { useFocus } from '@increaser/ui/focus/FocusContext'
import { focusDurations } from '@increaser/entities/FocusDuration'
import { WithSelectionMark } from '@lib/ui/select/WithSelectionMark'

export const TitleFocusDurationSelector = () => {
  const { focusDuration, setFocusDuration } = useFocus()

  const {
    getReferenceProps,
    getFloatingProps,
    getOptionProps,
    isOpen,
    setIsOpen,
    activeIndex,
    context,
  } = useFloatingOptions({
    floatingOptionsWidthSameAsOpener: false,
    selectedIndex: focusDurations.indexOf(focusDuration),
    options: focusDurations.map((option) => option.toString()),
  })

  return (
    <>
      <ClickableTitlePart {...getReferenceProps()} isActive={isOpen} as="span">
        {focusDuration} min
      </ClickableTitlePart>
      {isOpen && (
        <FloatingFocusManager context={context} modal>
          <FloatingOptionsContainer {...getFloatingProps()}>
            {focusDurations.map((option, index) => (
              <OptionItem
                isActive={activeIndex === index}
                {...getOptionProps({
                  index,
                  onSelect: () => {
                    setFocusDuration(option)
                    setIsOpen(false)
                  },
                })}
              >
                <OptionContent key={option}>
                  <WithSelectionMark isSelected={option === focusDuration}>
                    {option} min
                  </WithSelectionMark>
                </OptionContent>
              </OptionItem>
            ))}
          </FloatingOptionsContainer>
        </FloatingFocusManager>
      )}
    </>
  )
}
