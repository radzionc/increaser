import { HStack } from '@lib/ui/css/stack'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { SectionTitle } from '@lib/ui/text/SectionTitle'
import styled from 'styled-components'

import { useActiveSetType } from '../overview/hooks/useActiveSetType'

import { setEditorConfig } from './config'
import { SetEditorProject } from './SetEditorProject'

const Container = styled(HStack)`
  align-items: center;
  gap: 20px;
  width: 100%;
  justify-content: space-between;
  ${verticalPadding(setEditorConfig.rightPadding)};
  padding-right: ${toSizeUnit(setEditorConfig.rightPadding)};
`

export const SetEditorHeader = () => {
  const type = useActiveSetType()

  const verb = type === 'new' ? 'Add' : 'Edit'

  return (
    <Container>
      <SectionTitle size={14}>{verb} a session</SectionTitle>
      <SetEditorProject />
    </Container>
  )
}
