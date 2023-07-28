import { FREE_TRIAL_DAYS } from 'membership'
import styled from 'styled-components'
import { useIsScreenWidthLessThan } from '@increaser/ui/ui/hooks/useIsScreenWidthLessThan'
import { SameWidthChildrenRow } from '@increaser/ui/ui/Layout/SameWidthChildrenRow'
import { Modal } from '@increaser/ui/ui/Modal'
import { ModalTitleText } from '@increaser/ui/ui/Modal/ModalTitleText'
import { VStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'

import { useAuthFlow } from './AuthFlowContext'
import { AuthProviders } from './AuthProviders'
import { SignUpAgreement } from './SignUpAgreement'

const Image = styled.img`
  max-width: 100%;
  object-fit: cover;
  height: 100%;
`
const modalWidth = 760

const ExpandedModalContentWrapper = styled.div`
  padding: 28px;
`

export const SignUpOverlay = () => {
  const { setAuthFlowPurpose } = useAuthFlow()
  const isSmallScreen = useIsScreenWidthLessThan(modalWidth + 120)

  const content = (
    <VStack gap={24}>
      <VStack gap={12}>
        <ModalTitleText>Achieve your ambitions!</ModalTitleText>
        <Text color="supporting">
          Join in one click, {FREE_TRIAL_DAYS} days for free
        </Text>
      </VStack>
      <AuthProviders />
      <SignUpAgreement />
    </VStack>
  )

  if (isSmallScreen)
    return (
      <Modal
        width={360}
        hasImplicitClose={false}
        onClose={() => setAuthFlowPurpose(null)}
        renderContent={() => content}
      />
    )

  return (
    <Modal
      padding={0}
      width={modalWidth}
      hasImplicitClose={false}
      onClose={() => setAuthFlowPurpose(null)}
      renderContent={() => (
        <SameWidthChildrenRow gap={0}>
          <ExpandedModalContentWrapper>{content}</ExpandedModalContentWrapper>
          <Image src="images/sunrise.webp" />
        </SameWidthChildrenRow>
      )}
    />
  )
}
