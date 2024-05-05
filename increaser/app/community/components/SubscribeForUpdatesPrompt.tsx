import { transition } from '@lib/ui/css/transition'
import { TelegramIcon } from '@lib/ui/icons/TelegramIcon'
import { HStack } from '@lib/ui/layout/Stack'
import { ExternalLink } from '@lib/ui/navigation/Link/ExternalLink'
import { Panel } from '@lib/ui/panel/Panel'
import { SectionTitle } from '@lib/ui/text/SectionTitle'
import { getColor } from '@lib/ui/theme/getters'
import styled from 'styled-components'

const Container = styled(Panel)`
  ${transition};
  cursor: pointer;
  &:hover {
    background: ${getColor('mistExtra')};
  }

  svg {
    font-size: 24px;
  }
`

export const SubscribeForUpdatesPrompt = () => {
  return (
    <ExternalLink to="https://t.me/increaser_app">
      <Container>
        <HStack alignItems="center" gap={16}>
          <TelegramIcon />
          <SectionTitle>See Increaser Updates First on Telegram!</SectionTitle>
        </HStack>
      </Container>
    </ExternalLink>
  )
}
