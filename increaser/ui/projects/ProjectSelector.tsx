import { ComponentWithActiveState, InputProps } from '@lib/ui/props'
import { Text } from '@lib/ui/text'
import { useUser } from '@increaser/ui/user/state/user'
import { useActiveProjects } from '../projects/hooks/useActiveProjects'
import { useFloatingOptions } from '@lib/ui/floating/useFloatingOptions'
import { OptionItem } from '@lib/ui/select/OptionItem'
import { FloatingFocusManager } from '@floating-ui/react'
import { OptionContent } from '@lib/ui/select/OptionContent'
import { ReactNode, useEffect, useState } from 'react'
import { HStack, VStack } from '@lib/ui/css/stack'
import { TitledFloatingOptionsContainer } from '@lib/ui/floating/TitledFloatingOptionsContainer'
import { WithSelectionMark } from '@lib/ui/select/WithSelectionMark'
import { PanelModal } from '@lib/ui/modal/PanelModal'
import { CreateProjectForm } from './form/CreateProjectForm'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { PlusIcon } from '@lib/ui/icons/PlusIcon'

type OpenerParams = Record<string, unknown> & ComponentWithActiveState

type ProjectSelectorProps = InputProps<string> & {
  autoFocus?: boolean
  renderOpener: (params: OpenerParams) => ReactNode
}

const addProjectKey = 'add-project' as const
const addProjectText = 'Add a project'

export const ProjectSelector = ({
  value,
  onChange,
  autoFocus = false,
  renderOpener,
}: ProjectSelectorProps) => {
  const activeProjects = useActiveProjects()
  const { projects } = useUser()
  const options = [
    ...activeProjects.map((project) => project.id),
    addProjectKey,
  ]

  const [isAddingProject, setIsAddingProject] = useState(false)

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
    strategy: 'fixed',
    options: options.map((option) =>
      option === addProjectKey ? addProjectText : projects[option]?.name,
    ),
  })

  useEffect(() => {
    if (autoFocus) {
      setIsOpen(true)
    }
  }, [autoFocus, setIsOpen])

  return (
    <>
      {isAddingProject && (
        <PanelModal width={460} onFinish={() => setIsAddingProject(false)}>
          <CreateProjectForm
            onFinish={(project) => {
              setIsAddingProject(false)
              if (project) {
                onChange(project.id)
              }
            }}
          />
        </PanelModal>
      )}
      {renderOpener({
        isActive: isOpen,
        ...getReferenceProps(),
      })}
      {isOpen && (
        <FloatingFocusManager context={context} modal returnFocus>
          <TitledFloatingOptionsContainer
            title="Select a project"
            {...getFloatingProps()}
          >
            <VStack>
              {options.map((option, index) => {
                if (option === addProjectKey) {
                  return (
                    <OptionItem
                      key={option}
                      isActive={activeIndex === index}
                      {...getOptionProps({
                        index,
                        onSelect: () => {
                          setIsAddingProject(true)
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
                            <Text>{addProjectText}</Text>
                          </HStack>
                        </WithSelectionMark>
                      </OptionContent>
                    </OptionItem>
                  )
                }
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
