import { Set } from '@increaser/entities/User'
import { getColor } from '@lib/ui/theme/getters'
import styled, { useTheme } from 'styled-components'
import { useUser } from '@increaser/ui/user/state/user'
import { ComponentProps } from 'react'
import { takeWholeSpace } from '@lib/ui/css/takeWholeSpace'
import { borderRadius } from '@lib/ui/css/borderRadius'

const Container = styled.div`
  ${borderRadius.xs};
  background: ${getColor('foreground')};
  overflow: hidden;
  ${takeWholeSpace};
`

type SetItemProps = ComponentProps<typeof Container> & Pick<Set, 'projectId'>

const Identifier = styled.div`
  width: 4px;
  height: 100%;
`

export const SetItem = ({ projectId, ...rest }: SetItemProps) => {
  const { projects } = useUser()

  const theme = useTheme()

  const color = theme.colors.getLabelColor(projects[projectId].color)

  return (
    <Container {...rest}>
      <Identifier style={{ background: color.toCssValue() }} />
    </Container>
  )
}
