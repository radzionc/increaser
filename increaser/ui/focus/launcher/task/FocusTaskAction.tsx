import { KindProp, NameProp, OnClickProp, ValueProp } from '@lib/ui/props'
import styled from 'styled-components'
import { UnstyledButton } from '@lib/ui/buttons/UnstyledButton'
import { hStack } from '@lib/ui/css/stack'
import { round } from '@lib/ui/css/round'
import { getColor } from '@lib/ui/theme/getters'
import { centerContent } from '@lib/ui/css/centerContent'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { text } from '@lib/ui/text'
import { match } from '@lib/utils/match'
import { getHoverVariant } from '@lib/ui/theme/getHoverVariant'

type Kind = 'regular' | 'idle'

const Button = styled(UnstyledButton)<KindProp<Kind>>`
  height: 100%;
  ${horizontalPadding(4)}
  ${hStack({
    gap: 4,
    alignItems: 'center',
  })}
  ${({ kind }) =>
    text({
      color: match(kind, {
        regular: () => 'regular',
        idle: () => 'idle',
      }),
    })}

  &:hover {
    color: ${({ kind }) =>
      match(kind, {
        regular: () => getHoverVariant('text'),
        idle: () => getHoverVariant('idle'),
      })};
  }
`

const Circle = styled.div`
  ${round}
  height: 16px;
  min-width: 16px;
  ${horizontalPadding(4)}
  ${centerContent};
  background-color: ${getColor('mist')};
`

export type FocusTaskActionProps = NameProp &
  ValueProp<number> &
  OnClickProp &
  Partial<KindProp<Kind>>

export const FocusTaskAction = ({
  name,
  value,
  onClick,
  kind = 'regular',
}: FocusTaskActionProps) => {
  return (
    <Button kind={kind} onClick={onClick}>
      {name}
      <Circle>{value}</Circle>
    </Button>
  )
}
