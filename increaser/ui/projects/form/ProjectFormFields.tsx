import { EmbeddedTitleInput } from '@lib/ui/inputs/EmbeddedTitleInput'
import {
  ClosableComponentProps,
  InputProps,
  SubmittableComponentProps,
} from '@lib/ui/props'
import { EmojiInput } from '../../form/emoji-input/EmojiInput'
import { PanelFormCloseButton } from '../../form/panel/PanelFormCloseButton'
import { EmojiColorTextInputFrame } from '../../form/EmojiColorTextInputFrame'
import { ColorLabelInput } from '@lib/ui/inputs/ColorLabelInput'
import { useActiveProjects } from '../hooks/useActiveProjects'
import { BudgetHoursInput } from '../budget/BudgetHoursInput'
import { ProjectFormShape } from './ProjectFormShape'
import { Switch } from '@lib/ui/inputs/Switch'
import { ProjectGoalInput } from '../budget/ProjectGoalInput'

type ProjectFormFieldsProps = InputProps<ProjectFormShape> &
  Partial<SubmittableComponentProps> &
  ClosableComponentProps & {
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
        label="Workdays Only (Mon-Fri)"
      />

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

      {value.budget && (
        <ProjectGoalInput
          value={value.goal}
          onChange={(goal) => onChange({ ...value, goal })}
          hours={value.budget}
        />
      )}
    </>
  )
}
