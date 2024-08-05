import { useWeekday } from '@lib/ui/hooks/useWeekday'
import { SelectedWeekdayProvider } from '@lib/ui/time/SelectedWeekdayProvider'
import { ActiveSetProvider } from './ActiveSetProvider'
import { SetsManagerContent } from './SetsManageContent'

export const SetsManager = () => {
  const weekday = useWeekday()

  return (
    <SelectedWeekdayProvider initialValue={weekday}>
      <ActiveSetProvider initialValue={null}>
        <SetsManagerContent />
      </ActiveSetProvider>
    </SelectedWeekdayProvider>
  )
}
