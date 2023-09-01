import { HStack, VStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'
import { ManagePrivacy } from '../ManagePrivacy'
import { Panel } from '@increaser/ui/ui/Panel/Panel'
import { useAssertUserState } from 'user/state/UserStateContext'
import { useEffect, useState } from 'react'
import { LabeledValue } from '@increaser/ui/ui/LabeledValue'
import { IconButton } from '@increaser/ui/ui/buttons/IconButton'
import { EditIcon } from '@increaser/ui/ui/icons/EditIcon'
import { PublicProfileForm } from '../PublicProfileForm'
import { ScoreboardDisplayName } from '../ScoreboardDisplayName'
import { SeparatedByLine } from '@increaser/ui/ui/SeparatedByLine'
import { useEffectOnDependencyChange } from '@increaser/ui/hooks/useEffectOnDependencyChange'
import styled from 'styled-components'
import { InfoIcon } from '@increaser/ui/ui/icons/InfoIcon'

const Message = styled(Text)`
  max-width: 100%;
`

export const ManageProfile = () => {
  const { isAnonymous, name, country } = useAssertUserState()

  const [isEditing, setIsEditing] = useState(false)

  const [shouldShowMessage, setShouldShowMessage] = useState(false)
  useEffect(() => {
    if (shouldShowMessage) {
      const timeout = setTimeout(() => {
        setShouldShowMessage(false)
      }, 5000)
      return () => clearTimeout(timeout)
    }
  }, [shouldShowMessage])

  useEffectOnDependencyChange(() => {
    setShouldShowMessage(true)
  }, [isAnonymous, name, country])

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
                      country={country ?? undefined}
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
        {shouldShowMessage && (
          <Message color="supporting" size={14} height="large">
            <Text
              centered
              as="span"
              style={{ marginRight: 8, verticalAlign: 'middle' }}
            >
              <InfoIcon />
            </Text>
            It could take up to 10 minutes for your changes to appear <br /> on
            the scoreboard.
          </Message>
        )}
      </VStack>
    </Panel>
  )
}
