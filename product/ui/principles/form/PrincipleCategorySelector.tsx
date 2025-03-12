import { FloatingFocusManager } from '@floating-ui/react'
import { HStack } from '@lib/ui/css/stack'
import { FloatingOptionsContainer } from '@lib/ui/floating/FloatingOptionsContainer'
import { useFloatingOptions } from '@lib/ui/floating/useFloatingOptions'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { PlusIcon } from '@lib/ui/icons/PlusIcon'
import { ExpandableInputOpener } from '@lib/ui/inputs/ExpandableInputOpener'
import { PanelModal } from '@lib/ui/modal/PanelModal'
import { InputProps } from '@lib/ui/props'
import { OptionContent } from '@lib/ui/select/OptionContent'
import { OptionItem } from '@lib/ui/select/OptionItem'
import { WithSelectionMark } from '@lib/ui/select/WithSelectionMark'
import { Text } from '@lib/ui/text'
import { useUser } from '@product/ui/user/state/user'
import { useEffect, useState } from 'react'

import { CreatePrincipleCategoryForm } from '../categories/form/CreatePrincipleCategoryForm'
import { usePrincipleCategories } from '../categories/hooks/usePrincipleCategories'

const addCategoryKey = 'add-category' as const
const addCategoryText = 'Add a category'

export const PrincipleCategorySelector = ({
  value,
  onChange,
  autoFocus = false,
}: InputProps<string> & { autoFocus?: boolean }) => {
  const principleCategories = usePrincipleCategories()
  const { principleCategories: record } = useUser()
  const options = [...principleCategories.map(({ id }) => id), addCategoryKey]

  const [isAddingCategory, setIsAddingCategory] = useState(false)

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
    options: [...principleCategories.map(({ name }) => name), addCategoryText],
  })

  useEffect(() => {
    if (autoFocus) {
      setIsOpen(true)
    }
  }, [autoFocus, setIsOpen])

  return (
    <>
      {isAddingCategory && (
        <PanelModal onFinish={() => setIsAddingCategory(false)}>
          <CreatePrincipleCategoryForm
            onFinish={(category) => {
              setIsAddingCategory(false)
              if (category) {
                onChange(category.id)
              }
            }}
          />
        </PanelModal>
      )}
      <ExpandableInputOpener isActive={isOpen} {...getReferenceProps()}>
        <Text color="contrast" size={32}>
          {record[value]?.emoji || ''}
        </Text>
      </ExpandableInputOpener>
      {isOpen && (
        <FloatingFocusManager context={context} modal returnFocus>
          <FloatingOptionsContainer {...getFloatingProps()}>
            {options.map((option, index) => {
              if (option === addCategoryKey) {
                return (
                  <OptionItem
                    key={option}
                    isActive={activeIndex === index}
                    {...getOptionProps({
                      index,
                      onSelect: () => {
                        setIsAddingCategory(true)
                        setIsOpen(false)
                      },
                    })}
                  >
                    <OptionContent key={option}>
                      <WithSelectionMark isSelected={option === value}>
                        <HStack alignItems="center" gap={8}>
                          <IconWrapper>
                            <PlusIcon />
                          </IconWrapper>
                          <Text>{addCategoryText}</Text>
                        </HStack>
                      </WithSelectionMark>
                    </OptionContent>
                  </OptionItem>
                )
              }
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
