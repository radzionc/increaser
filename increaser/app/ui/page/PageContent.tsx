import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { VStack } from '@lib/ui/layout/Stack'
import styled from 'styled-components'

const pageContentGap = 40

export const PageContent = styled(VStack)`
  gap: ${toSizeUnit(pageContentGap)};
  flex: 1 1 auto;
`
