import { ClickableTitlePart } from './ClickableTitlePart'
import { useCurrentFocus } from '@increaser/ui/focus/CurrentFocusProvider'
import { useFloatingOptions } from '@lib/ui/floating/useFloatingOptions'
import { FloatingOptionsContainer } from '@lib/ui/floating/FloatingOptionsContainer'
import { OptionItem } from '@lib/ui/select/OptionItem'
import { FloatingFocusManager } from '@floating-ui/react'
import { OptionContent } from '@lib/ui/select/OptionContent'
import { OptionOutline } from '@lib/ui/select/OptionOutline'
import { useFocus } from '@increaser/ui/focus/FocusContext'
import { Text } from '@lib/ui/text'
import { EmojiTextPrefix } from '@lib/ui/text/EmojiTextPrefix'
import { useActiveProjects } from '@increaser/ui/projects/hooks/useActiveProjects'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'

export const TitleProjectSelector = () => {
  const { projectId } = useCurrentFocus()
  const activeProjects = useActiveProjects()
  const { projects } = useAssertUserState()
  const options = activeProjects.map((project) => project.id)
  const { updateProject } = useFocus()

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
    selectedIndex: options.indexOf(projectId),
    options: activeProjects.map((project) => project.name),
  })

  return (
    <>
      <ClickableTitlePart {...getReferenceProps()} isActive={isOpen} as="span">
        <EmojiTextPrefix emoji={projects[projectId].emoji} />
        {projects[projectId].name}
      </ClickableTitlePart>
      {isOpen && (
        <FloatingFocusManager context={context} modal>
          <FloatingOptionsContainer {...getFloatingProps()}>
            {options.map((option, index) => {
              const { emoji, name } = projects[option]
              return (
                <OptionItem
                  isActive={activeIndex === index}
                  {...getOptionProps({
                    index,
                    onSelect: () => {
                      updateProject(option)
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
                  {option === projectId && <OptionOutline />}
                </OptionItem>
              )
            })}
          </FloatingOptionsContainer>
        </FloatingFocusManager>
      )}
    </>
  )
}
