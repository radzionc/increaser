import styled from 'styled-components'
import { HStack } from '../../../layout/Stack'
import { toSizeUnit } from '../../../css/toSizeUnit'
import { textInputPadding } from '../../../css/textInput'
import { IconButton } from '../../../buttons/IconButton'
import { CloseIcon } from '../../../icons/CloseIcon'
import { CollapseToggleButton } from '../../../buttons/CollapseToggleButton'
import { dropdownInputConfig } from '../config'

const Container = styled(HStack)`
  position: absolute;
  gap: 4px;
  right: ${toSizeUnit(textInputPadding)};
`

interface FixedOptionsInputButtonsProps {
  onClear?: () => void
  areOptionsVisible: boolean
  toggleOptionsVisibility: () => void
}

export const FixedOptionsInputButtons = ({
  onClear,
  areOptionsVisible,
  toggleOptionsVisibility,
}: FixedOptionsInputButtonsProps) => (
  <Container>
    {onClear && (
      <IconButton
        size={dropdownInputConfig.iconButtonSize}
        icon={<CloseIcon />}
        title="Clear"
        kind="secondary"
        onClick={onClear}
      />
    )}
    <CollapseToggleButton
      size={dropdownInputConfig.iconButtonSize}
      kind="secondary"
      isOpen={areOptionsVisible}
      onMouseDown={toggleOptionsVisibility}
      onTouchStart={toggleOptionsVisibility}
    />
  </Container>
)
