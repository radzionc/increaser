import { TaskLink } from '@increaser/entities/Task'
import { IconButton } from '@lib/ui/buttons/IconButton'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { TrashBinIcon } from '@lib/ui/icons/TrashBinIcon'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { InputProps } from '@lib/ui/props'
import { removeAtIndex } from '@lib/utils/array/removeAtIndex'
import { updateAtIndex } from '@lib/utils/array/updateAtIndex'
import styled from 'styled-components'
import { TaskLinkInput } from './TaskLinkInput'
import { FieldArrayAddButton } from '@lib/ui/form/components/FieldArrayAddButton'
import { FieldArrayContainer } from '@lib/ui/form/components/FieldArrayContainer'
import { tightListItemMinHeight } from '@lib/ui/list/tightListItemConfig'

const DeleteButton = styled(IconButton)`
  ${sameDimensions(tightListItemMinHeight)};
`

export const TaskLinksInput = ({ value, onChange }: InputProps<TaskLink[]>) => {
  return (
    <FieldArrayContainer title="Links">
      {value.length > 0 && (
        <VStack gap={8}>
          {value.map((item, index) => (
            <HStack gap={4}>
              <TaskLinkInput
                value={item}
                onChange={(item) =>
                  onChange(updateAtIndex(value, index, () => item))
                }
              />
              <DeleteButton
                kind="alertSecondary"
                type="button"
                title="Delete"
                icon={<TrashBinIcon />}
                onClick={() => onChange(removeAtIndex(value, index))}
              />
            </HStack>
          ))}
        </VStack>
      )}

      <FieldArrayAddButton
        onClick={() => onChange([...value, { url: '', name: '' }])}
      >
        Add a link
      </FieldArrayAddButton>
    </FieldArrayContainer>
  )
}
