import { HStack, VStack } from '@lib/ui/css/stack'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { Text } from '@lib/ui/text'
import { getColor } from '@lib/ui/theme/getters'
import { productTools, ProductTool } from '@product/entities/ProductTool'
import { ProductToolIcon } from '@product/ui/tools/ProductToolIcon'
import { ReactNode } from 'react'
import styled from 'styled-components'

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
  principles: (
    <>
      Define and live by your core values using our <b>Principles</b> feature to
      guide your decisions.
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
