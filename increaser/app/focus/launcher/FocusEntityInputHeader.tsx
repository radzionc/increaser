import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { takeWholeSpace } from '@lib/ui/css/takeWholeSpace'
import { HStack } from '@lib/ui/layout/Stack'
import { panelDefaultPadding } from '@lib/ui/panel/Panel'
import { ComponentWithValueProps, RemovableComponentProps } from '@lib/ui/props'
import styled from 'styled-components'
import { Text } from '@lib/ui/text'
import { CollapsableStateIndicator } from '@lib/ui/layout/CollapsableStateIndicator'
import { getColor } from '@lib/ui/theme/getters'
import { CloseIcon } from '@lib/ui/icons/CloseIcon'
import { interactive } from '@lib/ui/css/interactive'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { ActionInsideInteractiveElement } from '@lib/ui/base/ActionInsideInteractiveElement'
import { Spacer } from '@lib/ui/layout/Spacer'
import { focusLauncherConfig } from './config'
import { FocusIconButton } from '../components/FocusSetWidget/FocusIconButton'
import { ReactNode } from 'react'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'

const Container = styled(ActionInsideInteractiveElement)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  width: 100%;
  height: ${toSizeUnit(focusLauncherConfig.sectionMinHeight)};
  position: relative;
`

const Label = styled(Text)`
  color: ${getColor('textSupporting')};
`

const Indicator = styled(FocusIconButton)``

const Content = styled(HStack)`
  align-items: center;
  justify-content: space-between;

  ${interactive};
  ${takeWholeSpace};

  ${horizontalPadding(panelDefaultPadding)};

  &:hover ${Indicator} {
    background: ${getColor('mist')};
    color: ${getColor('contrast')};
  }

  &:hover ${Label} {
    color: ${getColor('textPrimary')};
  }
`

const IconContainer = styled(IconWrapper)`
  color: ${getColor('textPrimary')};
  font-size: 16px;
`

type FocusEntityInputHeaderProps<T> = RemovableComponentProps &
  ComponentWithValueProps<T> & {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void

    label: string
    icon: ReactNode

    renderValue: (value: NonNullable<T>) => ReactNode
  }

export function FocusEntityInputHeader<T>({
  value,
  renderValue,

  isOpen,
  setIsOpen,

  onRemove,
  label,
  icon,
}: FocusEntityInputHeaderProps<T>) {
  return (
    <Container
      actionPlacerStyles={{ right: 60 }}
      action={
        <FocusIconButton
          kind="secondary"
          title="Clear"
          icon={<CloseIcon />}
          onClick={() => {
            onRemove()
            setIsOpen(false)
          }}
        />
      }
      render={({ actionSize }) => (
        <Content onClick={() => setIsOpen(!isOpen)}>
          {value ? (
            <Text cropped>{renderValue(value)}</Text>
          ) : (
            <HStack alignItems="center" gap={8}>
              <IconContainer>{icon}</IconContainer>
              <Label>{label}</Label>
            </HStack>
          )}

          <HStack>
            {actionSize && <Spacer width={actionSize.width} />}
            <Indicator
              forwardedAs="div"
              kind="secondary"
              icon={<CollapsableStateIndicator isOpen={isOpen} />}
              title={value ? 'Close' : 'Open'}
            />
          </HStack>
        </Content>
      )}
    />
  )
}
