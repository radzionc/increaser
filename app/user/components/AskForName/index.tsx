import { Modal } from '@increaser/ui/ui/Modal'
import { VStack } from '@increaser/ui/ui/Stack'
import { useAssertUserState } from 'user/state/UserStateContext'

import { NameForm } from './NameForm'

export const AskForNameOverlay = () => {
  const { name } = useAssertUserState()

  if (name) return null

  return (
    <Modal
      hasImplicitClose={false}
      title="What's your name?"
      placement="top"
      renderContent={() => (
        <VStack fullWidth gap={20}>
          <NameForm />
        </VStack>
      )}
    />
  )
}
