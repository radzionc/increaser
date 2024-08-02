import { HStack, VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { useActiveProjects } from '../hooks/useActiveProjects'
import { useProjectFilter } from './ProjectFilterProvider'
import styled, { css } from 'styled-components'
import { Button } from '@lib/ui/buttons/Button'
import { ComponentWithActiveState } from '@lib/ui/props'
import { getColor } from '@lib/ui/theme/getters'
import { useFloatingOptions } from '@lib/ui/floating/useFloatingOptions'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { ListFilterIcon } from '@lib/ui/icons/ListFilterIcon'
import { FloatingFocusManager } from '@floating-ui/react'
import { TitledFloatingOptionsContainer } from '@lib/ui/floating/TitledFloatingOptionsContainer'
import { OptionItem } from '@lib/ui/select/OptionItem'
import { OptionContent } from '@lib/ui/select/OptionContent'

const Opener = styled(Button)<ComponentWithActiveState>`
  border: 1px solid transparent;
  ${({ isActive }) =>
    isActive &&
    css`
      border-color: ${getColor('contrast')};
    `}
`

export const SetProjectFilter = () => {
  const items = useActiveProjects()
  const [, setValue] = useProjectFilter()

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
    options: items.map(({ name }) => name),
  })

  return (
    <>
      <Opener kind="ghost" size="s" isActive={isOpen} {...getReferenceProps()}>
        <HStack alignItems="center" gap={8}>
          <IconWrapper>
            <ListFilterIcon />
          </IconWrapper>
          Filter
        </HStack>
      </Opener>
      {isOpen && (
        <FloatingFocusManager context={context} modal returnFocus>
          <TitledFloatingOptionsContainer
            title="Filter by a project"
            {...getFloatingProps()}
          >
            <VStack>
              {items.map(({ emoji, name, id }, index) => {
                return (
                  <OptionItem
                    key={id}
                    isActive={activeIndex === index}
                    {...getOptionProps({
                      index,
                      onSelect: () => {
                        setValue(id)
                        setIsOpen(false)
                      },
                    })}
                  >
                    <OptionContent>
                      <HStack alignItems="center" gap={8}>
                        <Text color="contrast">{emoji}</Text>
                        <Text>{name}</Text>
                      </HStack>
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
