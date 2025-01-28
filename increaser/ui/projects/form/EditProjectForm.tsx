import { useCallback, useEffect, useMemo, useState } from 'react'
import { HStack } from '@lib/ui/css/stack'
import { ProjectStatus } from '@increaser/entities/Project'
import { ProjectFormShape } from './ProjectFormShape'
import { useCurrentProject } from '@increaser/ui/projects/CurrentProjectProvider'
import { useUser } from '@increaser/ui/user/state/user'
import { ProjectStatusInput } from './ProjectStatusInput'
import { getLastItemOrder } from '@lib/utils/order/getLastItemOrder'
import { DeleteProject } from './DeleteProject'
import { couldProjectStatusBeChanged } from '@increaser/entities-utils/project/couldProjectStatusBeChanged'
import { couldProjectBeDeleted } from '@increaser/entities-utils/project/couldProjectBeDeleted'
import { useUpdateUserEntityMutation } from '../../userEntity/api/useUpdateUserEntityMutation'
import { useLazySync } from '@lib/ui/hooks/useLazySync'
import { pick } from '@lib/utils/record/pick'
import { getUpdatedValues } from '@lib/utils/record/getUpdatedValues'
import { OnFinishNoValueProp } from '@lib/ui/props'
import { ProjectFormFields } from './ProjectFormFields'
import { ListItemForm } from '../../form/ListItemForm'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { useFreeHours } from '../budget/hooks/useFreeHours'

type EditProjectFormShape = ProjectFormShape & {
  status: ProjectStatus
}

export const EditProjectForm = ({ onFinish }: OnFinishNoValueProp) => {
  const project = useCurrentProject()
  const { projects } = useUser()
  const { id } = project

  const initialValue = useMemo(
    () =>
      pick(project, [
        'name',
        'emoji',
        'color',
        'status',
        'allocatedMinutesPerWeek',
        'workingDays',
        'goal',
      ]),
    [project],
  )

  const [value, setValue] = useState<EditProjectFormShape>(() => {
    const { allocatedMinutesPerWeek, goal, ...rest } = initialValue

    return {
      ...rest,
      goal: goal ?? null,
      budget: allocatedMinutesPerWeek
        ? convertDuration(allocatedMinutesPerWeek, 'min', 'h')
        : null,
    }
  })

  const { mutate: updateProject } = useUpdateUserEntityMutation('project')

  useLazySync<Partial<EditProjectFormShape>>({
    value: useMemo(() => {
      const { budget, ...rest } = value

      const after = {
        ...rest,
        allocatedMinutesPerWeek: convertDuration(budget ?? 0, 'h', 'min'),
      }

      const result = getUpdatedValues({
        before: initialValue,
        after,
      })

      if (result && 'status' in result) {
        return {
          ...result,
          order: getLastItemOrder(
            Object.values(projects)
              .filter(({ status }) => status === value.status)
              .map((project) => project.order),
          ),
        }
      }

      return result
    }, [initialValue, projects, value]),
    sync: useCallback(
      (fields) =>
        updateProject({
          id,
          fields,
        }),
      [id, updateProject],
    ),
  })

  useEffect(() => {
    if (value.status !== 'active') {
      setValue((prev) => ({ ...prev, budget: null, goal: null }))
    }
  }, [value.status])

  const isStatusEditable = couldProjectStatusBeChanged(project.id)
  const isDeletable = couldProjectBeDeleted(project.id)

  const freeHours =
    useFreeHours() +
    convertDuration(project.allocatedMinutesPerWeek, 'min', 'h')

  return (
    <ListItemForm onClose={onFinish} onSubmit={onFinish}>
      <ProjectFormFields
        value={value}
        freeHours={value.status === 'active' ? freeHours : 0}
        onChange={(value) => setValue((prev) => ({ ...prev, ...value }))}
        onClose={onFinish}
        onSubmit={onFinish}
      />
      {(isStatusEditable || isDeletable) && (
        <HStack alignItems="center" gap={8} wrap="wrap">
          {isStatusEditable && (
            <ProjectStatusInput
              value={value.status}
              onChange={(status) => setValue((prev) => ({ ...prev, status }))}
            />
          )}
          {isDeletable && <DeleteProject />}
        </HStack>
      )}
    </ListItemForm>
  )
}
