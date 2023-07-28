import { useMainApi } from 'api/hooks/useMainApi'
import { PaddleIFrame } from 'membership/components/PaddleIFrame'
import { PaddleModal } from 'membership/components/PaddleModal'
import { useCallback, useState } from 'react'
import { useMutation } from 'react-query'
import { handleApiError } from 'server/handleApiError'
import { ShyTextButton } from '@increaser/ui/ui/buttons/ShyTextButton'
import { SubmitFormButton } from '@increaser/ui/ui/buttons/SubmitFormButton'
import { Form } from '@increaser/ui/ui/Form/Form'
import { TextArea } from '@increaser/ui/ui/inputs/TextArea'
import { Modal } from '@increaser/ui/ui/Modal'
import { Text } from '@increaser/ui/ui/Text'
import { useAssertUserState } from 'user/state/UserStateContext'

export const askForRefundMutation = `
mutation askForRefund($askForRefundInput: AskForRefundInput!) {
  askForRefund(askForRefundInput: $askForRefundInput)
}
`

export const Refund = () => {
  const [isRefundOpen, setIsRefundOpen] = useState(false)
  const [isPaddleOpen, setIsPaddleOpen] = useState(false)

  const [refundDescription, setRefundDescription] = useState('')

  const onSuccess = useCallback(() => {
    setIsPaddleOpen(false)
  }, [])

  const { query } = useMainApi()

  const { mutate: submitRefund, isLoading } = useMutation(async () => {
    setIsRefundOpen(false)

    const variables = {
      askForRefundInput: {
        description: refundDescription,
      },
    }

    try {
      await query({
        query: askForRefundMutation,
        variables,
      })
    } catch (error) {
      handleApiError({
        error,
        info: {
          context: 'fail to ask for refund',
        },
      })
    }

    setIsPaddleOpen(true)
  })

  const { membership } = useAssertUserState()

  const subscription = membership?.subscription

  if (!subscription) return null

  return (
    <>
      <ShyTextButton
        text="Ask for a refund"
        onClick={() => setIsRefundOpen(true)}
      />
      {isRefundOpen && (
        <Modal
          width={360}
          onClose={() => setIsRefundOpen(false)}
          renderContent={() => (
            <Form
              onSubmit={submitRefund}
              content={
                <TextArea
                  label="Description"
                  value={refundDescription}
                  placeholder="Please, tell us why you are asking for a refund"
                  onValueChange={setRefundDescription}
                />
              }
              actions={
                <>
                  <SubmitFormButton
                    isLoading={isLoading}
                    text="Ask for a refund"
                  />
                  <Text color="regular" size={14} centered>
                    The refund will be handled in two working days.
                  </Text>
                </>
              }
            />
          )}
        />
      )}

      {isPaddleOpen && (
        <PaddleModal
          onClose={() => setIsPaddleOpen(false)}
          renderContent={() => (
            <PaddleIFrame
              override={subscription.cancelUrl}
              product={subscription.planId}
              onSuccess={onSuccess}
              onClose={() => setIsPaddleOpen(false)}
            />
          )}
        />
      )}
    </>
  )
}
