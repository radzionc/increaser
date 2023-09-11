import { HStack, VStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'
import { ManagePrivacy } from '../ManagePrivacy'
import { Panel } from '@increaser/ui/ui/Panel/Panel'
import { useAssertUserState } from 'user/state/UserStateContext'
import { useState } from 'react'
import { LabeledValue } from '@increaser/ui/ui/LabeledValue'
import { IconButton } from '@increaser/ui/ui/buttons/IconButton'
import { EditIcon } from '@increaser/ui/ui/icons/EditIcon'
import { PublicProfileForm } from '../PublicProfileForm'
import { ScoreboardDisplayName } from '../ScoreboardDisplayName'
import { SeparatedByLine } from '@increaser/ui/ui/SeparatedByLine'
import { CountryCode } from '@increaser/utils/countryNameRecord'
import { TimeoutMessage } from '@increaser/ui/ui/TimeoutMessage'
import { UpdateProfileMessage } from './UpdateProfileMessage'

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
