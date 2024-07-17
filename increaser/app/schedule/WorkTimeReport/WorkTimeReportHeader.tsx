import { HStack } from '@lib/ui/layout/Stack'
import { pluralize } from '@lib/utils/pluralize'
import { SectionTitle } from '@lib/ui/text/SectionTitle'
import { MinimalisticToggle } from '@lib/ui/inputs/MinimalisticToggle'
import { useWorkTimeReportDaysCount } from './hooks/useWorkTimeReportDaysCount'
import { useWorkTimeReportPreferences } from './state/useWorkTimeReportPreferences'

export const WorkTimeReportHeader = () => {
  const daysCount = useWorkTimeReportDaysCount()
  const [{ includeToday }, setPreferences] = useWorkTimeReportPreferences()

  return (
    <HStack
      fullWidth
      alignItems="center"
      justifyContent="space-between"
      gap={20}
    >
      <SectionTitle>
        {`Last ${pluralize(daysCount, 'day')} report`}
      </SectionTitle>
      <MinimalisticToggle
        value={includeToday}
        onChange={(includeToday) =>
          setPreferences((state) => ({
            ...state,
            includeToday,
          }))
        }
        label="include today"
      />
    </HStack>
  )
}
