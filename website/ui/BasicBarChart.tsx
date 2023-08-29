import { VStack, HStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'
import { defaultTransitionCSS } from '@increaser/ui/ui/animations/transitions'
import { HSLA } from '@increaser/ui/ui/colors/HSLA'
import { getCSSUnit } from '@increaser/ui/ui/utils/getCSSUnit'
import { ReactNode } from 'react'
import { sum } from '@increaser/utils/array/sum'
import { toPercents } from '@increaser/utils/toPercents'
import styled from 'styled-components'

export interface BarSegment {
  color: HSLA
  value: number
}

export interface Bar {
  displayValue?: ReactNode
  label?: string
  segments: BarSegment[]
}

interface Props {
  bars: Bar[]
  height: number | string
  target?: number
  min?: number
}

const displayValueSize = 12

const SegmentsContainer = styled.div`
  border-radius: 4px;
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const Segment = styled.div`
  width: 100%;
  ${defaultTransitionCSS};
`

const DisplayValueWr = styled.div`
  position: relative;
  display: flex;
  align-items: end;
  justify-content: center;
`

const DisplayValue = styled(Text)`
  position: absolute;
  white-space: nowrap;
  line-height: 1;
  bottom: 2px;
  font-size: ${getCSSUnit(displayValueSize)};
`

const Label = styled(Text)`
  position: absolute;
  top: 2px;
  white-space: nowrap;
  line-height: 1;
  bottom: 2px;
`

export const BarPlaceholder = styled(SegmentsContainer)`
  height: 2px;
  background: ${({ theme }) => theme.colors.mist.toCssValue()};
`

const TargetLine = styled.div`
  width: 100%;
  border-top: 2px dashed ${({ theme }) => theme.colors.mistExtra.toCssValue()};
  position: absolute;
`

const SegmentWr = styled(VStack)`
  ${defaultTransitionCSS};
`

export const BasicBarChart = ({ bars, height, target, min }: Props) => {
  const totals = bars.map((bar) => sum(bar.segments.map((s) => s.value)))
  const maxValue = Math.max(...totals, target || 0, min || 0)
  const hasLabels = bars.some((bar) => bar.label)

  return (
    <HStack
      gap={4}
      fullWidth
      style={{
        height: getCSSUnit(height),
        marginTop: displayValueSize,
        marginBottom: hasLabels ? displayValueSize : undefined,
        position: 'relative',
      }}
    >
      {target ? (
        <TargetLine style={{ bottom: toPercents(target / maxValue) }} />
      ) : null}
      {bars.map(({ displayValue, segments, label }, index) => {
        const total = totals[index]
        return (
          <VStack
            style={{ flex: 1 }}
            gap={2}
            fullHeight
            alignItems="center"
            key={index}
          >
            <VStack fullWidth justifyContent="end" style={{ flex: 1 }}>
              {total > 0 ? (
                <SegmentWr
                  style={{
                    height: toPercents(total / maxValue),
                  }}
                >
                  {displayValue && (
                    <DisplayValueWr>
                      <DisplayValue as="div">{displayValue}</DisplayValue>
                    </DisplayValueWr>
                  )}
                  <SegmentsContainer>
                    {segments.map(({ color, value }, index) => (
                      <Segment
                        key={index}
                        style={{
                          background: color.toCssValue(),
                          height: toPercents(value / total),
                        }}
                      />
                    ))}
                  </SegmentsContainer>
                </SegmentWr>
              ) : (
                <BarPlaceholder />
              )}
            </VStack>
            {hasLabels && (
              <DisplayValueWr>
                <Label as="div">
                  <Text
                    style={{ visibility: label ? undefined : 'hidden' }}
                    color="supporting"
                    size={12}
                  >
                    {label || index}
                  </Text>
                </Label>
              </DisplayValueWr>
            )}
          </VStack>
        )
      })}
    </HStack>
  )
}
