import { TaskLink } from '@increaser/entities/Task'
import { ActionInsideInteractiveElement } from '@lib/ui/base/ActionInsideInteractiveElement'
import { IconButton } from '@lib/ui/buttons/IconButton'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { interactive } from '@lib/ui/css/interactive'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { HStack, hStack, VStack } from '@lib/ui/css/stack'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { useFloatingOptions } from '@lib/ui/floating/useFloatingOptions'
import { EditIcon } from '@lib/ui/icons/EditIcon'
import { ExternalLinkIcon } from '@lib/ui/icons/ExternalLinkIcon'
import { MoreHorizontalIcon } from '@lib/ui/icons/MoreHorizontalIcon'
import { TrashBinIcon } from '@lib/ui/icons/TrashBinIcon'
import { Spacer } from '@lib/ui/layout/Spacer'
import { ExternalLink } from '@lib/ui/navigation/Link/ExternalLink'
import {
  ComponentWithActiveState,
  InputProps,
  RemovableComponentProps,
} from '@lib/ui/props'
import { Text } from '@lib/ui/text'
import { getHoverVariant } from '@lib/ui/theme/getHoverVariant'
import { getColor } from '@lib/ui/theme/getters'
import { useState } from 'react'
import styled, { css } from 'styled-components'
import { FloatingFocusManager } from '@floating-ui/react'
import { FloatingOptionsContainer } from '@lib/ui/floating/FloatingOptionsContainer'
import { OptionItem } from '@lib/ui/select/OptionItem'
import { OptionContent } from '@lib/ui/select/OptionContent'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { EditTaskLinkOverlay } from './EditTaskLinkOverlay'

type TaskLinkProps = InputProps<TaskLink> & RemovableComponentProps

const Wrapper = styled(ActionInsideInteractiveElement)`
  ${interactive};
  ${hStack({
    alignItems: 'center',
    gap: 4,
  })}
`

const height = 36

const closeButtonPadding = 2

const Container = styled(ExternalLink)`
  height: ${toSizeUnit(height)};
  padding-left: 12px;
  padding-right: ${toSizeUnit(closeButtonPadding)};
  ${borderRadius.s};
  background: ${getColor('foreground')};
  border: 1px solid ${getColor('mist')};
  ${hStack({
    alignItems: 'center',
    gap: 8,
  })}
  &:hover {
    background: ${getHoverVariant('foreground')};
    color: ${getColor('contrast')};
  }
`

const MoreButton = styled(IconButton)<ComponentWithActiveState>`
  ${sameDimensions(height - closeButtonPadding * 2)};
  color: ${getColor('textSupporting')};

  border: 1px solid transparent;

  outline: none;

  ${({ isActive }) =>
    isActive &&
    css`
      color: ${getColor('contrast')};
      border-color: ${getColor('text')};
    `}
`

const LinkIcon = styled(ExternalLinkIcon)`
  color: ${({ theme }) =>
    theme.colors.foreground.getVariant({ l: () => 48 }).toCssValue()};
`

export const TaskLinkItem = ({ value, onRemove, onChange }: TaskLinkProps) => {
  const [isEditing, setIsEditing] = useState(false)

  const options = [
    {
      name: 'Edit link',
      onSelect: () => setIsEditing(true),
      icon: <EditIcon />,
    },
    {
      name: 'Delete link',
      onSelect: () => onRemove(),
      icon: <TrashBinIcon />,
    },
  ]

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
    selectedIndex: null,
    placement: 'bottom-start',
    options: options.map(({ name }) => name),
  })

  return (
    <>
      <Wrapper
        action={
          <MoreButton
            isActive={isOpen}
            {...getReferenceProps()}
            kind="secondary"
            title="Edit link"
            icon={<MoreHorizontalIcon />}
          />
        }
        actionPlacerStyles={{
          right: closeButtonPadding,
        }}
        render={({ actionSize }) => (
          <Container to={value.url}>
            <Text centerVertically style={{ gap: 8 }}>
              <LinkIcon />
              {value.name}
            </Text>
            <Spacer {...actionSize} />
          </Container>
        )}
      />

      {isOpen && (
        <FloatingFocusManager context={context} modal returnFocus>
          <FloatingOptionsContainer {...getFloatingProps()}>
            <VStack>
              {options.map(({ name, onSelect, icon }, index) => {
                return (
                  <OptionItem
                    key={name}
                    isActive={activeIndex === index}
                    {...getOptionProps({
                      index,
                      onSelect: () => {
                        onSelect()
                        setIsOpen(false)
                      },
                    })}
                  >
                    <OptionContent>
                      <HStack alignItems="center" gap={8}>
                        <IconWrapper>{icon}</IconWrapper>
                        <Text>{name}</Text>
                      </HStack>
                    </OptionContent>
                  </OptionItem>
                )
              })}
            </VStack>
          </FloatingOptionsContainer>
        </FloatingFocusManager>
      )}

      {isEditing && (
        <EditTaskLinkOverlay
          initialValue={value}
          onFinish={(value) => {
            setIsEditing(false)
            if (value) {
              onChange(value)
            }
          }}
        />
      )}
    </>
  )
}
