import { Panel } from '@increaser/ui/ui/Panel/Panel'
import { ManagePrivacy } from './ManagePrivacy'
import { HStack } from '@increaser/ui/ui/Stack'
import { useAssertUserState } from 'user/state/UserStateContext'
import { PublicProfileForm } from './PublicProfileForm'
import { LabeledValue } from '@increaser/ui/ui/LabeledValue'
import { Text } from '@increaser/ui/ui/Text'
import { useState } from 'react'
import { IconButton } from '@increaser/ui/ui/buttons/IconButton'
import { EditIcon } from '@increaser/ui/ui/icons/EditIcon'
import { getCountryFlagEmoji } from '@increaser/utils/getCountryFlagEmoji'

export const PublicProfile = () => {
  const { isAnonymous, name, country } = useAssertUserState()

  const [isEditing, setIsEditing] = useState(false)

  return (
    <Panel style={{ minWidth: 320 }} withSections>
      <HStack
        alignItems="center"
        justifyContent="space-between"
        fullWidth
        gap={20}
      >
        <Text size={18} weight="bold">
          Public profile
        </Text>
        <ManagePrivacy />
      </HStack>
      {!isAnonymous &&
        (isEditing ? (
          <PublicProfileForm onCancel={() => setIsEditing(false)} />
        ) : (
          <HStack
            alignItems="center"
            gap={8}
            fullWidth
            justifyContent="space-between"
          >
            <LabeledValue name="Name">
              {name || '-'}{' '}
              {country && (
                <Text as="span" color="contrast">
                  {getCountryFlagEmoji(country)}
                </Text>
              )}
            </LabeledValue>
            <IconButton
              title="Edit profile"
              kind="secondary"
              icon={<EditIcon />}
              onClick={() => setIsEditing(true)}
            />
          </HStack>
        ))}
    </Panel>
  )
}
