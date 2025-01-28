import { useCallback, useMemo, useState } from 'react'
import { useCurrentIdea } from '../CurrentIdeaProvider'
import { IdeaFormShape } from './IdeaFormShape'
import { pick } from '@lib/utils/record/pick'
import { getUpdatedValues } from '@lib/utils/record/getUpdatedValues'
import { TurnIdeaIntoTask } from './TurnIdeaIntoTask'
import { useUpdateUserEntityMutation } from '../../userEntity/api/useUpdateUserEntityMutation'
import { useDeleteUserEntityMutation } from '../../userEntity/api/useDeleteUserEntityMutation'
import { useLazySync } from '@lib/ui/hooks/useLazySync'
import { HStack } from '@lib/ui/css/stack'
import { PanelFormDeleteButton } from '../../form/panel/PanelFormDeleteButton'
import { OnFinishNoValueProp } from '@lib/ui/props'
import { areChecklistItemsEqual } from '@increaser/entities-utils/task/checklist'
import { areLinkItemsEqual } from '@increaser/entities-utils/task/links'
import { areArraysEqual } from '@lib/utils/array/areArraysEqual'
import { Panel } from '@lib/ui/css/panel'
import { TaskFormHeader } from '../../tasks/form/TaskFormHeader'

export const EditIdeaForm = ({ onFinish }: OnFinishNoValueProp) => {
  const idea = useCurrentIdea()
  const { id } = idea
  const initialValue = useMemo(
    () =>
      pick(idea, ['checklist', 'description', 'links', 'name', 'projectId']),
    [idea],
  )
  const [value, setValue] = useState<IdeaFormShape>(initialValue)

  const { mutate: updateIdea } = useUpdateUserEntityMutation('idea')
  const { mutate: deleteIdea } = useDeleteUserEntityMutation('idea')

  useLazySync<Partial<IdeaFormShape>>({
    value: useMemo(
      () =>
        getUpdatedValues({
          before: initialValue,
          after: value,
          comparators: {
            links: (one, another) =>
              areArraysEqual(one, another, areLinkItemsEqual),
            checklist: (one, another) =>
              areArraysEqual(one, another, areChecklistItemsEqual),
          },
        }),
      [initialValue, value],
    ),
    sync: useCallback(
      (fields) =>
        updateIdea({
          id,
          fields,
        }),
      [id, updateIdea],
    ),
  })

  return (
    <Panel style={{ width: '100%' }} withSections kind="secondary">
      <TaskFormHeader
        titlePlaceholder="Idea name"
        value={value}
        onChange={(value) => setValue((prev) => ({ ...prev, ...value }))}
        onClose={onFinish}
      />

      <HStack alignItems="center" gap={20} wrap="wrap">
        <TurnIdeaIntoTask value={idea} />
        <PanelFormDeleteButton
          onClick={() => {
            deleteIdea(id)
            onFinish()
          }}
        />
      </HStack>
    </Panel>
  )
}
