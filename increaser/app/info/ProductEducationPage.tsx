import { EducationContent } from '@increaser/ui/education/components/EducationContent'
import { EducationVideo } from '@increaser/ui/education/components/EducationVideo'
import { ProductToolEducation } from '@increaser/ui/education/ProductToolEducation'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { VStack } from '@lib/ui/css/stack'
import { ComponentWithValueProps } from '@lib/ui/props'
import { Text } from '@lib/ui/text'
import styled from 'styled-components'

const Video = styled(EducationVideo)`
  ${borderRadius.m};
`

export const ProductEducationPage = ({
  value,
}: ComponentWithValueProps<ProductToolEducation>) => {
  return (
    <VStack style={{ maxWidth: 560 }} gap={40}>
      <VStack gap={8}>
        <Text color="contrast" size={20} weight="600">
          {value.title}
        </Text>
        <Text color="supporting" size={14}>
          {value.subtitle}
        </Text>
      </VStack>
      <Video value={value.youTubeVideoUrl} />
      <EducationContent>{value.content}</EducationContent>
    </VStack>
  )
}
