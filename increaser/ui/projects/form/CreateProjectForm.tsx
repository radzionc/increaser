import { useCallback, useState } from 'react'
import { FinishableComponentProps } from '@lib/ui/props'
import { Panel } from '@lib/ui/panel/Panel'
import { HStack } from '@lib/ui/layout/Stack'
import { Button } from '@lib/ui/buttons/Button'
import { getFormProps } from '@lib/ui/form/utils/getFormProps'
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
  const { mutate } = useCreateUserEntityMutation('project')

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
  }, [isDisabled, mutate, value, activeProjects, onFinish])

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
