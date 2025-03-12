import { panelDefaultPadding } from '@lib/ui/css/panel'
import { HStack, VStack } from '@lib/ui/css/stack'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { EmbeddedTitleInput } from '@lib/ui/inputs/EmbeddedTitleInput'
import { MultilineTextInput } from '@lib/ui/inputs/MultilineTextInput'
import { tightListItemConfig } from '@lib/ui/list/tightListItemConfig'
import { OnCloseProp, InputProps } from '@lib/ui/props'
import { getColor } from '@lib/ui/theme/getters'
import { useRef } from 'react'
import styled from 'styled-components'

import { panelFormConfig } from '../../form/panel/config'
import { PanelFormCloseButton } from '../../form/panel/PanelFormCloseButton'

import { PrincipleCategorySelector } from './PrincipleCategorySelector'
import { PrincipleFormShape } from './PrincipleFormShape'

type PrincipleFormFieldsProps = InputProps<PrincipleFormShape> & {
  onSubmit?: () => void
  categorySelectorAutoFocus?: boolean
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

const PrefixContainer = styled.div`
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

export const PrincipleFormFields = ({
  value,
  onChange,
  onSubmit,
  onClose,
  categorySelectorAutoFocus,
}: PrincipleFormFieldsProps) => {
  const nameInputRef = useRef<HTMLTextAreaElement | null>(null)

  return (
    <HeaderWrapper>
      <Header>
        <PrefixContainer>
          <PrincipleCategorySelector
            autoFocus={categorySelectorAutoFocus}
            value={value.categoryId}
            onChange={(categoryId) => {
              onChange({ ...value, categoryId })
              nameInputRef.current?.focus()
            }}
          />
        </PrefixContainer>
        <TitleInput
          placeholder="Your principle"
          autoFocus
          onChange={(name) => onChange({ ...value, name })}
          value={value.name}
          onSubmit={onSubmit}
        />
        <PanelFormCloseButton onClick={onClose} />
      </Header>
      <DescriptionInput
        placeholder="Add a description ..."
        onChange={(description) => onChange({ ...value, description })}
        value={value.description}
      />
    </HeaderWrapper>
  )
}
