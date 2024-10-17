import { useCallback, useState } from 'react'
import { ProjectFormShape } from './ProjectFormShape'
import { randomlyPick } from '@lib/utils/array/randomlyPick'
import { useIsProjectFormDisabled } from './useIsProjectFormDisabled'
import { randomlyPickOption } from '@lib/utils/array/randomlyPickOption'
import { range } from '@lib/utils/array/range'
import { labelColorsCount } from '@lib/ui/colors/generateLabelColorGetter'
import { getLastItemOrder } from '@lib/utils/order/getLastItemOrder'
import { defaultEmojis } from '@lib/utils/entities/EntityWithEmoji'
import { useUser } from '@increaser/ui/user/state/user'
import { useActiveProjects } from '../hooks/useActiveProjects'
import { getId } from '@increaser/entities-utils/shared/getId'
import { useCreateUserEntityMutation } from '../../userEntity/api/useCreateUserEntityMutation'
import { Project } from '@increaser/entities/Project'
import { CreateFormFooter } from '@lib/ui/form/components/CreateFormFooter'
import { ListItemForm } from '../../form/ListItemForm'
import { OptionalValueFinishProps } from '@lib/ui/props'
import { ProjectFormFields } from './ProjectFormFields'

export const CreateProjectForm = ({
  onFinish,
}: OptionalValueFinishProps<Project>) => {
  const { projects } = useUser()
  const activeProjects = useActiveProjects()
  const usedColors = Object.values(projects).map(({ color }) => color)
  const [value, setValue] = useState<ProjectFormShape>({
    name: '',
    emoji: randomlyPick(defaultEmojis),
    color: randomlyPickOption({
      options: range(labelColorsCount),
      used: usedColors,
    }),
  })
  const { mutate, isPending } = useCreateUserEntityMutation('project', {
    onOptimisticUpdate: onFinish,
  })

  const isDisabled = useIsProjectFormDisabled(value)

  const onSubmit = useCallback(() => {
    if (isDisabled) return

    const project: Project = {
      ...value,
      id: getId(),
      status: 'active',
      order: getLastItemOrder(activeProjects.map(({ order }) => order)),
      workingDays: 'everyday',
      allocatedMinutesPerWeek: 0,
    }
    mutate(project)
  }, [activeProjects, isDisabled, mutate, value])

  return (
    <ListItemForm
      onClose={() => onFinish?.()}
      onSubmit={onSubmit}
      isDisabled={isDisabled}
    >
      <ProjectFormFields
        value={value}
        onChange={(value) => setValue((prev) => ({ ...prev, ...value }))}
        onClose={onFinish}
        onSubmit={onFinish}
      />
      <CreateFormFooter
        isDisabled={isDisabled}
        isPending={isPending}
        onCancel={() => onFinish?.()}
      />
    </ListItemForm>
  )
}
