import { useCallback, useState } from 'react'
import { FinishableComponentProps } from '@lib/ui/props'
import { Panel } from '@lib/ui/panel/Panel'
import { HStack } from '@lib/ui/layout/Stack'
import { Button } from '@lib/ui/buttons/Button'
import { getFormProps } from '@lib/ui/form/utils/getFormProps'
import { ProjectNameInput } from './ProjectNameInput'
import { ProjectFormShape } from './ProjectFormShape'
import { randomlyPick } from '@lib/utils/array/randomlyPick'
import { useIsProjectFormDisabled } from './useIsProjectFormDisabled'
import { EmojiInput } from '@increaser/app/ui/EmojiInput'
import { ProjectFormHeader } from './ProjectFormHeader'
import { randomlyPickOption } from '@lib/utils/array/randomlyPickOption'
import { range } from '@lib/utils/array/range'
import { labelColorsCount } from '@lib/ui/colors/generateLabelColorGetter'
import { getLastItemOrder } from '@lib/utils/order/getLastItemOrder'
import { ColorLabelInput } from '@lib/ui/inputs/ColorLabelInput'
import { defaultEmojis } from '@lib/utils/entities/EntityWithEmoji'
import { useAssertUserState } from '../../user/UserStateContext'
import { useCreateProjectMutation } from '../api/useCreateProjectMutation'
import { useActiveProjects } from '../hooks/useActiveProjects'
import { getId } from '@increaser/entities-utils/shared/getId'

export const CreateProjectForm = ({ onFinish }: FinishableComponentProps) => {
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
  const { mutate } = useCreateProjectMutation()

  const isDisabled = useIsProjectFormDisabled(value)

  const onSubmit = useCallback(() => {
    if (isDisabled) return

    mutate({
      ...value,
      id: getId(),
      status: 'active',
      order: getLastItemOrder(activeProjects.map(({ order }) => order)),
      workingDays: 'everyday',
      allocatedMinutesPerWeek: 0,
    })
    onFinish()
  }, [projects, isDisabled, mutate, onFinish, value])

  return (
    <Panel
      withSections
      kind="secondary"
      as="form"
      {...getFormProps({
        onClose: onFinish,
        isDisabled,
        onSubmit,
      })}
    >
      <ProjectFormHeader>
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
        <ProjectNameInput
          autoFocus
          onChange={(name) => setValue((prev) => ({ ...prev, name }))}
          value={value.name}
          onSubmit={onSubmit}
        />
      </ProjectFormHeader>
      <HStack justifyContent="space-between" fullWidth alignItems="center">
        <div />
        <HStack alignItems="center" gap={8}>
          <Button type="button" onClick={onFinish} kind="secondary">
            Cancel
          </Button>
          <Button isDisabled={isDisabled}>Submit</Button>
        </HStack>
      </HStack>
    </Panel>
  )
}
