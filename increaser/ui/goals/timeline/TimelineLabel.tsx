import { PositionAbsolutelyCenterVertically } from '@lib/ui/layout/PositionAbsolutelyCenterVertically'
import { TitledComponentProps } from '@lib/ui/props'
import { text } from '@lib/ui/text'
import styled from 'styled-components'

type TimeLabelProps = TitledComponentProps & {
  left: string
}

const Content = styled.div`
  ${text({
    size: 12,
    color: 'supporting',
    nowrap: true,
  })}
`

export const TimelineLabel = ({ left, title }: TimeLabelProps) => {
  return (
    <PositionAbsolutelyCenterVertically left={left}>
      <Content>{title}</Content>
    </PositionAbsolutelyCenterVertically>
  )
}
