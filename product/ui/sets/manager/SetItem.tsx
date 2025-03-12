import { borderRadius } from '@lib/ui/css/borderRadius'
import { takeWholeSpace } from '@lib/ui/css/takeWholeSpace'
import { getColor } from '@lib/ui/theme/getters'
import { Set } from '@product/entities/User'
import { useUser } from '@product/ui/user/state/user'
import { ComponentProps } from 'react'
import styled, { useTheme } from 'styled-components'

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
