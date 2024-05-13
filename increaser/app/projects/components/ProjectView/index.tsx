import { useEffect, useState } from 'react'
import { IconButton } from '@lib/ui/buttons/IconButton'
import { CloseIcon } from '@lib/ui/icons/CloseIcon'
import { EditIcon } from '@lib/ui/icons/EditIcon'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { EmojiTextPrefix } from '@lib/ui/text/EmojiTextPrefix'

import { DeleteProject } from '../DeleteProject'
import { useCurrentProject } from '@increaser/ui/projects/CurrentProjectProvider'
import { EditProject } from './EditProject'
import { ProjectStats } from './ProjectStats'
import { ProjectStatusSelector } from './ProjectStatusSelector'

export const ProjectView = () => {
  const { emoji, id, name } = useCurrentProject()

  const [isEditing, setIsEditing] = useState(false)
  useEffect(() => {
    setIsEditing(false)
  }, [id])

  if (isEditing) {
    return (
      <VStack gap={28}>
        <HStack fullWidth alignItems="center" justifyContent="space-between">
          <Text weight="bold" size={24}>
            Edit project
          </Text>
          <IconButton
            title="Close"
            onClick={() => setIsEditing(false)}
            size="l"
            icon={<CloseIcon />}
          />
        </HStack>
        <EditProject onFinish={() => setIsEditing(false)} />
      </VStack>
    )
  }

  return (
    <VStack fullWidth gap={40}>
      <VStack gap={8}>
        <HStack
          wrap="wrap"
          alignItems="center"
          gap={16}
          justifyContent="space-between"
        >
          <HStack alignItems="center" gap={8}>
            <Text weight="bold" size={24}>
              <EmojiTextPrefix marginRight={12} emoji={emoji} />
              {name}
            </Text>
            <IconButton
              title="Edit project"
              onClick={() => setIsEditing(true)}
              kind="secondary"
              icon={<EditIcon />}
            />
          </HStack>

          <HStack alignItems="center" gap={20}>
            <ProjectStatusSelector />
            <DeleteProject />
          </HStack>
        </HStack>
      </VStack>
      <ProjectStats />
    </VStack>
  )
}
