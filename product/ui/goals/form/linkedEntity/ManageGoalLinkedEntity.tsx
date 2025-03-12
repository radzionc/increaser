import { FloatingFocusManager } from '@floating-ui/react'
import { UnstyledButton } from '@lib/ui/buttons/UnstyledButton'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { centerContent } from '@lib/ui/css/centerContent'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { VStack, HStack, hStack } from '@lib/ui/css/stack'
import { FloatingOptionsContainer } from '@lib/ui/floating/FloatingOptionsContainer'
import { useFloatingOptions } from '@lib/ui/floating/useFloatingOptions'
import { EditIcon } from '@lib/ui/icons/EditIcon'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { MoreHorizontalIcon } from '@lib/ui/icons/MoreHorizontalIcon'
import { TrashBinIcon } from '@lib/ui/icons/TrashBinIcon'
import { UnlinkIcon } from '@lib/ui/icons/UnlinkIcon'
import { tightListItemMinHeight } from '@lib/ui/list/tightListItemConfig'
import { IsActiveProp, ChildrenProp } from '@lib/ui/props'
import { OptionContent } from '@lib/ui/select/OptionContent'
import { OptionItem } from '@lib/ui/select/OptionItem'
import { Text } from '@lib/ui/text'
import { getColor } from '@lib/ui/theme/getters'
import { useMemo } from 'react'
import styled, { css } from 'styled-components'

const Container = styled(UnstyledButton)<IsActiveProp>`
  ${sameDimensions(tightListItemMinHeight)}
  border: 1px ${getColor('mist')} solid;
  opacity: 0;

  ${centerContent};

  ${borderRadius.s};

  &:hover {
    background: ${getColor('mist')};
  }

  ${({ isActive }) =>
    isActive &&
    css`
      opacity: 1
      color: ${getColor('contrast')};
      background: ${getColor('mistExtra')};
      border-color: ${getColor('text')};
    `}
`

const Wrapper = styled.div`
  width: 100%;

  ${hStack({
    gap: 8,
    alignItems: 'center',
  })}

  > * {
    &:first-child {
      flex: 1;
    }
  }

  &:hover ${Container} {
    opacity: 1;
  }

  @media (hover: none) {
    ${Container} {
      opacity: 0;
    }
  }
`

type GoalLinkedEntityProps = ChildrenProp & {
  onDelete: () => void
  onEdit: () => void
  onUnlink: () => void
}

export const ManageGoalLinkedEntity = ({
  children,
  onEdit,
  onDelete,
  onUnlink,
}: GoalLinkedEntityProps) => {
  const options = useMemo(
    () => [
      {
        name: 'Edit',
        icon: <EditIcon />,
        onSelect: onEdit,
      },
      {
        name: 'Unlink',
        icon: <UnlinkIcon />,
        onSelect: onUnlink,
      },
      {
        name: 'Delete',
        icon: <TrashBinIcon />,
        onSelect: onDelete,
      },
    ],
    [onDelete, onEdit, onUnlink],
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
    placement: 'bottom-end',
    options: options.map(({ name }) => name),
  })

  return (
    <Wrapper>
      {children}
      <Container {...getReferenceProps()} isActive={isOpen}>
        <MoreHorizontalIcon />
      </Container>
      {isOpen && (
        <FloatingFocusManager context={context} modal returnFocus>
          <FloatingOptionsContainer {...getFloatingProps()}>
            <VStack style={{ minWidth: 120 }}>
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
    </Wrapper>
  )
}
