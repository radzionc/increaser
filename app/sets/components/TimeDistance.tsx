import { formatDuration } from '@increaser/utils/time/formatDuration'
import styled from 'styled-components'
import { ChevronDownIcon } from '@increaser/ui/icons/ChevronDownIcon'
import { ChevronUpIcon } from '@increaser/ui/icons/ChevronUpIcon'
import { HStack, VStack } from '@increaser/ui/layout/Stack'
import { Text } from '@increaser/ui/text'

type TypeDistanceKind = 'regular' | 'alert' | 'success' | 'secondary'

interface TimeDistanceProps {
  value: number
  kind?: TypeDistanceKind
  text?: string
  style?: React.CSSProperties
}

const Container = styled(HStack)<{ kind: TypeDistanceKind }>`
  color: ${({ kind, theme }) =>
    ({
      regular: theme.colors.text,
      alert: theme.colors.alert,
      success: theme.colors.success,
      secondary: theme.colors.textSupporting,
    })[kind].toCssValue()};
`

const ArrowContainer = styled(VStack)`
  font-size: 24px;
  height: 100%;

  svg {
    width: 18px;
  }
`

const DashedLine = styled.div`
  border-right: 1px dashed;
  border-left: 1px dashed;

  height: 100%;
`

export const TimeDistance = ({
  value,
  kind = 'regular',
  text,
  style,
}: TimeDistanceProps) => {
  return (
    <Container style={style} kind={kind} alignItems="center" gap={18}>
      <ArrowContainer alignItems="center">
        <ChevronUpIcon />
        <DashedLine />
        <ChevronDownIcon />
      </ArrowContainer>
      <Text weight="semibold" size={14}>
        <Text as="span">{formatDuration(value, 'min')}</Text>{' '}
        <Text as="span" color="supporting">
          {text}
        </Text>
      </Text>
    </Container>
  )
}
