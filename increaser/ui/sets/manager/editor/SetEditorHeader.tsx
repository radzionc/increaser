import { HStack } from '@lib/ui/css/stack'
import styled from 'styled-components'
import { SectionTitle } from '@lib/ui/text/SectionTitle'
import { useActiveSetType } from '../overview/hooks/useActiveSetType'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { SetEditorProject } from './SetEditorProject'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { setEditorConfig } from './config'

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
