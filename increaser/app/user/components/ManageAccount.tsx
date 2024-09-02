import { ComponentWithActiveState } from '@lib/ui/props'
import { Text } from '@lib/ui/text'
import { useFloatingOptions } from '@lib/ui/floating/useFloatingOptions'
import { OptionItem } from '@lib/ui/select/OptionItem'
import { FloatingFocusManager } from '@floating-ui/react'
import { OptionContent } from '@lib/ui/select/OptionContent'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { TitledFloatingOptionsContainer } from '@lib/ui/floating/TitledFloatingOptionsContainer'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import styled, { css, useTheme } from 'styled-components'
import { getColor } from '@lib/ui/theme/getters'
import { UserIcon } from '@lib/ui/icons/UserIcon'
import { LogOutIcon } from '@lib/ui/icons/LogOutIcon'
import { useAuthSession } from '../../auth/hooks/useAuthSession'
import { useMemo } from 'react'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { useRouter } from 'next/router'
import { UserPenIcon } from '@lib/ui/icons/UserPenIcon'
import { getAppPath } from '@increaser/ui/navigation/app'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { round } from '@lib/ui/css/round'
import { useIsPayingUser } from '../../membership/hooks/useIsPayingUser'
import { useHasFreeTrial } from '../../membership/hooks/useHasFreeTrial'
import { CrownIcon } from '@lib/ui/icons/CrownIcon'
import { Tag } from '@lib/ui/tags/Tag'
import { HeaderActionButton } from '../../navigation/HeaderActionButton'
import { FileDownIcon } from '@lib/ui/icons/FileDownIcon'
import { useExportUserData } from '@increaser/ui/user/hooks/useExportUserData'

const Container = styled(HeaderActionButton)<ComponentWithActiveState>`
  ${({ isActive }) =>
    isActive &&
    css`
      color: ${getColor('contrast')};
      background: ${getColor('background')};
      border-color: ${getColor('text')};
    `}
`

const Indicator = styled.div`
  position: absolute;
  right: -2px;
  top: -4px;
  ${sameDimensions(8)};
  ${round};
`

const Wrapper = styled(IconWrapper)`
  position: relative;
  overflow: visible;
`

export const ManageAccount = () => {
  const [, setAuthSession] = useAuthSession()
  const { email } = useAssertUserState()
  const { push } = useRouter()

  const isPayingUser = useIsPayingUser()
  const hasFreeTrial = useHasFreeTrial()

  const { colors } = useTheme()
  const exportUserData = useExportUserData()

  const options = useMemo(
    () => [
      {
        name: 'Membership',
        icon: <CrownIcon />,
        onSelect: () => {
          push(getAppPath('membership'))
        },
        indicator: (
          <Tag
            $color={
              isPayingUser
                ? colors.success
                : hasFreeTrial
                  ? colors.idle
                  : colors.alert
            }
          >
            {isPayingUser ? 'active' : hasFreeTrial ? 'free trial' : 'inactive'}
          </Tag>
        ),
      },
      {
        name: 'Public profile',
        icon: <UserPenIcon />,
        onSelect: () => {
          push(getAppPath('profile'))
        },
      },
      {
        name: 'Export data',
        icon: <FileDownIcon />,
        onSelect: () => {
          exportUserData()
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
    [
      colors.alert,
      colors.idle,
      colors.success,
      exportUserData,
      hasFreeTrial,
      isPayingUser,
      push,
      setAuthSession,
    ],
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
      <Container isActive={isOpen} {...getReferenceProps()}>
        <Wrapper>
          {!isPayingUser && (
            <Indicator
              style={{
                background: (hasFreeTrial
                  ? colors.idle
                  : colors.alert
                ).toCssValue(),
              }}
            />
          )}
          <UserIcon />
        </Wrapper>
      </Container>

      {isOpen && (
        <FloatingFocusManager context={context} modal returnFocus>
          <TitledFloatingOptionsContainer title={email} {...getFloatingProps()}>
            <VStack>
              {options.map(({ name, onSelect, icon, indicator }, index) => {
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
                        {indicator}
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
