import { borderRadius } from '@lib/ui/css/borderRadius'
import { HStack } from '@lib/ui/css/stack'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { VenetianMaskIcon } from '@lib/ui/icons/VenetianMaskIcon'
import { getColor } from '@lib/ui/theme/getters'
import Link from 'next/link'
import styled from 'styled-components'

import { getAppPath } from '../navigation/app'

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
