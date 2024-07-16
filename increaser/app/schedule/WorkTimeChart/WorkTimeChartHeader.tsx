import { HStack } from '@lib/ui/layout/Stack'
import { useWorkTimeChartDaysCount } from './useWorkTimeChartDaysCount'
import { pluralize } from '@lib/utils/pluralize'
import { SectionTitle } from '@lib/ui/text/SectionTitle'
import { MinimalisticToggle } from '@lib/ui/inputs/MinimalisticToggle'
import { useWorkTimeChartPreferences } from './state/useWorkTimeChartPreferences'

export const WorkTimeChartHeader = () => {
  const daysCount = useWorkTimeChartDaysCount()
  const [{ includeToday }, setPreferences] = useWorkTimeChartPreferences()

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
