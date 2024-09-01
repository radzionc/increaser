import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { takeWholeSpace } from '@lib/ui/css/takeWholeSpace'
import { HStack } from '@lib/ui/layout/Stack'
import { panelDefaultPadding } from '@lib/ui/panel/Panel'
import { InputProps, RemovableComponentProps } from '@lib/ui/props'
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

const Container = styled(ActionInsideInteractiveElement)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  width: 100%;
  height: ${toSizeUnit(focusLauncherConfig.sectionMinHeight)};
  position: relative;
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
`

type FocusEntityInputHeaderProps = InputProps<boolean> &
  RemovableComponentProps & {
    label: ReactNode
  }

export const FocusEntityInputHeader = ({
  value,
  onChange,
  onRemove,
  label,
}: FocusEntityInputHeaderProps) => {
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
            onChange(false)
          }}
        />
      }
      render={({ actionSize }) => (
        <Content onClick={() => onChange(!value)}>
          <Text cropped>{label}</Text>
          <HStack>
            {actionSize && <Spacer width={actionSize.width} />}
            <Indicator
              forwardedAs="div"
              kind="secondary"
              icon={<CollapsableStateIndicator isOpen={value} />}
              title={value ? 'Close' : 'Open'}
            />
          </HStack>
        </Content>
      )}
    />
  )
}
