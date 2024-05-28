import { Match } from '@lib/ui/base/Match'
import { startDayNames, startDayStages } from './StartDayStage'
import { useStartDayCompletion } from './useStartDayCompletion'
import { OverdueTasksReview } from './tasks/OverdueTasksReview'
import { TodayTasksReview } from './tasks/TodayTasksReview'
import { HabitsReview } from './habits/HabitsReview'
import { PlanSection } from './PlanSection'

export const StartDayStages = () => {
  const completionRecord = useStartDayCompletion()

  return (
    <>
      {startDayStages.map((stage, index) => (
        <PlanSection
          isCompleted={completionRecord[stage]}
          title={startDayNames[stage]}
          key={stage}
          index={index + 1}
        >
          <Match
            value={stage}
            overdueTasks={() => <OverdueTasksReview />}
            todayTasks={() => <TodayTasksReview />}
            yesterdayHabits={() => <HabitsReview />}
          />
        </PlanSection>
      ))}
    </>
  )
}
