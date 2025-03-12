import { VStack } from '@lib/ui/css/stack'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { ChildrenProp } from '@lib/ui/props'
import { Text } from '@lib/ui/text'
import { ReactNode } from 'react'

type VisionImageInputContentProps = {
  title: ReactNode
  subTitle: ReactNode
  icon: ReactNode
} & Partial<ChildrenProp>

export const VisionImageInputContent = ({
  title,
  subTitle,
  icon,
  children,
}: VisionImageInputContentProps) => (
  <VStack alignItems="center" gap={16}>
    <IconWrapper style={{ fontSize: 40 }}>{icon}</IconWrapper>
    <VStack alignItems="center" gap={8}>
      <Text weight="600">{title}</Text>
      <Text size={14} color="supporting">
        {subTitle}
      </Text>
      {children}
    </VStack>
  </VStack>
)
