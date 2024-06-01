import styled from 'styled-components'
import { useHasFreeTrial } from '../hooks/useHasFreeTrial'
import { useIsPayingUser } from '../hooks/useIsPayingUser'
import { FreeTrialDecoration } from './FreeTrialDecoration'
import { NoMembershipDecoration } from './NoMembershipDecoration'
import { centerContent } from '@lib/ui/css/centerContent'

const Container = styled.div`
  position: absolute;
  right: 8px;
  ${centerContent};
`

export const MembershipNavigationDecoration = () => {
  const isPayingUser = useIsPayingUser()
  const hasFreeTrial = useHasFreeTrial()

  if (isPayingUser) {
    return null
  }

  return (
    <Container>
      {hasFreeTrial ? <FreeTrialDecoration /> : <NoMembershipDecoration />}
    </Container>
  )
}
