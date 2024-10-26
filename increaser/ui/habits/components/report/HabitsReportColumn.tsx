import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { VStack } from '@lib/ui/css/stack'
import { ComponentWithChildrenProps, TitledComponentProps } from '@lib/ui/props'
import { Text } from '@lib/ui/text'
import styled from 'styled-components'
import { trackHabitsConfig } from '../track/config'
import { getColor } from '@lib/ui/theme/getters'
import { TrackHabitsColumn } from '../track/TrackHabitsColumn'

const Container = styled(VStack)`
  align-items: end;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
`

const Label = styled(Text)`
  line-height: ${toSizeUnit(trackHabitsConfig.labelHeight)};
  color: ${getColor('textShy')};
`

const Content = styled(TrackHabitsColumn)`
  justify-items: end;
  color: ${getColor('textSupporting')};
`

export const HabitsReportColumn = ({
  children,
  title,
}: ComponentWithChildrenProps & TitledComponentProps) => {
  return (
    <Container>
      <Label>{title}</Label>
      <Content>{children}</Content>
    </Container>
  )
}
