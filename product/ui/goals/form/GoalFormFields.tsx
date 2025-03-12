import { panelDefaultPadding } from '@lib/ui/css/panel'
import { HStack, VStack } from '@lib/ui/css/stack'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { EmbeddedTitleInput } from '@lib/ui/inputs/EmbeddedTitleInput'
import { MultilineTextInput } from '@lib/ui/inputs/MultilineTextInput'
import { tightListItemConfig } from '@lib/ui/list/tightListItemConfig'
import { OnCloseProp, InputProps } from '@lib/ui/props'
import { getColor } from '@lib/ui/theme/getters'
import { ReactNode } from 'react'
import styled from 'styled-components'

import { EmojiInput } from '../../form/emoji-input/EmojiInput'
import { panelFormConfig } from '../../form/panel/config'
import { PanelFormCloseButton } from '../../form/panel/PanelFormCloseButton'

import { GoalDeadlineInput } from './deadline/GoalDeadlineInput'
import { GoalFormShape } from './GoalFormShape'
import { GoalHabitsInput } from './GoalHabitsInput'
import { GoalPrinciplesInput } from './GoalPrinciplesInput'
import { GoalStatusSelector } from './GoalStatusSelector'
import { GoalTaskFactoriesInput } from './GoalTaskFactoriesInput'
import { GoalVisionInput } from './GoalVisionInput'
import { GoalTargetInput } from './target/GoalTargetInput'

type GoalFormFieldsProps = InputProps<GoalFormShape> & {
  onSubmit?: () => void
  actions?: ReactNode
} & OnCloseProp

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
        <GoalVisionInput
          value={value.vision}
          onChange={(vision) => onChange({ ...value, vision })}
        />
        <GoalTaskFactoriesInput
          onChange={(taskFactories) => onChange({ ...value, taskFactories })}
          value={value.taskFactories}
        />
        <GoalHabitsInput
          onChange={(habits) => onChange({ ...value, habits })}
          value={value.habits}
        />
        <GoalPrinciplesInput
          value={value.principles}
          onChange={(principles) => onChange({ ...value, principles })}
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
