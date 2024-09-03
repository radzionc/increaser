import { Panel } from '@lib/ui/css/panel'
import { VStack } from '@lib/ui/css/stack'
import {
  ScoreboardPeriod,
  scoreboardPeriodInDays,
} from '@increaser/entities/PerformanceScoreboard'
import { SectionTitle } from '@lib/ui/text/SectionTitle'
import { ScoreboardContent } from './ScoreboardContent'

export const Scoreboard = () => {
  const scoreboardPeriod: ScoreboardPeriod = 'week'

  return (
    <Panel style={{ maxWidth: 480 }} kind="secondary">
      <VStack gap={24}>
        <SectionTitle>
          Last {scoreboardPeriodInDays[scoreboardPeriod]} days top performers
        </SectionTitle>
        <ScoreboardContent />
      </VStack>
    </Panel>
  )
}
