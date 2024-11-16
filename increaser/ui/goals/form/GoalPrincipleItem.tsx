import { Text } from '@lib/ui/text'
import styled from 'styled-components'
import { getColor } from '@lib/ui/theme/getters'
import { PrefixedItemFrame } from '@lib/ui/list/PrefixedItemFrame'
import { useCurrentPrinciple } from '../../principles/CurrentPrincipleProvider'
import { useUser } from '../../user/state/user'

const Name = styled(Text)`
  text-align: start;
  color: ${getColor('contrast')};
`

export const GoalPrincipleItem = () => {
  const { name, categoryId } = useCurrentPrinciple()
  const { principleCategories } = useUser()

  return (
    <PrefixedItemFrame
      prefix={
        <Text color="contrast">{principleCategories[categoryId].emoji}</Text>
      }
    >
      <Name>{name}</Name>
    </PrefixedItemFrame>
  )
}
