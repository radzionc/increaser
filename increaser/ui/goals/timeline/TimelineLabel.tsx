import { PositionAbsolutelyCenterVertically } from '@lib/ui/layout/PositionAbsolutelyCenterVertically'
import { TitleProp } from '@lib/ui/props'
import { text } from '@lib/ui/text'
import styled from 'styled-components'
import { goalsTimelineConfig } from './config'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { centerContent } from '@lib/ui/css/centerContent'

type TimeLabelProps = TitleProp & {
  left: string
}

const Content = styled.div`
  ${text({
    size: 12,
    color: 'supporting',
    nowrap: true,
  })}
  height: ${toSizeUnit(goalsTimelineConfig.timeLabelHeight)};
  ${centerContent};
`

export const TimelineLabel = ({ left, title }: TimeLabelProps) => {
  return (
    <PositionAbsolutelyCenterVertically left={left}>
      <Content>{title}</Content>
    </PositionAbsolutelyCenterVertically>
  )
}
