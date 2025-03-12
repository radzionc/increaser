import { Button } from '@lib/ui/buttons/Button'
import { VStack } from '@lib/ui/css/stack'
import { InfoIcon } from '@lib/ui/icons/InfoIcon'
import { Spinner } from '@lib/ui/loaders/Spinner'
import { Text } from '@lib/ui/text'
import { CopyText } from '@lib/ui/text/CopyText'
import { founderEmail } from '@product/config'
import { getAppPath } from '@product/ui/navigation/app'
import Link from 'next/link'

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
          <Text
            style={{ wordBreak: 'break-word' }}
            centerHorizontally
            height="l"
          >
            {error.message}
          </Text>
          <Link style={{ width: '100%' }} href={getAppPath('signIn')}>
            <Button kind="secondary" style={{ width: '100%' }} size="l">
              Go back
            </Button>
          </Link>
          <Text centerHorizontally color="supporting" size={14}>
            Nothing helps? Email us at <br />
            <CopyText color="regular" content={founderEmail}>
              {founderEmail}
            </CopyText>
          </Text>
        </>
      ) : null}
    </VStack>
  )
}
