import { Point } from '@lib/ui/entities/Point'
import {
  offset,
  shift,
  flip,
  useFloating,
  autoUpdate,
} from '@floating-ui/react'
import styled from 'styled-components'
import { useEffect } from 'react'
import { getColor } from '@lib/ui/theme/getters'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { VStack } from '@lib/ui/css/stack'
import { ComponentWithIndexProps } from '@lib/ui/props'
import { useTimeGrouping } from '../timeGrouping/useTimeGrouping'
import { centerContent } from '@lib/ui/css/centerContent'

type DataPointInfoProps = {
  position: Point
} & ComponentWithIndexProps

const Reference = styled.div`
  position: fixed;
  pointer-events: none;
`

const Container = styled(VStack)`
  border: 1px solid ${getColor('textSupporting')};
  background: ${getColor('foreground')};
  ${borderRadius.s};
  ${centerContent};
  min-width: 40px;

  padding: 8px;
`

export const DataSizeOptionTooltip = ({
  position,
  index,
}: DataPointInfoProps) => {
  const [timeGrouping] = useTimeGrouping()

  const {
    refs: { setReference, setFloating },
    floatingStyles,
    update,
  } = useFloating({
    open: true,
    placement: 'bottom',
    strategy: 'fixed',
    middleware: [offset(16), flip(), shift()],
    whileElementsMounted: autoUpdate,
  })

  useEffect(() => {
    update()
  }, [position, update])

  return (
    <>
      <Reference
        ref={setReference}
        style={{
          left: position.x,
          top: position.y,
        }}
      />
      <Container ref={setFloating} style={{ ...floatingStyles, zIndex: 1 }}>
        {index}
        {timeGrouping[0].toUpperCase()}
      </Container>
    </>
  )
}
