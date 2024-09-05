import { WEEKDAYS } from '@lib/utils/time'
import styled from 'styled-components'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { uniformColumnGrid } from '@lib/ui/css/uniformColumnGrid'
import { WeekdayOption } from './WeekdayOption'
import { InvisibleHTMLRadio } from '@lib/ui/inputs/InvisibleHTMLRadio'
import { useSelectedWeekday } from '@lib/ui/time/SelectedWeekdayProvider'
import { useWeekday } from '@lib/ui/hooks/useWeekday'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { dayOverviewConfig } from '../config'

const Container = styled.div`
  ${uniformColumnGrid({
    gap: 1,
    fullWidth: true,
  })}
  && {
    ${verticalPadding(0)};
  }
  height: ${toSizeUnit(dayOverviewConfig.interactiveSectionHeight)};
`

export const WeekNavigation = () => {
  const currentWeekday = useWeekday()
  const [selectedWeekday, setSelectedWeekday] = useSelectedWeekday()

  return (
    <Container>
      {WEEKDAYS.map((name, index) => {
        const isActive = selectedWeekday === index
        const isEnabled = index <= currentWeekday
        return (
          <WeekdayOption key={index} isActive={isActive} isEnabled={isEnabled}>
            {isEnabled && (
              <InvisibleHTMLRadio
                isSelected={isActive}
                groupName="week-navigation"
                value={index}
                onSelect={() => setSelectedWeekday(index)}
              />
            )}
            {name.slice(0, 3)}
          </WeekdayOption>
        )
      })}
    </Container>
  )
}
