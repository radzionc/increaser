import { ErrorBoundary } from 'errors/components/ErrorBoundary'
import { useFocus } from 'focus/hooks/useFocus'
import { useProjects } from 'projects/hooks/useProjects'
import { useOnWindowCloseAlert } from 'shared/hooks/useOnWindowCloseAlert'
import { formatDurationAsADigitalClock } from '@increaser/utils/time/formatDuration'
import styled from 'styled-components'
import { ShyTextButton } from '@increaser/ui/ui/buttons/ShyTextButton'
import { ElementSizeAware } from '@increaser/ui/ui/ElementSizeAware'
import { HStack, VStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'
import { centerContentCSS } from '@increaser/ui/ui/utils/centerContentCSS'
import { MS_IN_SEC } from '@increaser/utils/time'

import { FinishSession } from './FinishSession'
import { FocusAssistance } from './FocusAssistance'
import { FocusGoal } from './FocusGoal'
import { FocusSounds } from './FocusSounds'
import { FocusSuccess } from './FocusSucess'
import { SessionProgress } from './SessionProgress'
import { SesssionStartedAt } from './SessionStartedAt'
import Head from 'next/head'
import { SlidingTime } from 'ui/SlidingTime'
import { RhytmicRerender } from '@increaser/ui/ui/RhytmicRerender'
import { useCurrentFocus } from './CurrentFocusProvider'
import { ShrinkFocusView } from './ShrinkFocusView'
import { DayOverview } from 'sets/components/DayOverview'

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
  ${centerContentCSS};

  @media (max-width: 400px) {
    height: 80%;
  }
`

const TimeWrapper = styled.div`
  position: absolute;
  z-index: 1;
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
        render={() => {
          return (
            <Head>
              <title>{formatDurationAsADigitalClock(getSeconds())}</title>
            </Head>
          )
        }}
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
                    <SesssionStartedAt />
                    <BlockWrapper>
                      <SessionProgress />
                      <PositionSettings>
                        <VStack gap={4}>
                          <ShrinkFocusView />
                          <FocusAssistance />
                        </VStack>
                      </PositionSettings>
                      <TimeWrapper>
                        <Text as="div" weight="bold" size={64} height="small">
                          <SlidingTime getSeconds={getSeconds} />
                        </Text>
                      </TimeWrapper>
                      <FinishSession
                        style={{
                          position: 'absolute',
                          height: 60,
                          bottom: -30,
                        }}
                      />
                      <FocusSuccess />
                      <FocusGoal />
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
