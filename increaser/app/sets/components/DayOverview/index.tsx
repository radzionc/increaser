import styled from 'styled-components'
import { Panel } from '@lib/ui/panel/Panel'
import { horizontalPaddingInPx } from './config'
import { DayOverviewProvider } from './DayOverviewProvider'
import { useWeekday } from '@lib/ui/hooks/useWeekday'
import { SelectedWeekdayProvider } from '@lib/ui/time/SelectedWeekdayProvider'
import { ActiveSetProvider } from './ActiveSetProvider'
import { DayOverviewConent } from './DayOverviewContent'

const Container = styled(Panel)`
  height: 100%;
`

export const DayOverview = () => {
  const weekday = useWeekday()
  return (
    <SelectedWeekdayProvider initialValue={weekday}>
      <ActiveSetProvider initialValue={null}>
        <DayOverviewProvider>
          <Container
            padding={horizontalPaddingInPx}
            withSections
            kind="secondary"
          >
            <DayOverviewConent />
          </Container>
        </DayOverviewProvider>
      </ActiveSetProvider>
    </SelectedWeekdayProvider>
  )
}
