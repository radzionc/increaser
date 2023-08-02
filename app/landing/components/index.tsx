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

const FullHeightContainer = styled(VStack)`
  background: ${({ theme }) => theme.colors.background.toCssValue()};
  min-height: 100vh;
`

export const LandingPage = () => {
  return (
    <VStack>
      <FullHeightContainer>
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
    </VStack>
  )
}
