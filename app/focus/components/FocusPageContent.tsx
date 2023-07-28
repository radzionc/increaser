import { ErrorBoundary } from 'errors/components/ErrorBoundary'
import { useFocus } from 'focus/hooks/useFocus'
import { useFocusTimer } from 'focus/hooks/useFocusTimer'
import { useProjects } from 'projects/hooks/useProjects'
import { useEffect } from 'react'
import { Path } from 'router/Path'
import { useOnWindowCloseAlert } from 'shared/hooks/useOnWindowCloseAlert'
import { formatDuration } from 'shared/utils/formatDuration'
import styled from 'styled-components'
import { ShyTextButton } from '@increaser/ui/ui/buttons/ShyTextButton'
import { ElementSizeAware } from '@increaser/ui/ui/ElementSizeAware'
import { HStack, VStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'
import { centerContentCSS } from '@increaser/ui/ui/utils/centerContentCSS'
import { MS_IN_SEC } from 'utils/time'

import { TodayTimeline } from '../../sets/components/TodayTimeline'
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
import { useRouter } from 'next/router'

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

export const FocusPageContent = () => {
  const router = useRouter()

  const { currentSet, cancel } = useFocus()

  const { projectsRecord } = useProjects()

  useEffect(() => {
    if (!currentSet || !project) {
      router.push(Path.Home)
    }
  })

  useOnWindowCloseAlert('Please stop the timer first')
  useFocusTimer()

  if (!currentSet) return null
  const project = projectsRecord[currentSet?.projectId]
  if (!project) return null

  const startTime = currentSet?.startedAt as number
  const getSeconds = () => (Date.now() - startTime) / MS_IN_SEC

  return (
    <>
      <RhytmicRerender
        render={() => (
          <Head>
            <title>{formatDuration(getSeconds(), 's')}</title>
          </Head>
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
                    <SesssionStartedAt />
                    <BlockWrapper>
                      <SessionProgress />
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
                      <TodayTimeline />
                      <FocusAssistance />
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
