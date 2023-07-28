import { ProjectsProvider } from 'projects/components/ProjectsProvider'
import styled from 'styled-components'
import { VStack } from '@increaser/ui/ui/Stack'

import { ClosingArgument } from './ClosingArgument'
import { DemoSlice } from './Demo'
import { FocusSlice } from './Focus/FocusSlice'
import { FounderNote } from './FounderNote'
import { HabitsSlice } from './Habits/HabitsSlice'
import { HeroSlice } from './HeroSlice'
import { LandingUserStateProvider } from './LandingUserStateProvider'
import { PrimaryTestimonialsSlice } from './testimonials/PrimaryTestimonialsSlice'
import { TimeBoxingSlice } from './TimeBlocking/TimeBoxingSlice'
import { Topbar } from './Topbar'
import Head from 'next/head'

const FullHeightContainer = styled(VStack)`
  background: ${({ theme }) => theme.colors.background.toCssValue()};
  min-height: 100vh;
`

export const LandingPage = () => {
  return (
    <div>
      <Head>
        <meta
          name="description"
          content="Powerful and easy-to-use online time tracking and time management app. For personal growth, not corporate cringe. Works on all devices."
        />
        <title>Achieve Your Goals Via Intelligent Effort</title>
      </Head>
      <FullHeightContainer gap={20}>
        <Topbar />
        <HeroSlice />
      </FullHeightContainer>
      <LandingUserStateProvider>
        <ProjectsProvider>
          <FocusSlice />
          <HabitsSlice />
          <TimeBoxingSlice />
          <DemoSlice />
          {/* <ReportsSlice /> */}
        </ProjectsProvider>
      </LandingUserStateProvider>
      <PrimaryTestimonialsSlice />
      {/* <SecondaryTestimonialSlice /> */}
      <FounderNote />
      <ClosingArgument />
    </div>
  )
}
