import { InputProps } from '@lib/ui/props'
import { Text } from '@lib/ui/text'
import { useAssertUserState } from '../user/UserStateContext'
import { useActiveProjects } from '../projects/hooks/useActiveProjects'
import { useFloatingOptions } from '@lib/ui/floating/useFloatingOptions'
import { FloatingOptionsContainer } from '@lib/ui/floating/FloatingOptionsContainer'
import { OptionItem } from '@lib/ui/select/OptionItem'
import { FloatingFocusManager } from '@floating-ui/react'
import { OptionContent } from '@lib/ui/select/OptionContent'
import { OptionOutline } from '@lib/ui/select/OptionOutline'
import { ExpandableInputOpener } from '@lib/ui/inputs/ExpandableInputOpener'
import { useEffect } from 'react'

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
          <FloatingOptionsContainer {...getFloatingProps()}>
            {options.map((option, index) => {
              const { emoji, name } = projects[option]
              return (
                <OptionItem
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
                    <>
                      <Text color="contrast">{emoji}</Text>
                      <Text>{name}</Text>
                    </>
                  </OptionContent>
                  {option === value && <OptionOutline />}
                </OptionItem>
              )
            })}
          </FloatingOptionsContainer>
        </FloatingFocusManager>
      )}
    </>
  )
}
