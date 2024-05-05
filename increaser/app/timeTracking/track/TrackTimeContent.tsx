import { useTrackTime } from './TrackTimeProvider'
import { WeekdaySelector } from './WeekdaySelector'
import { DayOverview } from './DayOverview'
import { Panel, panelDefaultPadding } from '@lib/ui/panel/Panel'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { SectionTitle } from '@lib/ui/text/SectionTitle'
import { Button } from '@lib/ui/buttons/Button'
import { ProjectSelector } from './ProjectSelector'
import { AddSessionView } from './AddSessionView'
import styled from 'styled-components'
import { TakeWholeSpaceAbsolutely } from '@lib/ui/css/takeWholeSpaceAbsolutely'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { ConfirmTrackAction } from './ConfirmTrackAction'

const Container = styled(VStack)`
  max-width: 440px;
  gap: 16px;
  flex: 1;
`

const Content = styled(Panel)`
  flex: 1;
`

const InternalContentWr = styled.div`
  flex: 1;
  position: relative;
`

const InternalContent = styled(TakeWholeSpaceAbsolutely)`
  overflow-y: auto;
  padding: ${toSizeUnit(panelDefaultPadding)};
`

const defaultIntervalDuration = 30

export const TrackTimeContent = () => {
  const { currentAction, setState, dayInterval } = useTrackTime()
  const isAddingSession = currentAction === 'add'

  return (
    <Container>
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
      <Content kind="secondary" withSections>
        <InternalContentWr>
          <InternalContent>
            {isAddingSession ? <AddSessionView /> : <DayOverview />}
          </InternalContent>
        </InternalContentWr>
        {isAddingSession ? (
          <ConfirmTrackAction />
        ) : (
          <VStack alignItems="end">
            <Button
              onClick={() =>
                setState((state) => ({
                  ...state,
                  currentAction: 'add',
                  interval: {
                    start:
                      dayInterval.end -
                      convertDuration(defaultIntervalDuration, 'min', 'ms'),
                    end: dayInterval.end,
                  },
                }))
              }
            >
              Add Session
            </Button>
          </VStack>
        )}
      </Content>
    </Container>
  )
}
