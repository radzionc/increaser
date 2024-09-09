import { isEmpty } from '@lib/utils/array/isEmpty'
import { useTaskTemplates } from '../../taskTemplates/hooks/useTaskTemplates'
import { TaskTemplate } from '@increaser/entities/TaskTemplate'
import { useFloatingOptions } from '@lib/ui/floating/useFloatingOptions'
import { FloatingOptionsContainer } from '@lib/ui/floating/FloatingOptionsContainer'
import { CollapsableStateIndicator } from '@lib/ui/layout/CollapsableStateIndicator'
import { ComponentWithActiveState, ValueFinishProps } from '@lib/ui/props'
import { OptionContent } from '@lib/ui/select/OptionContent'
import { OptionItem } from '@lib/ui/select/OptionItem'
import { getColor } from '@lib/ui/theme/getters'
import styled, { css } from 'styled-components'
import { FloatingFocusManager } from '@floating-ui/react'
import { EmbeddedPromptContainer } from '@lib/ui/buttons/EmbeddedPromptContainer'
import { BookIcon } from '@lib/ui/icons/BookIcon'
import { EmbeddedPromptContentFrame } from '@lib/ui/buttons/EmbeddedPromptContentFrame'

type Props = ValueFinishProps<TaskTemplate> & {
  projectId: string
}

const ToggleIconContainer = styled(CollapsableStateIndicator)`
  font-size: 16px;
  color: ${getColor('textSupporting')};
`

const activeContainer = css`
  background: ${getColor('foreground')};
  color: ${getColor('contrast')};
  ${ToggleIconContainer} {
    color: ${getColor('contrast')};
  }
`

const Container = styled(EmbeddedPromptContainer)<ComponentWithActiveState>`
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    ${activeContainer}
  }

  ${({ isActive }) => isActive && activeContainer}
`

export const ExportFromTemplate = ({ projectId, onFinish }: Props) => {
  const options = useTaskTemplates().filter(
    (template) => template.projectId === projectId,
  )

  const {
    getReferenceProps,
    getFloatingProps,
    getOptionProps,
    isOpen,
    setIsOpen,
    activeIndex,
    context,
  } = useFloatingOptions({
    selectedIndex: null,
    options: options.map((option) => option.name),
  })

  if (isEmpty(options)) {
    return null
  }

  return (
    <>
      <Container type="button" isActive={isOpen} {...getReferenceProps()}>
        <EmbeddedPromptContentFrame>
          <BookIcon />
          Use a template
        </EmbeddedPromptContentFrame>
        <ToggleIconContainer isOpen={isOpen} />
      </Container>
      {isOpen && (
        <FloatingFocusManager context={context} modal>
          <FloatingOptionsContainer {...getFloatingProps()}>
            {options.map((option, index) => (
              <OptionItem
                isActive={activeIndex === index}
                key={option.id}
                {...getOptionProps({
                  index,
                  onSelect: () => {
                    onFinish(option)
                    setIsOpen(false)
                  },
                })}
              >
                <OptionContent key={option.id}>{option.name}</OptionContent>
              </OptionItem>
            ))}
          </FloatingOptionsContainer>
        </FloatingFocusManager>
      )}
    </>
  )
}
