import styled, { css, useTheme } from 'styled-components'

import { HStack } from '../../layout/Stack'
import { Text } from '../../text'
import { sameDimensions } from '../../css/sameDimensions'
import { round } from '../../css/round'
import { transition } from '../../css/transition'
import { centerContent } from '../../css/centerContent'
import { interactive } from '../../css/interactive'
import { toSizeUnit } from '../../css/toSizeUnit'
import { getColor } from '../../theme/getters'
import { UIComponentProps } from '../../props'

type SwitchKind = 'regular' | 'primary'

type SwitchProps = UIComponentProps & {
  value: boolean
  kind?: SwitchKind
  onChange: (value: boolean) => void
  label?: string
  className?: string
}

const switchHeight = 24
const switchWidth = switchHeight * 1.58
const spacing = 2
const controlSize = switchHeight - spacing * 2

const Control = styled.div`
  ${sameDimensions(controlSize)};

  ${round};
  ${transition};

  ${centerContent};
  color: ${getColor('background')};
  background: ${getColor('text')};
  font-size: 14px;
`

const Wrapper = styled(HStack)<{ kind: SwitchKind }>`
  ${interactive};

  ${({ kind }) =>
    kind === 'primary' &&
    css`
      padding: 2px;
      padding-right: 10px;
      background: ${getColor('background')};
      border: 1px solid ${getColor('mist')};
      ${round};
    `}

  color: ${getColor('textSupporting')};
  ${transition};

  &:hover {
    color: ${getColor('text')};
  }

  &:hover ${Control} {
    transform: scale(1.08);
  }
`

const Container = styled.div`
  width: ${toSizeUnit(switchWidth)};
  height: ${toSizeUnit(switchHeight)};

  display: flex;
  align-items: center;

  ${round};

  ${transition};
`

export const Switch = ({
  value,
  onChange,
  label,
  kind = 'regular',
  ...rest
}: SwitchProps) => {
  const { colors } = useTheme()
  return (
    <Wrapper
      onClick={() => onChange(!value)}
      as="label"
      alignItems="center"
      gap={8}
      id={label}
      kind={kind}
      {...rest}
    >
      <Container
        style={{
          background: (value ? colors.primary : colors.textShy).toCssValue(),
        }}
      >
        <Control
          style={{
            marginLeft: value ? switchWidth - controlSize - spacing : spacing,
          }}
        />
      </Container>
      {label && (
        <Text size={16} weight="semibold">
          {label}
        </Text>
      )}
    </Wrapper>
  )
}
