import { TaskLink } from '@increaser/entities/Task'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { HStack, hStack, VStack } from '@lib/ui/css/stack'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { useFloatingOptions } from '@lib/ui/floating/useFloatingOptions'
import { EditIcon } from '@lib/ui/icons/EditIcon'
import { ExternalLinkIcon } from '@lib/ui/icons/ExternalLinkIcon'
import { MoreHorizontalIcon } from '@lib/ui/icons/MoreHorizontalIcon'
import { TrashBinIcon } from '@lib/ui/icons/TrashBinIcon'
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
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { UnstyledButton } from '@lib/ui/buttons/UnstyledButton'
import { centerContent } from '@lib/ui/css/centerContent'
import { interactive } from '@lib/ui/css/interactive'

type TaskLinkProps = InputProps<TaskLink> & RemovableComponentProps

const height = 36

const Wrapper = styled(HStack)`
  ${interactive};
  gap: 1px;
  height: ${toSizeUnit(height)};
  border: 1px solid transparent;
  ${borderRadius.m};
  overflow: hidden;
  background: ${getColor('mistExtra')};
`

const Content = styled(ExternalLink)`
  height: 100%;
  ${horizontalPadding(12)};
  ${hStack({
    alignItems: 'center',
    gap: 8,
  })}
  background: ${getColor('foreground')};
  &:hover {
    background: ${getHoverVariant('foreground')};
    color: ${getColor('contrast')};
  }
`

const MoreButton = styled(UnstyledButton)<ComponentWithActiveState>`
  width: ${toSizeUnit(height)};
  height: 100%;
  color: ${getColor('textSupporting')};

  outline: none;

  background: ${getColor('foreground')};

  ${centerContent};

  ${({ isActive }) =>
    isActive
      ? css`
          color: ${getColor('contrast')};
        `
      : css`
          &:hover {
            background: ${getHoverVariant('foreground')};
            color: ${getColor('contrast')};
          }
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
      <Wrapper>
        <Content to={value.url}>
          <LinkIcon />
          {value.name}
        </Content>
        <MoreButton
          type="button"
          isActive={isOpen}
          {...getReferenceProps()}
          title="Edit link"
        >
          <MoreHorizontalIcon />
        </MoreButton>
      </Wrapper>

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
