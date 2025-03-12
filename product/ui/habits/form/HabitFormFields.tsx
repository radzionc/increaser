import { panelDefaultPadding } from '@lib/ui/css/panel'
import { VStack, HStack } from '@lib/ui/css/stack'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { EmbeddedTitleInput } from '@lib/ui/inputs/EmbeddedTitleInput'
import { MultilineTextInput } from '@lib/ui/inputs/MultilineTextInput'
import { tightListItemConfig } from '@lib/ui/list/tightListItemConfig'
import { OnCloseProp, InputProps, OnSubmitProp } from '@lib/ui/props'
import { getColor } from '@lib/ui/theme/getters'
import styled from 'styled-components'

import { EmojiInput } from '../../form/emoji-input/EmojiInput'
import { panelFormConfig } from '../../form/panel/config'
import { PanelFormCloseButton } from '../../form/panel/PanelFormCloseButton'

import { HabitFormShape } from './HabitFormShape'

type HabitFormFieldsProps = InputProps<HabitFormShape> &
  Partial<OnSubmitProp> &
  OnCloseProp

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

export const HabitFormFields = ({
  value,
  onChange,
  onSubmit,
  onClose,
}: HabitFormFieldsProps) => {
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
            placeholder="Habit name"
            autoFocus
            onChange={(name) => onChange({ ...value, name })}
            value={value.name}
            onSubmit={onSubmit}
          />
          <PanelFormCloseButton onClick={onClose} />
        </Header>
        <DescriptionInput
          placeholder="Describe when you’ll complete this habit each day (e.g., after waking up)."
          onChange={(plan) => onChange({ ...value, plan })}
          value={value.plan ?? ''}
        />
      </HeaderWrapper>
    </>
  )
}
