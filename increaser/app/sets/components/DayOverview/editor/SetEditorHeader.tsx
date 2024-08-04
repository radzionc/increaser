import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { HStack } from '@lib/ui/layout/Stack'
import styled from 'styled-components'
import { headerHeightInPx, horizontalPaddingInPx } from '../config'
import { SectionTitle } from '@lib/ui/text/SectionTitle'
import { useActiveSetType } from '../hooks/useActiveSetType'
import { useActiveSet } from '../ActiveSetProvider'
import { Button } from '@lib/ui/buttons/Button'
import { ArrowLeftIcon } from '@lib/ui/icons/ArrowLeftIcon'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'

const buttonMargin = 2

const Container = styled(HStack)`
  align-items: center;
  gap: 20px;
  width: 100%;
  justify-content: space-between;
  height: ${toSizeUnit(headerHeightInPx)};
  padding-right: ${toSizeUnit(buttonMargin)};
`

const BackButton = styled(Button)`
  ${horizontalPadding(toSizeUnit(horizontalPaddingInPx - buttonMargin))};
  height: ${toSizeUnit(headerHeightInPx - buttonMargin * 2)};
`

export const SetEditorHeader = () => {
  const activeSetType = useActiveSetType()
  const verb = activeSetType === 'new' ? 'Add' : 'Edit'

  const [, setActiveSet] = useActiveSet()

  return (
    <Container>
      <SectionTitle size={14}>{verb} a session</SectionTitle>
      <BackButton
        onClick={() => {
          setActiveSet(null)
        }}
        size="s"
        kind="ghost"
      >
        <HStack alignItems="center" gap={8}>
          <IconWrapper>
            <ArrowLeftIcon />
          </IconWrapper>
          Back
        </HStack>
      </BackButton>
      {/* <Button
        onClick={() => {
          setActiveSet(null)
        }}
        kind="ghost"
        size="s"
      >
        Back
      </Button> */}
    </Container>
  )
}
