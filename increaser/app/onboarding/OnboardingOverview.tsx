import { HStack, VStack } from '@lib/ui/layout/Stack'
import {
  useOnboarding,
  onboardingSteps,
  onboardingStepTargetName,
} from './OnboardingProvider'
import { Text } from '@lib/ui/text'
import styled, { css } from 'styled-components'
import { round } from '@lib/ui/css/round'
import { getColor, matchColor } from '@lib/ui/theme/getters'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { transition } from '@lib/ui/css/transition'
import { interactive } from '@lib/ui/css/interactive'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { CheckIcon } from '@lib/ui/icons/CheckIcon'
import { centerContent } from '@lib/ui/css/centerContent'
import { without } from '@lib/utils/array/without'
import { OnboardingSection } from './OnboardingSection'

const Container = styled(HStack)<{ isCurrent: boolean; isEnabled: boolean }>`
  color: ${matchColor('isCurrent', {
    true: 'contrast',
    false: 'textSupporting',
  })};

  align-items: center;
  gap: 8px;
  ${verticalPadding(8)}
  ${transition};

  ${({ isEnabled }) => isEnabled && interactive};
  ${({ isCurrent, isEnabled }) =>
    isEnabled &&
    !isCurrent &&
    css`
      &:hover {
        color: ${getColor('text')};
      }
    `}
`

const CheckContainer = styled.div<{ isCompleted: boolean }>`
  ${round};
  ${centerContent};
  background: ${getColor('mistExtra')};

  ${sameDimensions(24)};

  color: ${matchColor('isCompleted', {
    true: 'success',
    false: 'transparent',
  })};
  font-size: 14px;
`

export const OnboardingOverview = () => {
  const { currentStep, setCurrentStep, completedSteps } = useOnboarding()

  return (
    <OnboardingSection
      title={
        <HStack alignItems="center" gap={8}>
          <Text>Quick Setup </Text>
          <Text color="success">
            {completedSteps.length} / {onboardingSteps.length}
          </Text>
        </HStack>
      }
    >
      <VStack gap={4}>
        {onboardingSteps.map((step) => {
          const isCompleted = completedSteps.includes(step)
          const isCurrent = currentStep === step
          const isEnabled =
            isCompleted ||
            without(onboardingSteps, ...completedSteps)[0] === step

          return (
            <Container
              isCurrent={isCurrent}
              onClick={isEnabled ? () => setCurrentStep(step) : undefined}
              isEnabled={isEnabled}
            >
              <CheckContainer isCompleted={isCompleted}>
                <IconWrapper>
                  <CheckIcon />
                </IconWrapper>
              </CheckContainer>
              <Text weight="semibold">{onboardingStepTargetName[step]}</Text>
            </Container>
          )
        })}
      </VStack>
    </OnboardingSection>
  )
}
