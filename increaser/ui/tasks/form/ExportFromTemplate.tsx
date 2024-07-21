import { isEmpty } from '@lib/utils/array/isEmpty'
import { useTaskTemplates } from '../../taskTemplates/hooks/useTaskTemplates'
import { TaskTemplate } from '@increaser/entities/TaskTemplate'
import { useFloatingOptions } from '@lib/ui/floating/useFloatingOptions'
import { focusSetWidgetConfig } from '@increaser/app/focus/components/FocusSetWidget/config'
import { interactive } from '@lib/ui/css/interactive'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { transition } from '@lib/ui/css/transition'
import { FloatingOptionsContainer } from '@lib/ui/floating/FloatingOptionsContainer'
import { CollapsableStateIndicator } from '@lib/ui/layout/CollapsableStateIndicator'
import { HStack } from '@lib/ui/layout/Stack'
import { tightListItemMinHeight } from '@lib/ui/list/tightListItemConfig'
import { ComponentWithActiveState } from '@lib/ui/props'
import { OptionContent } from '@lib/ui/select/OptionContent'
import { OptionItem } from '@lib/ui/select/OptionItem'
import { getColor } from '@lib/ui/theme/getters'
import styled, { css } from 'styled-components'
import { FloatingFocusManager } from '@floating-ui/react'

type Props = {
  projectId: string
  onFinish: (template: TaskTemplate) => void
}

const ToggleIconContainer = styled(CollapsableStateIndicator)`
  font-size: 16px;

  width: ${toSizeUnit(tightListItemMinHeight)};

  ${transition};
  color: ${getColor('textSupporting')};
`

const activeContainer = css`
  background: ${getColor('foreground')};
  ${ToggleIconContainer} {
    color: ${getColor('contrast')};
  }
`

const Container = styled(HStack)<ComponentWithActiveState>`
  ${interactive};
  width: 100%;
  align-items: center;
  justify-content: space-between;
  ${transition};
  font-weight: 500;
  background: ${getColor('background')};
  padding: ${toSizeUnit(focusSetWidgetConfig.padding)};

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
      <Container isActive={isOpen} {...getReferenceProps()}>
        <OptionContent>Use a template</OptionContent>
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
