import { Spinner } from '@increaser/ui/ui/Spinner'
import { VStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'
import { Button } from '@increaser/ui/ui/buttons/Button'
import { InfoIcon } from '@increaser/ui/ui/icons/InfoIcon'
import { QueryApiError } from 'api/useApi'
import Link from 'next/link'
import { Path } from 'router/Path'

interface AuthConfirmationStatusProps {
  error?: QueryApiError
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
          <Link style={{ width: '100%' }} href={Path.SignIn}>
            <Button kind="secondary" style={{ width: '100%' }} size="l">
              Go back
            </Button>
          </Link>
        </>
      ) : null}
    </VStack>
  )
}
