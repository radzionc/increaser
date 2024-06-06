import { SectionTitle } from '@lib/ui/text/SectionTitle'
import styled from 'styled-components'
import { Panel } from '@lib/ui/panel/Panel'
import { SafeImage } from '@lib/ui/images/SafeImage'
import { SubscriptionFeatures } from '@increaser/ui/subscription/SubscriptionFeatures'
import { productName } from '@increaser/config'

const Image = styled.img`
  padding: 0;
  width: 100%;
  object-fit: contain;
`

export const MembershipPersuasion = () => {
  return (
    <Panel withSections>
      <div>
        <SectionTitle>
          Unlock your full potential with {productName}
        </SectionTitle>
      </div>
      <SafeImage
        src="/images/morning.webp"
        render={(props) => <Image {...props} />}
      />
      <SubscriptionFeatures />
    </Panel>
  )
}
