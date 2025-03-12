import { labelColorsCount } from '@lib/ui/colors/generateLabelColorGetter'
import { CancelSubmitFormFooter } from '@lib/ui/form/components/CancelSubmitFormFooter'
import { OnFinishProp } from '@lib/ui/props'
import { randomlyPick } from '@lib/utils/array/randomlyPick'
import { randomlyPickOption } from '@lib/utils/array/randomlyPickOption'
import { range } from '@lib/utils/array/range'
import { defaultEmojis } from '@lib/utils/entities/EntityWithEmoji'
import { getLastItemOrder } from '@lib/utils/order/getLastItemOrder'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { Project } from '@product/entities/Project'
import { getId } from '@product/entities-utils/shared/getId'
import { useUser } from '@product/ui/user/state/user'
import { useCallback, useState } from 'react'

import { ListItemForm } from '../../form/ListItemForm'
import { useCreateUserEntityMutation } from '../../userEntity/api/useCreateUserEntityMutation'
import { useFreeHours } from '../budget/hooks/useFreeHours'
import { useActiveProjects } from '../hooks/useActiveProjects'

import { ProjectFormFields } from './ProjectFormFields'
import { ProjectFormShape } from './ProjectFormShape'
import { useIsProjectFormDisabled } from './useIsProjectFormDisabled'

export const CreateProjectForm = ({
  onFinish,
}: OnFinishProp<Project, 'optional'>) => {
  const { projects } = useUser()
  const activeProjects = useActiveProjects()
  const usedColors = Object.values(projects).map(({ color }) => color)
  const [value, setValue] = useState<ProjectFormShape>({
    name: '',
    emoji: randomlyPick(defaultEmojis),
    budget: null,
    goal: null,
    workingDays: 'everyday',
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
      allocatedMinutesPerWeek: convertDuration(value.budget ?? 0, 'h', 'min'),
    }
    mutate(project)
  }, [activeProjects, isDisabled, mutate, value])

  const freeHours = useFreeHours()

  return (
    <ListItemForm
      onClose={() => onFinish?.()}
      onSubmit={onSubmit}
      isDisabled={isDisabled}
    >
      <ProjectFormFields
        value={value}
        freeHours={freeHours}
        onChange={(value) => setValue((prev) => ({ ...prev, ...value }))}
        onClose={onFinish}
        onSubmit={onFinish}
      />
      <CancelSubmitFormFooter
        isDisabled={isDisabled}
        isPending={isPending}
        onCancel={() => onFinish?.()}
      />
    </ListItemForm>
  )
}
