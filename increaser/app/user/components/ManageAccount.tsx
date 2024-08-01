import { ComponentWithActiveState } from '@lib/ui/props'
import { Text } from '@lib/ui/text'
import { useFloatingOptions } from '@lib/ui/floating/useFloatingOptions'
import { OptionItem } from '@lib/ui/select/OptionItem'
import { FloatingFocusManager } from '@floating-ui/react'
import { OptionContent } from '@lib/ui/select/OptionContent'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { TitledFloatingOptionsContainer } from '@lib/ui/floating/TitledFloatingOptionsContainer'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import styled, { css } from 'styled-components'
import { IconButton } from '@lib/ui/buttons/IconButton'
import { getColor } from '@lib/ui/theme/getters'
import { UserIcon } from '@lib/ui/icons/UserIcon'
import { LogOutIcon } from '@lib/ui/icons/LogOutIcon'
import { useAuthSession } from '../../auth/hooks/useAuthSession'
import { useMemo } from 'react'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { useRouter } from 'next/router'
import { UserPenIcon } from '@lib/ui/icons/UserPenIcon'
import { getAppPath } from '@increaser/ui/navigation/app'

const Container = styled(IconButton)<ComponentWithActiveState>`
  border: 1px solid transparent;
  ${({ isActive }) =>
    isActive &&
    css`
      color: ${getColor('contrast')};
      background: ${getColor('background')};
      border-color: ${getColor('text')};
    `}
`

export const ManageAccount = () => {
  const [, setAuthSession] = useAuthSession()
  const { email } = useAssertUserState()
  const { push } = useRouter()

  const options = useMemo(
    () => [
      {
        name: 'Public profile',
        icon: <UserPenIcon />,
        onSelect: () => {
          push(getAppPath('profile'))
        },
      },
      {
        name: 'Sign out',
        icon: <LogOutIcon />,
        onSelect: () => {
          setAuthSession(null)
        },
      },
    ],
    [push, setAuthSession],
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
    floatingOptionsWidthSameAsOpener: false,
    selectedIndex: null,
    placement: 'bottom-start',
    options: options.map(({ name }) => name),
  })

  return (
    <>
      <Container
        title="Your account"
        icon={<UserIcon />}
        isActive={isOpen}
        size="l"
        {...getReferenceProps()}
        kind="secondary"
      />

      {isOpen && (
        <FloatingFocusManager context={context} modal returnFocus>
          <TitledFloatingOptionsContainer title={email} {...getFloatingProps()}>
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
          </TitledFloatingOptionsContainer>
        </FloatingFocusManager>
      )}
    </>
  )
}
