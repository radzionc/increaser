import { productTools, ProductTool } from '@increaser/entities/ProductTool'
import { HStack, VStack } from '@lib/ui/css/stack'
import { Text } from '@lib/ui/text'
import { ReactNode } from 'react'
import { ProductToolIcon } from '@increaser/ui/tools/ProductToolIcon'
import styled from 'styled-components'
import { getColor } from '@lib/ui/theme/getters'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'

const productToolDescriptionRecord: Record<ProductTool, ReactNode> = {
  focus: (
    <>
      Focus like never before with our <b>Deep Work Timer</b>, designed to help
      you concentrate and achieve more in less time.
    </>
  ),
  trackTime: (
    <>
      Effortlessly monitor your work hours and productivity trends with our{' '}
      <b>Time Tracking</b> tool.
    </>
  ),
  tasks: (
    <>
      Stay organized and conquer your to-do list with our comprehensive{' '}
      <b>Task Management</b> system.
    </>
  ),
  habits: (
    <>
      Build and maintain positive habits effortlessly using our insightful{' '}
      <b>Habit Tracking</b> feature.
    </>
  ),
  vision: (
    <>
      Create and pursue your ideal life vision with our inspiring <b>Vision</b>{' '}
      tool.
    </>
  ),
  goals: (
    <>
      Set clear goals and track your progress towards achieving your dreams with
      our <b>Goals</b> tool.
    </>
  ),
  workPreferences: (
    <>
      Customize your work environment and schedule for maximum productivity with
      our <b>Work Preferences</b> tool.
    </>
  ),
}

const lineHeight = 20

const Icon = styled(ProductToolIcon)`
  font-size: ${toSizeUnit(lineHeight)};
`

const Container = styled(Text)`
  font-size: 14px;
  line-height: ${toSizeUnit(lineHeight)};
  font-weight: 500;
  color: ${getColor('textSupporting')};

  b {
    color: ${getColor('contrast')};
    font-weight: 600;
  }
`

export const SubscriptionFeatures = () => {
  return (
    <VStack gap={20}>
      {productTools.map((tool) => (
        <HStack key={tool} gap={8}>
          <Icon value={tool} />
          <Container key={tool}>{productToolDescriptionRecord[tool]}</Container>
        </HStack>
      ))}
    </VStack>
  )
}
