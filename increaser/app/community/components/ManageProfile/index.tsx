import { HStack, VStack } from '@lib/ui/layout/Stack'
import { ManagePrivacy } from '../ManagePrivacy'
import { Panel } from '@lib/ui/panel/Panel'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { useState } from 'react'
import { IconButton } from '@lib/ui/buttons/IconButton'
import { EditIcon } from '@lib/ui/icons/EditIcon'
import { PublicProfileForm } from '../PublicProfileForm'
import { ScoreboardDisplayName } from '@increaser/ui/scoreboard/ScoreboardDisplayName'
import { SeparatedByLine } from '@lib/ui/layout/SeparatedByLine'
import { CountryCode } from '@lib/countries'
import { LabeledValue } from '@lib/ui/text/LabeledValue'
import { SectionTitle } from '@lib/ui/text/SectionTitle'

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
            <SectionTitle>Your profile</SectionTitle>
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
      </VStack>
    </Panel>
  )
}
