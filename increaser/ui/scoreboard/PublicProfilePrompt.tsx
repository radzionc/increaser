import { borderRadius } from '@lib/ui/css/borderRadius'
import { getColor } from '@lib/ui/theme/getters'
import styled from 'styled-components'
import { getAppPath } from '../navigation/app'
import Link from 'next/link'
import { HStack } from '@lib/ui/layout/Stack'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { VenetianMaskIcon } from '@lib/ui/icons/VenetianMaskIcon'

const Prompt = styled.div`
  border: 2px dashed ${getColor('mistExtra')};
  width: 100%;
  padding: 12px;
  color: ${getColor('contrast')};
  line-height: 1.5;
  font-size: 14px;
  font-weight: 500;
  ${borderRadius.s};

  &:hover {
    border-color: ${getColor('primary')};
  }

  svg {
    color: ${getColor('primary')};
  }
`

export const PublicProfilePrompt = () => {
  return (
    <Link href={getAppPath('profile')}>
      <Prompt>
        <HStack alignItems="start" gap={12}>
          <IconWrapper style={{ fontSize: 40 }}>
            <VenetianMaskIcon />
          </IconWrapper>
          Stand out! Enable your public profile to show your name and country.
        </HStack>
      </Prompt>
    </Link>
  )
}
