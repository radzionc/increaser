import { TaskLink } from '@increaser/entities/Task'
import { Button } from '@lib/ui/buttons/Button'
import { IconButton } from '@lib/ui/buttons/IconButton'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { textInputHeight } from '@lib/ui/css/textInput'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { PlusIcon } from '@lib/ui/icons/PlusIcon'
import { TrashBinIcon } from '@lib/ui/icons/TrashBinIcon'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { InputProps } from '@lib/ui/props'
import { Text } from '@lib/ui/text'
import { removeAtIndex } from '@lib/utils/array/removeAtIndex'
import { updateAtIndex } from '@lib/utils/array/updateAtIndex'
import styled from 'styled-components'
import { TaskLinkInput } from './TaskLinkInput'

const DeleteButton = styled(IconButton)`
  ${sameDimensions(textInputHeight)};
`

export const TaskLinksInput = ({ value, onChange }: InputProps<TaskLink[]>) => {
  return (
    <VStack gap={16}>
      <Text size={14} weight="semibold">
        Links
      </Text>
      {value.length > 0 && (
        <VStack gap={8}>
          {value.map((item, index) => (
            <HStack gap={8}>
              <TaskLinkInput
                value={item}
                onChange={(item) =>
                  onChange(updateAtIndex(value, index, () => item))
                }
              />
              <DeleteButton
                kind="alert"
                type="button"
                title="Delete"
                icon={<TrashBinIcon />}
                onClick={() => onChange(removeAtIndex(value, index))}
              />
            </HStack>
          ))}
        </VStack>
      )}

      <Button
        onClick={() => onChange([...value, { url: '', name: '' }])}
        style={{ alignSelf: 'start' }}
        kind="secondary"
        type="button"
      >
        <HStack alignItems="center" gap={8}>
          <IconWrapper>
            <PlusIcon />
          </IconWrapper>
          Add link
        </HStack>
      </Button>
    </VStack>
  )
}
