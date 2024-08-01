import { useCallback, useState } from 'react'
import { ProjectFormShape } from './ProjectFormShape'
import { randomlyPick } from '@lib/utils/array/randomlyPick'
import { useIsProjectFormDisabled } from './useIsProjectFormDisabled'
import { EmojiInput } from '@increaser/app/ui/EmojiInput'
import { randomlyPickOption } from '@lib/utils/array/randomlyPickOption'
import { range } from '@lib/utils/array/range'
import { labelColorsCount } from '@lib/ui/colors/generateLabelColorGetter'
import { getLastItemOrder } from '@lib/utils/order/getLastItemOrder'
import { ColorLabelInput } from '@lib/ui/inputs/ColorLabelInput'
import { defaultEmojis } from '@lib/utils/entities/EntityWithEmoji'
import { useAssertUserState } from '../../user/UserStateContext'
import { useActiveProjects } from '../hooks/useActiveProjects'
import { getId } from '@increaser/entities-utils/shared/getId'
import { EmojiColorTextInputFrame } from '@increaser/ui/form/EmojiColorTextInputFrame'
import { EmbeddedTitleInput } from '@lib/ui/inputs/EmbeddedTitleInput'
import { useCreateUserEntityMutation } from '../../userEntity/api/useCreateUserEntityMutation'
import { Project } from '@increaser/entities/Project'
import { CreateFormFooter } from '@lib/ui/form/components/CreateFormFooter'
import { ListItemForm } from '../../form/ListItemForm'

type CreateProjectFormProps = {
  onFinish?: (project?: Project) => void
  onMutationFinish?: (task: Project) => void
}

export const CreateProjectForm = ({
  onFinish,
  onMutationFinish,
}: CreateProjectFormProps) => {
  const { projects } = useAssertUserState()
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
  const { mutate, isPending } = useCreateUserEntityMutation('project')

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
    onFinish?.(project)
    mutate(project, {
      onSuccess: () => onMutationFinish?.(project),
    })
  }, [activeProjects, isDisabled, mutate, onFinish, onMutationFinish, value])

  return (
    <ListItemForm
      onClose={() => onFinish?.()}
      onSubmit={onSubmit}
      isDisabled={isDisabled}
    >
      <EmojiColorTextInputFrame>
        <div>
          <EmojiInput
            value={value.emoji}
            onChange={(emoji) => setValue((prev) => ({ ...prev, emoji }))}
          />
        </div>
        <div>
          <ColorLabelInput
            usedValues={new Set(usedColors)}
            value={value.color}
            onChange={(color) => setValue((prev) => ({ ...prev, color }))}
          />
        </div>
        <EmbeddedTitleInput
          placeholder="Project name"
          autoFocus
          onChange={(name) => setValue((prev) => ({ ...prev, name }))}
          value={value.name}
          onSubmit={onSubmit}
        />
      </EmojiColorTextInputFrame>
      <CreateFormFooter
        isDisabled={isDisabled}
        isPending={isPending}
        onCancel={() => onFinish?.()}
      />
    </ListItemForm>
  )
}
