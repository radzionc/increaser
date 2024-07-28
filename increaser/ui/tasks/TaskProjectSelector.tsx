import { InputProps } from '@lib/ui/props'
import { Text } from '@lib/ui/text'
import { useAssertUserState } from '../user/UserStateContext'
import { useActiveProjects } from '../projects/hooks/useActiveProjects'
import { useFloatingOptions } from '@lib/ui/floating/useFloatingOptions'
import { OptionItem } from '@lib/ui/select/OptionItem'
import { FloatingFocusManager } from '@floating-ui/react'
import { OptionContent } from '@lib/ui/select/OptionContent'
import { ExpandableInputOpener } from '@lib/ui/inputs/ExpandableInputOpener'
import { useEffect } from 'react'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { TitledFloatingOptionsContainer } from '@lib/ui/floating/TitledFloatingOptionsContainer'
import { WithSelectionMark } from '@lib/ui/select/WithSelectionMark'

export const TaskProjectSelector = ({
  value,
  onChange,
  autoFocus = false,
}: InputProps<string> & { autoFocus?: boolean }) => {
  const activeProjects = useActiveProjects()
  const { projects } = useAssertUserState()
  const options = activeProjects.map((project) => project.id)

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
    selectedIndex: options.indexOf(value),
    placement: 'bottom-start',
    options: activeProjects.map((project) => project.name),
  })

  useEffect(() => {
    if (autoFocus) {
      setIsOpen(true)
    }
  }, [autoFocus, setIsOpen])

  return (
    <>
      <ExpandableInputOpener
        isActive={isOpen}
        type="button"
        {...getReferenceProps()}
      >
        <Text color="contrast" size={32}>
          {projects[value].emoji}
        </Text>
      </ExpandableInputOpener>
      {isOpen && (
        <FloatingFocusManager context={context} modal returnFocus>
          <TitledFloatingOptionsContainer
            title="Select a project"
            {...getFloatingProps()}
          >
            <VStack>
              {options.map((option, index) => {
                const { emoji, name } = projects[option]
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
            </VStack>
          </TitledFloatingOptionsContainer>
        </FloatingFocusManager>
      )}
    </>
  )
}
