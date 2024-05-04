import { TrackTimeProvider } from './TrackTimeProvider'
import { WeekdaySelector } from './WeekdaySelector'
import { DayOverview } from './DayOverview'
import { Panel } from '@lib/ui/panel/Panel'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { SectionTitle } from '@lib/ui/text/SectionTitle'
import { Button } from '@lib/ui/buttons/Button'
import { useState } from 'react'
import { ProjectSelector } from './ProjectSelector'
import { AddSessionView } from './AddSessionView'

export const TrackTimeView = () => {
  const [isAddingSession, setIsAddingSession] = useState(false)
  return (
    <TrackTimeProvider>
      <VStack gap={16} style={{ maxWidth: 440 }}>
        <HStack
          fullWidth
          alignItems="center"
          justifyContent="space-between"
          gap={20}
          wrap="wrap"
        >
          <SectionTitle>
            {isAddingSession ? 'Add session' : 'Manage sessions'}
          </SectionTitle>
          <HStack alignItems="center" gap={8}>
            {isAddingSession && <ProjectSelector />}
            <WeekdaySelector />
          </HStack>
        </HStack>
        <Panel kind="secondary" withSections>
          {!isAddingSession && (
            <VStack alignItems="end">
              <Button onClick={() => setIsAddingSession(true)}>
                Add Session
              </Button>
            </VStack>
          )}
          {isAddingSession ? (
            <AddSessionView onFinish={() => setIsAddingSession(false)} />
          ) : (
            <DayOverview />
          )}
        </Panel>
      </VStack>
    </TrackTimeProvider>
  )
}
