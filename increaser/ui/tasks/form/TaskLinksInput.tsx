import { TaskLink } from '@increaser/entities/Task'
import { Button } from '@lib/ui/buttons/Button'
import { IconButton } from '@lib/ui/buttons/IconButton'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { textInputHeight } from '@lib/ui/css/textInput'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { PlusIcon } from '@lib/ui/icons/PlusIcon'
import { TrashBinIcon } from '@lib/ui/icons/TrashBinIcon'
import { TextInput } from '@lib/ui/inputs/TextInput'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { InputProps } from '@lib/ui/props'
import { Text } from '@lib/ui/text'
import { removeAtIndex } from '@lib/utils/array/removeAtIndex'
import { updateAtIndex } from '@lib/utils/array/updateAtIndex'
import { attempt } from '@lib/utils/attempt'
import { extractRootDomain } from '@lib/utils/url/extractRootDomain'
import styled from 'styled-components'

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
              <TextInput
                style={{ minWidth: 240 }}
                placeholder="https://example.com"
                value={item.url}
                onValueChange={(url) =>
                  onChange(
                    updateAtIndex(value, index, (oldValue) => ({
                      ...oldValue,
                      url,
                      name:
                        oldValue.name ||
                        attempt(() => extractRootDomain(url), ''),
                    })),
                  )
                }
              />
              <TextInput
                style={{ minWidth: 40 }}
                placeholder="Example"
                value={item.name}
                onValueChange={(name) =>
                  onChange(
                    updateAtIndex(value, index, (oldValue) => ({
                      ...oldValue,
                      name,
                    })),
                  )
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
