import { borderRadius } from '@lib/ui/css/borderRadius'
import { HStack, VStack } from '@lib/ui/css/stack'
import { ValueProp } from '@lib/ui/props'
import { Text } from '@lib/ui/text'
import { EducationContent } from '@product/ui/education/components/EducationContent'
import { EducationVideo } from '@product/ui/education/components/EducationVideo'
import { ProductToolEducation } from '@product/ui/education/ProductToolEducation'
import styled from 'styled-components'

const Video = styled(EducationVideo)`
  ${borderRadius.m};
`

export const ProductEducationPage = ({
  value,
}: ValueProp<ProductToolEducation>) => {
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
    </HStack>
  )
}
