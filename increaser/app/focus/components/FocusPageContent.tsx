import { ErrorBoundary } from '@increaser/app/errors/components/ErrorBoundary'
import { useFocus } from '@increaser/app/focus/hooks/useFocus'
import { useProjects } from '@increaser/app/projects/hooks/useProjects'
import { useOnWindowCloseAlert } from '@lib/ui/hooks/useOnWindowCloseAlert'
import { formatDurationAsADigitalClock } from '@lib/utils/time/formatDuration'
import styled from 'styled-components'
import { ShyTextButton } from '@lib/ui/buttons/ShyTextButton'
import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { centerContent } from '@lib/ui/css/centerContent'
import { MS_IN_SEC } from '@lib/utils/time'

import { FinishSession } from './FinishSession'
import { FocusAssistance } from './FocusAssistance'
import { FocusGoal } from './FocusGoal'
import { FocusSounds } from './FocusSounds'
import { SessionProgress } from './SessionProgress'
import { SessionStartedAt } from './SessionStartedAt'
import { SlidingTime } from '@increaser/app/ui/SlidingTime'
import { RhytmicRerender } from '@lib/ui/base/RhytmicRerender'
import { useCurrentFocus } from './CurrentFocusProvider'
import { ShrinkFocusView } from './ShrinkFocusView'
import { DayOverview } from '@increaser/app/sets/components/DayOverview'
import { PageMetaTags } from '@lib/next-ui/metadata/PageMetaTags'
import { FocusProject } from './FocusProject'

const Container = styled.div`
  max-height: 100%;
  overflow: auto;
  height: 100%;
  width: 100%;
  display: flex;
  padding: 40px 4% 20px 4%;
`

const BlockWrapper = styled.div`
  height: 60%;
  width: 100%;
  position: relative;
  ${centerContent};

  @media (max-width: 400px) {
    height: 80%;
  }
`

const TimeWrapper = styled.div`
  position: absolute;
  z-index: 1;
  width: 100%;
`

const TimeContent = styled.div`
  position: relative;
  ${centerContent};
`

const Side = styled(VStack)`
  gap: 20px;
  width: 320px;
`

const Content = styled(HStack)`
  flex: 1;
`

const PositionSettings = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
`

const PositionSessionInfo = styled.div`
  position: absolute;
  top: 12px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 4px;
`

export const FocusPageContent = () => {
  const { cancel } = useFocus()

  const { projectId, startedAt } = useCurrentFocus()

  const { projectsRecord } = useProjects()

  useOnWindowCloseAlert('Please stop the timer first')

  const project = projectsRecord[projectId]
  if (!project) return null

  const getSeconds = () => (Date.now() - startedAt) / MS_IN_SEC

  return (
    <>
      <RhytmicRerender
        render={() => (
          <PageMetaTags title={formatDurationAsADigitalClock(getSeconds())} />
        )}
      />
      <ElementSizeAware
        render={({ setElement, size }) => (
          <Container ref={setElement}>
            {size && (
              <>
                {size.width > 1120 && (
                  <Side>
                    <ErrorBoundary>
                      <FocusSounds />
                    </ErrorBoundary>
                  </Side>
                )}
                <Content fullHeight alignItems="center" justifyContent="center">
                  <VStack
                    alignItems="center"
                    justifyContent="center"
                    fullHeight
                    style={{ width: 320 }}
                    gap={12}
                  >
                    <BlockWrapper>
                      <SessionProgress />
                      <PositionSettings>
                        <VStack gap={4}>
                          <ShrinkFocusView />
                          <FocusAssistance />
                        </VStack>
                      </PositionSettings>
                      <PositionSessionInfo>
                        <SessionStartedAt />
                        <FocusProject />
                        <FocusGoal />
                      </PositionSessionInfo>
                      <TimeWrapper>
                        <TimeContent>
                          <Text as="div" weight="bold" size={64} height="small">
                            <SlidingTime getSeconds={getSeconds} />
                          </Text>
                        </TimeContent>
                      </TimeWrapper>
                      <FinishSession
                        style={{
                          position: 'absolute',
                          height: 60,
                          bottom: -30,
                        }}
                      />
                    </BlockWrapper>
                    <div style={{ marginTop: 30 }}>
                      <ShyTextButton text="Cancel" onClick={cancel} />
                    </div>
                  </VStack>
                </Content>
                {size.width > 750 && (
                  <Side>
                    <ErrorBoundary>
                      <DayOverview />
                    </ErrorBoundary>
                  </Side>
                )}
              </>
            )}
          </Container>
        )}
      />
    </>
  )
}
