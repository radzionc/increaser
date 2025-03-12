import { Panel } from '@lib/ui/css/panel'
import { HStack } from '@lib/ui/css/stack'
import { useLazySync } from '@lib/ui/hooks/useLazySync'
import { OnFinishProp } from '@lib/ui/props'
import { areArraysEqual } from '@lib/utils/array/areArraysEqual'
import { getUpdatedValues } from '@lib/utils/record/getUpdatedValues'
import { pick } from '@lib/utils/record/pick'
import { areChecklistItemsEqual } from '@product/entities-utils/task/checklist'
import { areLinkItemsEqual } from '@product/entities-utils/task/links'
import { useCallback, useMemo, useState } from 'react'

import { PanelFormDeleteButton } from '../../form/panel/PanelFormDeleteButton'
import { TaskFormHeader } from '../../tasks/form/TaskFormHeader'
import { useDeleteUserEntityMutation } from '../../userEntity/api/useDeleteUserEntityMutation'
import { useUpdateUserEntityMutation } from '../../userEntity/api/useUpdateUserEntityMutation'
import { useCurrentIdea } from '../CurrentIdeaProvider'

import { IdeaFormShape } from './IdeaFormShape'
import { TurnIdeaIntoTask } from './TurnIdeaIntoTask'

export const EditIdeaForm = ({ onFinish }: OnFinishProp) => {
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
