import styled, { css } from 'styled-components'
import { DayOverviewSet } from './DayOverviewProvider'
import { getColor } from '@lib/ui/theme/getters'
import { interactive } from '@lib/ui/css/interactive'
import {
  ComponentWithActiveState,
  ComponentWithValueProps,
} from '@lib/ui/props'
import { SetItem } from '../SetItem'
import { useMemo } from 'react'
import { EditIcon } from '@lib/ui/icons/EditIcon'
import { useActiveSet } from '../ActiveSetProvider'
import { TrashBinIcon } from '@lib/ui/icons/TrashBinIcon'
import { useDeleteSetMutation } from '../../api/useDeleteSetMutation'
import { useFloatingOptions } from '@lib/ui/floating/useFloatingOptions'
import { FloatingFocusManager } from '@floating-ui/react'
import { TitledFloatingOptionsContainer } from '@lib/ui/floating/TitledFloatingOptionsContainer'
import { HStack, VStack } from '@lib/ui/css/stack'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { useAssertUserState } from '../../../user/UserStateContext'
import { OptionItem } from '@lib/ui/select/OptionItem'
import { OptionContent } from '@lib/ui/select/OptionContent'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { Text } from '@lib/ui/text'
import { EmojiTextPrefix } from '@lib/ui/text/EmojiTextPrefix'
import {
  dotSeparator,
  HStackSeparatedBy,
} from '@lib/ui/layout/StackSeparatedBy'
import { getIntervalDuration } from '@lib/utils/interval/getIntervalDuration'
import { isEmpty } from '@lib/utils/array/isEmpty'

const Container = styled(SetItem)<ComponentWithActiveState>`
  ${interactive};

  &:hover {
    background: ${getColor('foregroundExtra')};
  }

  height: 100%;
  outline: none;

  ${({ isActive }) =>
    isActive &&
    css`
      border: 1px solid ${getColor('text')};
      background: ${getColor('foregroundExtra')};
    `}
`

export const SetItemOverview = ({
  value,
}: ComponentWithValueProps<DayOverviewSet>) => {
  const [, setActiveSet] = useActiveSet()
  const { mutate: deleteSet } = useDeleteSetMutation()

  const { projects } = useAssertUserState()

  const options = useMemo(() => {
    if (!value.isEditable) {
      return []
    }
    return [
      {
        name: 'Edit',
        icon: <EditIcon />,
        onSelect: () => {
          setActiveSet({
            ...value,
            initialSet: value,
          })
        },
      },
      {
        name: 'Delete',
        icon: <TrashBinIcon />,
        onSelect: () => {
          deleteSet(value)
        },
      },
    ]
  }, [deleteSet, setActiveSet, value])

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

  const { name, emoji } = projects[value.projectId]

  return (
    <>
      <Container
        {...getReferenceProps()}
        isActive={isOpen}
        projectId={value.projectId}
      />

      {isOpen && (
        <FloatingFocusManager context={context} modal returnFocus>
          <TitledFloatingOptionsContainer
            title={
              <HStackSeparatedBy
                separator={dotSeparator}
                alignItems="center"
                gap={8}
                wrap="nowrap"
              >
                <Text nowrap>
                  <EmojiTextPrefix marginRight={4} emoji={emoji} /> {name}
                </Text>
                <Text nowrap>
                  {formatDuration(getIntervalDuration(value), 'ms', {
                    minUnit: 'min',
                    kind: 'long',
                  })}
                </Text>
              </HStackSeparatedBy>
            }
            {...getFloatingProps()}
          >
            <VStack>
              {isEmpty(options) ? (
                <Text color="supporting" size={14}>
                  This session can't be edited or deleted.
                </Text>
              ) : (
                options.map(({ name, onSelect, icon }, index) => {
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
                })
              )}
            </VStack>
          </TitledFloatingOptionsContainer>
        </FloatingFocusManager>
      )}
    </>
  )
}
