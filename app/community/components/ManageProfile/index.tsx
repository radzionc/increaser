import { HStack, VStack } from '@increaser/ui/layout/Stack'
import { Text } from '@increaser/ui/text'
import { ManagePrivacy } from '../ManagePrivacy'
import { Panel } from '@increaser/ui/panel/Panel'
import { useAssertUserState } from 'user/state/UserStateContext'
import { useState } from 'react'
import { IconButton } from '@increaser/ui/buttons/IconButton'
import { EditIcon } from '@increaser/ui/icons/EditIcon'
import { PublicProfileForm } from '../PublicProfileForm'
import { ScoreboardDisplayName } from '../ScoreboardDisplayName'
import { SeparatedByLine } from '@increaser/ui/layout/SeparatedByLine'
import { CountryCode } from '@increaser/utils/countries'
import { TimeoutMessage } from '@increaser/ui/base/TimeoutMessage'
import { UpdateProfileMessage } from './UpdateProfileMessage'
import { LabeledValue } from '@increaser/ui/text/LabeledValue'

export const ManageProfile = () => {
  const { isAnonymous, name, country } = useAssertUserState()

  const [isEditing, setIsEditing] = useState(false)

  return (
    <Panel kind="secondary">
      <VStack gap={20}>
        <SeparatedByLine gap={20}>
          <HStack
            fullWidth
            justifyContent="space-between"
            alignItems="center"
            gap={16}
            wrap="wrap"
          >
            <Text size={18} weight="bold">
              Your profile
            </Text>
            <ManagePrivacy />
          </HStack>
          {isEditing ? (
            <PublicProfileForm onCancel={() => setIsEditing(false)} />
          ) : (
            <HStack
              alignItems="center"
              gap={8}
              fullWidth
              justifyContent="space-between"
            >
              <LabeledValue name="Name">
                <HStack alignItems="center" gap={8}>
                  {isAnonymous ? (
                    <ScoreboardDisplayName />
                  ) : (
                    <ScoreboardDisplayName
                      name={name ?? undefined}
                      country={(country as CountryCode) ?? undefined}
                    />
                  )}
                </HStack>
              </LabeledValue>
              <IconButton
                style={{
                  opacity: isAnonymous ? 0 : 1,
                  pointerEvents: isAnonymous ? 'none' : undefined,
                }}
                title="Edit profile"
                kind="secondary"
                icon={<EditIcon />}
                onClick={() => setIsEditing(true)}
              />
            </HStack>
          )}
        </SeparatedByLine>
        <TimeoutMessage
          deps={[isAnonymous, name, country]}
          timeout={5000}
          render={() => <UpdateProfileMessage />}
        />
      </VStack>
    </Panel>
  )
}
