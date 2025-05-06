import { FloatingFocusManager } from '@floating-ui/react'
import { round } from '@lib/ui/css/round'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { HStack, VStack } from '@lib/ui/css/stack'
import { TitledFloatingOptionsContainer } from '@lib/ui/floating/TitledFloatingOptionsContainer'
import { useFloatingOptions } from '@lib/ui/floating/useFloatingOptions'
import { CrownIcon } from '@lib/ui/icons/CrownIcon'
import { FileDownIcon } from '@lib/ui/icons/FileDownIcon'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { LogOutIcon } from '@lib/ui/icons/LogOutIcon'
import { TogglesIcon } from '@lib/ui/icons/TogglesIcon'
import { UserIcon } from '@lib/ui/icons/UserIcon'
import { IsActiveProp } from '@lib/ui/props'
import { OptionContent } from '@lib/ui/select/OptionContent'
import { OptionItem } from '@lib/ui/select/OptionItem'
import { Tag } from '@lib/ui/tags/Tag'
import { Text } from '@lib/ui/text'
import { getColor } from '@lib/ui/theme/getters'
import { getAppPath } from '@product/ui/navigation/app'
import { useExportUserData } from '@product/ui/user/hooks/useExportUserData'
import { useUser } from '@product/ui/user/state/user'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import styled, { css, useTheme } from 'styled-components'

import { useAuthSession } from '../../auth/hooks/useAuthSession'
import { useHasFreeTrial } from '../../membership/hooks/useHasFreeTrial'
import { useIsPayingUser } from '../../membership/hooks/useIsPayingUser'
import { HeaderActionButton } from '../../navigation/HeaderActionButton'

const Container = styled(HeaderActionButton)<IsActiveProp>`
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
  const { email } = useUser()
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
        name: 'Preferences',
        icon: <TogglesIcon />,
        onSelect: () => {
          push(getAppPath('preferences'))
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
