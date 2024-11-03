import { IconButton } from '@lib/ui/buttons/IconButton'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import {
  ComponentWithActiveState,
  RemovableComponentProps,
} from '@lib/ui/props'
import styled, { css } from 'styled-components'
import { tightListItemMinHeight } from '@lib/ui/list/tightListItemConfig'
import { MoreHorizontalIcon } from '@lib/ui/icons/MoreHorizontalIcon'
import { useMemo } from 'react'
import { EditIcon } from '@lib/ui/icons/EditIcon'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { useCurrentTaskFactory } from '../../taskFactories/CurrentTaskFactoryProvider'
import { TrashBinIcon } from '@lib/ui/icons/TrashBinIcon'
import { useDeleteUserEntityMutation } from '../../userEntity/api/useDeleteUserEntityMutation'
import { useFloatingOptions } from '@lib/ui/floating/useFloatingOptions'
import { getColor } from '@lib/ui/theme/getters'
import { VStack, HStack, hStack } from '@lib/ui/css/stack'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { OptionContent } from '@lib/ui/select/OptionContent'
import { OptionItem } from '@lib/ui/select/OptionItem'
import { FloatingOptionsContainer } from '@lib/ui/floating/FloatingOptionsContainer'
import { FloatingFocusManager } from '@floating-ui/react'
import { Text } from '@lib/ui/text'
import { UnlinkIcon } from '@lib/ui/icons/UnlinkIcon'
import { TaskFactoryItemContent } from '../../taskFactories/TaskFactoryItemContent'

const Container = styled(IconButton)<ComponentWithActiveState>`
  ${sameDimensions(tightListItemMinHeight)}
  border: 1px transparent solid;
  display: none;

  ${({ isActive }) =>
    isActive &&
    css`
      display: block;
      color: ${getColor('contrast')};
      background: ${getColor('background')};
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
    display: block;
  }

  @media (hover: none) {
    ${Container} {
      display: block;
    }
  }
`

export const ManageGoalTaskFactory = ({
  onRemove,
}: RemovableComponentProps) => {
  const [, setActiveItemId] = useActiveItemId()
  const { id } = useCurrentTaskFactory()

  const { mutate: deleteTaskFactory } =
    useDeleteUserEntityMutation('taskFactory')

  const options = useMemo(
    () => [
      {
        name: 'Edit',
        icon: <EditIcon />,
        onSelect: () => {
          setActiveItemId(id)
        },
      },
      {
        name: 'Unlink',
        icon: <UnlinkIcon />,
        onSelect: onRemove,
      },
      {
        name: 'Delete',
        icon: <TrashBinIcon />,
        onSelect: () => {
          deleteTaskFactory(id)
        },
      },
    ],
    [deleteTaskFactory, id, onRemove, setActiveItemId],
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
      <TaskFactoryItemContent />
      <Container
        {...getReferenceProps()}
        isActive={isOpen}
        kind="secondary"
        icon={<MoreHorizontalIcon />}
        title="Manage recurring task"
      />
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
