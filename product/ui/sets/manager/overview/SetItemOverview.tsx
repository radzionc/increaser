import { FloatingFocusManager } from '@floating-ui/react'
import { interactive } from '@lib/ui/css/interactive'
import { HStack, VStack } from '@lib/ui/css/stack'
import { TitledFloatingOptionsContainer } from '@lib/ui/floating/TitledFloatingOptionsContainer'
import { useFloatingOptions } from '@lib/ui/floating/useFloatingOptions'
import { EditIcon } from '@lib/ui/icons/EditIcon'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { TrashBinIcon } from '@lib/ui/icons/TrashBinIcon'
import {
  dotSeparator,
  HStackSeparatedBy,
} from '@lib/ui/layout/StackSeparatedBy'
import { IsActiveProp, ValueProp } from '@lib/ui/props'
import { OptionContent } from '@lib/ui/select/OptionContent'
import { OptionItem } from '@lib/ui/select/OptionItem'
import { Text } from '@lib/ui/text'
import { EmojiTextPrefix } from '@lib/ui/text/EmojiTextPrefix'
import { getColor } from '@lib/ui/theme/getters'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { getIntervalDuration } from '@lib/utils/interval/getIntervalDuration'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { useUser } from '@product/ui/user/state/user'
import { useMemo } from 'react'
import styled, { css } from 'styled-components'

import { useDeleteSetMutation } from '../../api/useDeleteSetMutation'
import { useActiveSet } from '../ActiveSetProvider'
import { SetItem } from '../SetItem'

import { DayOverviewSet } from './DayOverviewProvider'

const Container = styled(SetItem)<IsActiveProp>`
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

export const SetItemOverview = ({ value }: ValueProp<DayOverviewSet>) => {
  const [, setActiveSet] = useActiveSet()
  const { mutate: deleteSet } = useDeleteSetMutation()

  const { projects } = useUser()

  const options = useMemo(() => {
    if (value.isImmutable) {
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
                    kind: 'l',
                  })}
                </Text>
              </HStackSeparatedBy>
            }
            {...getFloatingProps()}
          >
            <VStack>
              {isEmpty(options) ? (
                <Text color="supporting" size={14}>
                  {value.isImmutable}
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
