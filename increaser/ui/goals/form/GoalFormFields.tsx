import { HStack, VStack } from '@lib/ui/css/stack'
import { GoalStatusSelector } from './GoalStatusSelector'
import { GoalDeadlineInput } from './deadline/GoalDeadlineInput'
import { GoalFormShape } from './GoalFormShape'
import { GoalTargetInput } from './target/GoalTargetInput'
import { GoalTaskFactoriesInput } from './GoalTaskFactoriesInput'
import { EmbeddedTitleInput } from '@lib/ui/inputs/EmbeddedTitleInput'
import { ClosableComponentProps, InputProps } from '@lib/ui/props'
import { EmojiInput } from '../../form/emoji-input/EmojiInput'
import { ReactNode } from 'react'
import styled from 'styled-components'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { tightListItemConfig } from '@lib/ui/list/tightListItemConfig'
import { panelDefaultPadding } from '@lib/ui/css/panel'
import { getColor } from '@lib/ui/theme/getters'
import { PanelFormCloseButton } from '../../form/panel/PanelFormCloseButton'
import { MultilineTextInput } from '@lib/ui/inputs/MultilineTextInput'
import { panelFormConfig } from '../../form/panel/config'
import { GoalHabitsInput } from './GoalHabitsInput'

type GoalFormFieldsProps = InputProps<GoalFormShape> & {
  onSubmit?: () => void
  actions?: ReactNode
} & ClosableComponentProps

const HeaderWrapper = styled(VStack)`
  padding: 0;
  width: 100%;
  flex: 1;
  overflow-y: auto;

  > * {
    flex-shrink: 0;
  }
`

const Header = styled(HStack)`
  padding: 0;
  width: 100%;
`

const EmojiInputContainer = styled.div`
  padding-left: ${toSizeUnit(tightListItemConfig.horizontalOffset)};
  padding-top: ${toSizeUnit(tightListItemConfig.horizontalOffset)};
`

const TitleInput = styled(EmbeddedTitleInput)`
  background: ${getColor('background')};

  padding: ${toSizeUnit(panelDefaultPadding)};
  padding-left: ${toSizeUnit(panelDefaultPadding / 2)};
  min-height: 100%;
  padding-bottom: ${toSizeUnit(tightListItemConfig.horizontalOffset)};
`

const DescriptionInput = styled(MultilineTextInput)`
  background: ${getColor('background')};
  padding: ${toSizeUnit(panelDefaultPadding)};
  padding-top: ${toSizeUnit(panelDefaultPadding / 2)};
  min-height: ${toSizeUnit(panelFormConfig.sectionMinHeight)};
  line-height: 1.5;
`

export const GoalFormFields = ({
  value,
  onChange,
  onSubmit,
  onClose,
  actions,
}: GoalFormFieldsProps) => {
  return (
    <>
      <HeaderWrapper>
        <Header>
          <EmojiInputContainer>
            <EmojiInput
              value={value.emoji}
              onChange={(emoji) => onChange({ ...value, emoji })}
            />
          </EmojiInputContainer>
          <TitleInput
            placeholder="Your goal"
            autoFocus
            onChange={(name) => onChange({ ...value, name })}
            value={value.name}
            onSubmit={onSubmit}
          />
          <PanelFormCloseButton onClick={onClose} />
        </Header>
        <DescriptionInput
          placeholder="Add a plan ..."
          onChange={(plan) => onChange({ ...value, plan })}
          value={value.plan}
        />
        <GoalDeadlineInput
          value={value.deadlineAt}
          onChange={(deadlineAt) => onChange({ ...value, deadlineAt })}
        />
        <GoalTargetInput
          value={value.target}
          onChange={(target) => onChange({ ...value, target })}
        />
        <GoalTaskFactoriesInput
          onChange={(taskFactories) => onChange({ ...value, taskFactories })}
          value={value.taskFactories}
        />
        <GoalHabitsInput
          onChange={(habits) => onChange({ ...value, habits })}
          value={value.habits}
        />
      </HeaderWrapper>
      <HStack fullWidth alignItems="center" gap={8} wrap="wrap">
        <GoalStatusSelector
          value={value.status}
          onChange={(status) => onChange({ ...value, status })}
        />
        {actions}
      </HStack>
    </>
  )
}
