import { EducationContent } from '@increaser/ui/education/components/EducationContent'
import { EducationVideo } from '@increaser/ui/education/components/EducationVideo'
import { ProductToolEducation } from '@increaser/ui/education/ProductToolEducation'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { HStack, VStack } from '@lib/ui/css/stack'
import { ComponentWithValueProps } from '@lib/ui/props'
import { Text } from '@lib/ui/text'
import styled from 'styled-components'
import { FounderContacts } from '../community/components/FounderContacts'

const Video = styled(EducationVideo)`
  ${borderRadius.m};
`

const SideSection = styled.div`
  flex: 1;
  min-width: 280px;
`

export const ProductEducationPage = ({
  value,
}: ComponentWithValueProps<ProductToolEducation>) => {
  return (
    <HStack style={{ position: 'relative' }} fullWidth wrap="wrap" gap={40}>
      <VStack style={{ maxWidth: 560 }} gap={40}>
        <VStack gap={12}>
          <Text color="contrast" size={28} weight="700">
            {value.title}
          </Text>
          <EducationContent>{value.subtitle}</EducationContent>
        </VStack>
        {value.youTubeVideoUrl && <Video value={value.youTubeVideoUrl} />}
        <EducationContent>{value.content}</EducationContent>
        <div />
      </VStack>
      <SideSection>
        <FounderContacts />
      </SideSection>
    </HStack>
  )
}
