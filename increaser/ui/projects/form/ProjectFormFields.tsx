import { EmbeddedTitleInput } from '@lib/ui/inputs/EmbeddedTitleInput'
import { OnCloseProp, InputProps, OnSubmitProp } from '@lib/ui/props'
import { EmojiInput } from '../../form/emoji-input/EmojiInput'
import { PanelFormCloseButton } from '../../form/panel/PanelFormCloseButton'
import { EmojiColorTextInputFrame } from '../../form/EmojiColorTextInputFrame'
import { ColorLabelInput } from '@lib/ui/inputs/ColorLabelInput'
import { useActiveProjects } from '../hooks/useActiveProjects'
import { BudgetHoursInput } from '../budget/BudgetHoursInput'
import { ProjectFormShape } from './ProjectFormShape'
import { Switch } from '@lib/ui/inputs/Switch'
import { ProjectGoalInput } from '../budget/ProjectGoalInput'
import { VStack } from '@lib/ui/css/stack'
import { panelDefaultPadding } from '@lib/ui/css/panel'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { Spacer } from '@lib/ui/layout/Spacer'
import { Text } from '@lib/ui/text'
import { WithHint } from '@lib/ui/tooltips/WithHint'
import { useUser } from '../../user/state/user'
import { WEEKDAYS } from '@lib/utils/time'

type ProjectFormFieldsProps = InputProps<ProjectFormShape> &
  Partial<OnSubmitProp> &
  OnCloseProp & {
    freeHours: number
  }

export const ProjectFormFields = ({
  value,
  onChange,
  onSubmit,
  onClose,
  freeHours,
}: ProjectFormFieldsProps) => {
  const activeProjects = useActiveProjects()
  const usedColors = Object.values(activeProjects).map(({ color }) => color)
  const user = useUser()
  const weekendDays = user.weekends.map((day) => WEEKDAYS[day]).join(' and ')

  const hasBudget = value.budget && value.budget > 0

  return (
    <>
      <EmojiColorTextInputFrame>
        <div>
          <EmojiInput
            value={value.emoji}
            onChange={(emoji) => onChange({ ...value, emoji })}
          />
        </div>
        <div>
          <ColorLabelInput
            usedValues={new Set(usedColors)}
            value={value.color}
            onChange={(color) => onChange({ ...value, color })}
          />
        </div>
        <EmbeddedTitleInput
          placeholder="Project name"
          autoFocus
          onChange={(name) => onChange({ ...value, name })}
          value={value.name}
          onSubmit={onSubmit}
        />
        <PanelFormCloseButton onClick={onClose} />
      </EmojiColorTextInputFrame>

      <Switch
        value={value.workingDays === 'workdays'}
        size="s"
        onChange={(isWorkDaysOnly) =>
          onChange({
            ...value,
            workingDays: isWorkDaysOnly ? 'workdays' : 'everyday',
          })
        }
        label={
          <WithHint
            hint={`When enabled, time will only be tracked on workdays (excluding ${weekendDays}). Use this for work projects you don't plan to work on during non-working days.`}
          >
            Workdays only
          </WithHint>
        }
      />

      {freeHours > 0 || hasBudget ? (
        <VStack style={{ padding: 0 }}>
          <VStack style={{ padding: panelDefaultPadding, paddingBottom: 0 }}>
            <BudgetHoursInput
              max={freeHours}
              value={value.budget}
              onChange={(budget) =>
                onChange({
                  ...value,
                  budget,
                })
              }
            />
          </VStack>
          {hasBudget ? (
            <ProjectGoalInput
              value={value.goal}
              onChange={(goal) => onChange({ ...value, goal })}
              hours={shouldBePresent(value.budget)}
            />
          ) : (
            <Spacer height={panelDefaultPadding} />
          )}
        </VStack>
      ) : (
        <Text>
          All available work time has already been allocated; adjust existing
          project budgets to free up time.
        </Text>
      )}
    </>
  )
}
