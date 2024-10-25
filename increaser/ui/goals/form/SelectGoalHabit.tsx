import { useUser } from '@increaser/ui/user/state/user'
import styled, { css } from 'styled-components'
import {
  ComponentWithActiveState,
  ComponentWithOptionsProps,
  ValueFinishProps,
} from '@lib/ui/props'
import { useFloatingOptions } from '@lib/ui/floating/useFloatingOptions'
import { UnstyledButton } from '@lib/ui/buttons/UnstyledButton'
import { CollapsableStateIndicator } from '@lib/ui/layout/CollapsableStateIndicator'
import { FloatingFocusManager } from '@floating-ui/react'
import { OptionItem } from '@lib/ui/select/OptionItem'
import { OptionContent } from '@lib/ui/select/OptionContent'
import { TitledFloatingOptionsContainer } from '@lib/ui/floating/TitledFloatingOptionsContainer'
import { EmojiTextPrefix } from '@lib/ui/text/EmojiTextPrefix'
import { BodyPortal } from '@lib/ui/dom/BodyPortal'
import { getColor } from '@lib/ui/theme/getters'

const Container = styled(UnstyledButton)<ComponentWithActiveState>`
  ${({ isActive }) =>
    isActive &&
    css`
      background: ${getColor('foreground')};
    `}
`

export const SelectGoalHabit = ({
  onFinish,
  options,
}: ValueFinishProps<string> & ComponentWithOptionsProps<string>) => {
  const { habits } = useUser()

  const {
    getReferenceProps,
    getFloatingProps,
    getOptionProps,
    isOpen,
    activeIndex,
    setIsOpen,
    context,
  } = useFloatingOptions({
    strategy: 'fixed',
    selectedIndex: null,
    placement: 'bottom-start',
    options: options.map((option) => habits[option].name),
  })

  return (
    <>
      <Container isActive={isOpen} {...getReferenceProps()}>
        <CollapsableStateIndicator isOpen={isOpen} />
      </Container>
      {isOpen && (
        <BodyPortal>
          <FloatingFocusManager context={context} modal>
            <TitledFloatingOptionsContainer
              title="Select an existing habit"
              {...getFloatingProps()}
            >
              {options.map((option, index) => (
                <OptionItem
                  key={option}
                  isActive={activeIndex === index}
                  {...getOptionProps({
                    index,
                    onSelect: () => {
                      onFinish(option)
                      setIsOpen(false)
                    },
                  })}
                >
                  <OptionContent>
                    <EmojiTextPrefix emoji={habits[option].emoji} />
                    {habits[option].name}
                  </OptionContent>
                </OptionItem>
              ))}
            </TitledFloatingOptionsContainer>
          </FloatingFocusManager>
        </BodyPortal>
      )}
    </>
  )
}
