import { HStack, VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import styled from 'styled-components'
import {
  onboardingStepTargetName,
  onboardingSteps,
  useOnboarding,
} from './OnboardingProvider'
import { ComponentWithChildrenProps } from '@lib/ui/props'
import { Button } from '@lib/ui/buttons/Button'
import { preventDefault } from '@lib/ui/utils/preventDefault'
import { useRouter } from 'next/router'
import { AppPath } from '@increaser/ui/navigation/AppPath'

type OnboardingStepViewProps = ComponentWithChildrenProps & {
  isDisabled?: boolean | string
}

const Container = styled(VStack)`
  height: 100%;
  gap: 24px;
`

const Content = styled(VStack)`
  flex: 1;
`

const Footer = styled(HStack)`
  width: 100%;
  gap: 16px;
  justify-content: flex-end;
`

export const OnboardingStepView = ({
  isDisabled,
  children,
}: OnboardingStepViewProps) => {
  const { currentStep, setCurrentStep } = useOnboarding()
  const { push } = useRouter()

  return (
    <Container
      as="form"
      onSubmit={preventDefault(() => {
        if (isDisabled) return
        const nextStep =
          onboardingSteps[onboardingSteps.indexOf(currentStep) + 1]
        if (nextStep) {
          setCurrentStep(nextStep)
        } else {
          push(AppPath.Home)
        }
      })}
    >
      <Text size={20} weight="bold">
        {onboardingStepTargetName[currentStep]}
      </Text>
      <Content>{children}</Content>
      <Footer>
        <Button isDisabled={isDisabled} size="l">
          Next
        </Button>
      </Footer>
    </Container>
  )
}
