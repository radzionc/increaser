import { UnstyledButton } from '@lib/ui/buttons/UnstyledButton'
import { panelDefaultPadding } from '@lib/ui/css/panel'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { Text } from '@lib/ui/text'
import styled from 'styled-components'

export const PlayIndicator = styled.div<{ isActive: boolean }>`
  opacity: ${({ isActive }) => (isActive ? 1 : 0)};
  position: absolute;

  font-size: 20px;
  display: flex;
  color: ${({ theme }) => theme.colors.text.toCssValue()};
`

export const SoundNumber = styled(Text)``

export const SoundItemContainer = styled(UnstyledButton)`
  font-size: 14px;
  font-weight: 500;
  padding: 4px ${toSizeUnit(panelDefaultPadding)};
  width: 100%;
  display: grid;
  grid-template-columns: minmax(24px, auto) 1fr auto;
  align-items: center;
  gap: 8px;
  justify-items: start;
  color: ${({ theme }) => theme.colors.textSupporting.toCssValue()};

  &:hover {
    background: ${({ theme }) => theme.colors.mist.toCssValue()};
    color: ${({ theme }) => theme.colors.text.toCssValue()};
  }

  &:hover ${PlayIndicator} {
    opacity: 1;
  }
  &:hover ${SoundNumber} {
    opacity: 0;
  }
`
