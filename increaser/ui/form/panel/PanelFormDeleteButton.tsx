import { HStack } from '@lib/ui/css/stack'
import { TrashBinIcon } from '@lib/ui/icons/TrashBinIcon'
import { OnClickProp } from '@lib/ui/props'
import { ExpandableSelectorContainer } from '@lib/ui/select/ExpandableSelectorContainer'
import { getHoverVariant } from '@lib/ui/theme/getHoverVariant'
import { getColor } from '@lib/ui/theme/getters'
import styled from 'styled-components'

const Container = styled(ExpandableSelectorContainer)`
  padding-right: 16px;
  color: ${getColor('alert')};

  &:hover {
    background: ${getHoverVariant('foreground')};
  }
`

export const PanelFormDeleteButton = ({ onClick }: OnClickProp) => {
  return (
    <Container onClick={onClick}>
      <HStack alignItems="center" gap={8}>
        <TrashBinIcon />
        Delete
      </HStack>
    </Container>
  )
}
