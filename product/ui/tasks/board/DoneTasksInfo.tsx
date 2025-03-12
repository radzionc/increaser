import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { InfoIcon } from '@lib/ui/icons/InfoIcon'
import { getColor } from '@lib/ui/theme/getters'
import styled from 'styled-components'

import { taskBoardConfig } from './config'

const Container = styled.div`
  padding: ${toSizeUnit(taskBoardConfig.itemHorizontalPadding)};
  line-height: 1.5;
  color: ${getColor('textSupporting')};
`

export const DoneTasksInfo = () => {
  return (
    <Container>
      <IconWrapper style={{ marginRight: 8 }}>
        <InfoIcon />
      </IconWrapper>
      Completed tasks are cleared at the start of each week.
    </Container>
  )
}
