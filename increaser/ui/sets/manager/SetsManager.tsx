import { useWeekday } from '@lib/ui/hooks/useWeekday'
import { SelectedWeekdayProvider } from '@lib/ui/time/SelectedWeekdayProvider'
import { ActiveSetProvider } from './ActiveSetProvider'
import { SetsManagerContent } from './SetsManageContent'
import { SetsManagerContainer } from './SetsManagerContainer'
import { ComponentProps } from 'react'

export const SetsManager = (
  props: ComponentProps<typeof SetsManagerContainer>,
) => {
  const weekday = useWeekday()

  return (
    <SelectedWeekdayProvider initialValue={weekday}>
      <ActiveSetProvider initialValue={null}>
        <SetsManagerContainer {...props}>
          <SetsManagerContent />
        </SetsManagerContainer>
      </ActiveSetProvider>
    </SelectedWeekdayProvider>
  )
}
