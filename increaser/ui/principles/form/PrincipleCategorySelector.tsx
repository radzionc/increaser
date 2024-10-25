import { InputProps } from '@lib/ui/props'
import { Text } from '@lib/ui/text'
import { useFloatingOptions } from '@lib/ui/floating/useFloatingOptions'
import { FloatingOptionsContainer } from '@lib/ui/floating/FloatingOptionsContainer'
import { OptionItem } from '@lib/ui/select/OptionItem'
import { FloatingFocusManager } from '@floating-ui/react'
import { OptionContent } from '@lib/ui/select/OptionContent'
import { ExpandableInputOpener } from '@lib/ui/inputs/ExpandableInputOpener'
import { useEffect } from 'react'
import { usePrincipleCategories } from '../categories/hooks/usePrincipleCategories'
import { useUser } from '@increaser/ui/user/state/user'
import { HStack } from '@lib/ui/css/stack'
import { WithSelectionMark } from '@lib/ui/select/WithSelectionMark'

export const PrincipleCategorySelector = ({
  value,
  onChange,
  autoFocus = false,
}: InputProps<string> & { autoFocus?: boolean }) => {
  const principleCategories = usePrincipleCategories()
  const { principleCategories: record } = useUser()
  const options = principleCategories.map(({ id }) => id)

  const {
    getReferenceProps,
    getFloatingProps,
    getOptionProps,
    isOpen,
    setIsOpen,
    activeIndex,
    context,
  } = useFloatingOptions({
    selectedIndex: options.indexOf(value),
    placement: 'bottom-start',
    options: principleCategories.map(({ name }) => name),
  })

  useEffect(() => {
    if (autoFocus) {
      setIsOpen(true)
    }
  }, [autoFocus, setIsOpen])

  return (
    <>
      <ExpandableInputOpener isActive={isOpen} {...getReferenceProps()}>
        <Text color="contrast" size={32}>
          {record[value].emoji}
        </Text>
      </ExpandableInputOpener>
      {isOpen && (
        <FloatingFocusManager context={context} modal returnFocus>
          <FloatingOptionsContainer {...getFloatingProps()}>
            {options.map((option, index) => {
              const { emoji, name } = record[option]
              return (
                <OptionItem
                  key={option}
                  isActive={activeIndex === index}
                  {...getOptionProps({
                    index,
                    onSelect: () => {
                      onChange(option)
                      setIsOpen(false)
                    },
                  })}
                >
                  <OptionContent key={option}>
                    <WithSelectionMark isSelected={option === value}>
                      <HStack alignItems="center" gap={8}>
                        <Text color="contrast">{emoji}</Text>
                        <Text>{name}</Text>
                      </HStack>
                    </WithSelectionMark>
                  </OptionContent>
                </OptionItem>
              )
            })}
          </FloatingOptionsContainer>
        </FloatingFocusManager>
      )}
    </>
  )
}
