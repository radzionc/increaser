import { ErrorBoundary } from '@increaser/app/errors/components/ErrorBoundary'
import { formatDuration } from '@lib/utils/time/formatDuration'
import styled from 'styled-components'
import { ShyTextButton } from '@lib/ui/buttons/ShyTextButton'
import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'
import { VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { centerContent } from '@lib/ui/css/centerContent'
import { FinishSession } from './FinishSession'
import { RhytmicRerender } from '@lib/ui/base/RhytmicRerender'
import { DayOverview } from '@increaser/app/sets/components/DayOverview'
import { PageMetaTags } from '@lib/next-ui/metadata/PageMetaTags'
import { useFocus } from '@increaser/ui/focus/FocusContext'
import { useCurrentFocus } from '@increaser/ui/focus/CurrentFocusProvider'
import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { SessionProgress } from '@increaser/ui/focus/SessionProgress'
import { FocusPassedTime } from '@increaser/ui/focus/FocusPassedTime'
import { FocusAudioWidget } from '../audio/FocusAudioWidget'
import { focusPageHorizontalPadding } from './focusPageHorizontalPadding'

const Container = styled.div`
  max-height: 100%;
  overflow: auto;
  height: 100%;
  width: 100%;
  display: flex;
  padding-bottom: 20px;
  ${focusPageHorizontalPadding};
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

const Content = styled(VStack)`
  flex: 1;
`

export const FocusPageContent = () => {
  const { cancel } = useFocus()

  const { projectId, startedAt } = useCurrentFocus()

  const { projectsRecord } = useProjects()

  const project = projectsRecord[projectId]
  if (!project) return null

  return (
    <>
      <RhytmicRerender
        render={() => (
          <PageMetaTags
            title={formatDuration(Date.now() - startedAt, 'ms', {
              kind: 'digitalClock',
              minUnit: 's',
            })}
          />
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
                      <FocusAudioWidget />
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
                      <TimeWrapper>
                        <TimeContent>
                          <Text as="div" weight="bold" size={64} height="small">
                            <FocusPassedTime />
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
