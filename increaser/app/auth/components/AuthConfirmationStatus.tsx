import { CopyText } from '@lib/ui/text/CopyText'
import { Spinner } from '@lib/ui/loaders/Spinner'
import { VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { Button } from '@lib/ui/buttons/Button'
import { InfoIcon } from '@lib/ui/icons/InfoIcon'
import Link from 'next/link'
import { AppPath } from '@increaser/ui/navigation/AppPath'
import { founderEmail } from '@increaser/config'

interface AuthConfirmationStatusProps {
  error?: Error
}

export const AuthConfirmationStatus = ({
  error,
}: AuthConfirmationStatusProps) => {
  return (
    <VStack alignItems="center" gap={20}>
      <Text
        style={{ display: 'flex' }}
        color={error ? 'alert' : 'regular'}
        size={80}
      >
        {error ? <InfoIcon /> : <Spinner />}
      </Text>
      {error ? (
        <>
          <Text style={{ wordBreak: 'break-word' }} centered height="large">
            {error.message}
          </Text>
          <Link style={{ width: '100%' }} href={AppPath.SignIn}>
            <Button kind="secondary" style={{ width: '100%' }} size="l">
              Go back
            </Button>
          </Link>
          <Text centered color="supporting" size={14}>
            Nothing helps? Email us at <br />
            <CopyText color="regular" as="span" content={founderEmail}>
              {founderEmail}
            </CopyText>
          </Text>
        </>
      ) : null}
    </VStack>
  )
}
