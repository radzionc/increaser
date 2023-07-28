import { useAuthFlow } from 'auth/components/AuthFlow/AuthFlowContext'
import { Button } from '@increaser/ui/ui/buttons/Button'
interface Props {
  text?: string
}

export const CTA = ({ text = 'Start now' }: Props) => {
  const { setAuthFlowPurpose } = useAuthFlow()

  return (
    <Button
      onClick={() => setAuthFlowPurpose('signUp')}
      kind="reversed"
      size="xl"
    >
      {text}
    </Button>
  )
}
