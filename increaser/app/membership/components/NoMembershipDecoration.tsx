import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { TriangleAlertIcon } from '@lib/ui/icons/TriangleAlertIcon'
import { getColor } from '@lib/ui/theme/getters'
import styled from 'styled-components'

const Container = styled(IconWrapper)`
  color: ${getColor('alert')};
  margin-right: 4px;
`

export const NoMembershipDecoration = () => {
  return (
    <Container>
      <TriangleAlertIcon />
    </Container>
  )
}
