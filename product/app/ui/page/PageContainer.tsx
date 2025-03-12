import { VStack } from '@lib/ui/css/stack'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import styled from 'styled-components'

export const defaultPageWidth = 940

export const PageContainer = styled(VStack)`
  width: 100%;
  max-width: ${toSizeUnit(defaultPageWidth)};
`
