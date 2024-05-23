import styled, { useTheme } from 'styled-components'

import { HStack } from '../../layout/Stack'
import { Text } from '../../text'
import { sameDimensions } from '../../css/sameDimensions'
import { round } from '../../css/round'
import { transition } from '../../css/transition'
import { centerContent } from '../../css/centerContent'
import { interactive } from '../../css/interactive'
import { toSizeUnit } from '../../css/toSizeUnit'
import { getColor } from '../../theme/getters'
import { UIComponentProps, InputProps } from '../../props'
import { match } from '@lib/utils/match'

type SwitchSize = 'm' | 's'

type SwitchProps = UIComponentProps &
  InputProps<boolean> & {
    size?: SwitchSize
    label?: string
  }
const switchHeight: Record<SwitchSize, number> = { m: 24, s: 20 }
const spacing = 2

const getControlSize = (size: SwitchSize) => switchHeight[size] - spacing * 2
const getSwitchWidth = (size: SwitchSize) => switchHeight[size] * 1.58

const Control = styled.div<{ size: SwitchSize }>`
  ${({ size }) => sameDimensions(getControlSize(size))};

  ${round};
  ${transition};

  ${centerContent};
  color: ${getColor('background')};
  background: ${getColor('text')};
  font-size: 14px;
`

const Wrapper = styled(HStack)`
  ${interactive};

  color: ${getColor('textSupporting')};
  ${transition};

  &:hover {
    color: ${getColor('text')};
  }

  &:hover ${Control} {
    transform: scale(1.08);
  }
`

const Container = styled.div<{ size: SwitchSize }>`
  width: ${({ size }) => toSizeUnit(getSwitchWidth(size))};
  height: ${({ size }) => toSizeUnit(switchHeight[size])};

  display: flex;
  align-items: center;

  ${round};

  ${transition};
`

export const Switch = ({
  value,
  onChange,
  label,
  size = 'm',
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
      {...rest}
    >
      <Container
        size={size}
        style={{
          background: (value ? colors.primary : colors.textShy).toCssValue(),
        }}
      >
        <Control
          size={size}
          style={{
            marginLeft: value
              ? getSwitchWidth(size) - getControlSize(size) - spacing
              : spacing,
          }}
        />
      </Container>
      {label && (
        <Text
          size={match(size, { m: () => 16, s: () => 14 })}
          weight="semibold"
        >
          {label}
        </Text>
      )}
    </Wrapper>
  )
}
