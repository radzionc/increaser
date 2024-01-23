import { HStack, VStack } from '@lib/ui/layout/Stack'
import {
  useOnboarding,
  onboardingSteps,
  onboardingStepTargetName,
} from './OnboardingProvider'
import { Text } from '@lib/ui/text'
import styled from 'styled-components'
import { round } from '@lib/ui/css/round'
import { getColor, matchColor } from '@lib/ui/theme/getters'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { transition } from '@lib/ui/css/transition'
import { interactive } from '@lib/ui/css/interactive'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { CheckIcon } from '@lib/ui/icons/CheckIcon'
import { centerContent } from '@lib/ui/css/centerContent'

const Container = styled(HStack)<{ isCurrent: boolean; isEnabled: boolean }>`
  color: ${matchColor('isCurrent', {
    true: 'contrast',
    false: 'textSupporting',
  })};

  align-items: center;
  gap: 8px;
  ${verticalPadding(8)}

  ${({ isEnabled }) => isEnabled && interactive};
`

const CheckContainer = styled.div<{ isCurrent: boolean }>`
  ${round};
  ${centerContent};
  background: ${getColor('mistExtra')};

  ${sameDimensions(24)};
  ${transition};

  color: ${getColor('success')};
`

export const OnboardingOverview = () => {
  const { currentStep, setCurrentStep, completedSteps } = useOnboarding()

  return (
    <VStack gap={4}>
      {onboardingSteps.map((step) => {
        const isCompleted = completedSteps.includes(step)
        const isCurrent = currentStep === step
        const isEnabled = isCompleted || isCurrent
        return (
          <Container
            isCurrent={isCurrent}
            onClick={isEnabled ? () => setCurrentStep(step) : undefined}
            isEnabled={isEnabled}
          >
            <CheckContainer isCurrent={isCurrent}>
              {isCompleted && (
                <IconWrapper>
                  <CheckIcon />
                </IconWrapper>
              )}
            </CheckContainer>
            <Text weight="semibold">{onboardingStepTargetName[step]}</Text>
          </Container>
        )
      })}
    </VStack>
  )
}
