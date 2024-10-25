import { BookIcon } from '@lib/ui/icons/BookIcon'
import { ExpandableSelectorContainer } from '@lib/ui/select/ExpandableSelectorContainer'
import { useUser } from '../../user/state/user'
import { Fragment, useMemo, useState } from 'react'
import { useFloatingOptions } from '@lib/ui/floating/useFloatingOptions'
import { FloatingFocusManager } from '@floating-ui/react'
import { FloatingOptionsContainer } from '@lib/ui/floating/FloatingOptionsContainer'
import { OptionItem } from '@lib/ui/select/OptionItem'
import { TaskTemplate } from '@increaser/entities/TaskTemplate'
import { OptionContent } from '@lib/ui/select/OptionContent'
import { PanelModal } from '@lib/ui/modal/PanelModal'
import { CreateTaskTemplateForm } from '../form/CreateTaskTemplateForm'
import { TaskTemplateFormShape } from '../form/TaskTemplateFormShape'
import { InputProps } from '@lib/ui/props'
import { HStack, VStack } from '@lib/ui/css/stack'
import { Text } from '@lib/ui/text'
import styled from 'styled-components'
import { getColor } from '@lib/ui/theme/getters'

const Container = styled(FloatingOptionsContainer)`
  background: ${getColor('foregroundExtra')};
  overflow: hidden;
  padding: 0;
  gap: 1px;
  min-width: 200px;

  > * {
    background: ${getColor('foreground')};
    padding: 8px;
  }
`

const getOptionName = (option: TaskTemplate | null) =>
  option === null ? 'Save as a template' : option.name

export const TaskTemplatesWidget = ({
  value,
  onChange,
}: InputProps<TaskTemplateFormShape>) => {
  const { taskTemplates, projects } = useUser()

  const { projectId } = value

  const templates = useMemo(
    () => Object.values(taskTemplates).filter((t) => t.projectId === projectId),
    [taskTemplates, projectId],
  )

  const options = useMemo(() => [null, ...templates], [templates])

  const {
    getReferenceProps,
    getFloatingProps,
    getOptionProps,
    isOpen,
    setIsOpen,
    activeIndex,
    context,
  } = useFloatingOptions({
    strategy: 'fixed',
    selectedIndex: null,
    placement: 'bottom-start',
    options: options.map(getOptionName),
  })

  const [isCreatingTemplate, setIsCreatingTemplate] = useState(false)

  return (
    <>
      <ExpandableSelectorContainer
        {...getReferenceProps()}
        isActive={isOpen}
        title="Templates"
      >
        <BookIcon />
      </ExpandableSelectorContainer>
      {isOpen && (
        <FloatingFocusManager context={context} modal returnFocus>
          <Container {...getFloatingProps()}>
            <VStack>
              <OptionItem
                isActive={activeIndex === 0}
                {...getOptionProps({
                  index: 0,
                  onSelect: () => {
                    setIsCreatingTemplate(true)
                    setIsOpen(false)
                  },
                })}
              >
                <HStack alignItems="center" gap={8}>
                  <BookIcon />
                  <OptionContent>{getOptionName(null)}</OptionContent>
                </HStack>
              </OptionItem>
            </VStack>

            {templates.length > 0 && (
              <VStack>
                {templates.map((option, index) => (
                  <Fragment key={option === null ? 'null' : option.id}>
                    <OptionItem
                      isActive={activeIndex === index + 1}
                      {...getOptionProps({
                        index: index + 1,
                        onSelect: () => {
                          onChange(option)
                          setIsOpen(false)
                        },
                      })}
                    >
                      <HStack alignItems="center" gap={8}>
                        <Text color="contrast">
                          {projects[option.projectId].emoji}
                        </Text>
                        <OptionContent>
                          Use "{getOptionName(option)}"
                        </OptionContent>
                      </HStack>
                    </OptionItem>
                  </Fragment>
                ))}
              </VStack>
            )}
          </Container>
        </FloatingFocusManager>
      )}
      {isCreatingTemplate && (
        <PanelModal onFinish={() => setIsCreatingTemplate(false)}>
          <CreateTaskTemplateForm
            onFinish={() => setIsCreatingTemplate(false)}
            initialValue={value}
          />
        </PanelModal>
      )}
    </>
  )
}
