import { WEEKDAYS } from '@lib/utils/time'
import styled from 'styled-components'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { UniformColumnGrid } from '@lib/ui/Layout/UniformColumnGrid'
import { WeekdayOption } from './WeekdayOption'
import { InvisibleHTMLRadio } from '@lib/ui/inputs/InvisibleHTMLRadio'
import { getColor } from '@lib/ui/theme/getters'
import { useSelectedWeekday } from '@lib/ui/time/SelectedWeekdayProvider'
import { useWeekday } from '@lib/ui/hooks/useWeekday'

const Container = styled(UniformColumnGrid)`
  ${verticalPadding(0)};
  /* border-bottom: 2px solid ${getColor('mist')}; */
`

export const WeekNavigation = () => {
  const currentWeekday = useWeekday()
  const [selectedWeekday, setSelectedWeekday] = useSelectedWeekday()

  return (
    <Container rowHeight={32} gap={1} fullWidth>
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
