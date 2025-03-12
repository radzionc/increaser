import { ConfirmEmailAuthView } from '@lib/ui/auth/ConfirmEmailAuthView'
import { useHandleQueryParams } from '@product/app/navigation/hooks/useHandleQueryParams'
import { useRouter } from 'next/router'
import { useState } from 'react'

interface EmailConfirmQueryParams {
  email: string
}

export const EmailConfirmContent = () => {
  const [email, setEmail] = useState<string | undefined>()
  useHandleQueryParams<EmailConfirmQueryParams>(({ email }) => setEmail(email))

  const { back } = useRouter()

  return <ConfirmEmailAuthView sender="increaser" email={email} onBack={back} />
}
