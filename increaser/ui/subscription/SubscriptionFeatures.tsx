import { productTools, ProductTool } from '@increaser/entities/ProductTool'
import { HStack, VStack } from '@lib/ui/layout/Stack'
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
      Stay organized and on top of your to-do list with our comprehensive{' '}
      <b>Task Management</b> system.
    </>
  ),
  workBudget: (
    <>
      Set and manage your work hours efficiently with our <b>Work Budgeting</b>{' '}
      feature to maintain a balanced schedule.
    </>
  ),
  timePlanner: (
    <>
      Plan your week effectively and allocate time to your projects with our
      powerful <b>Time Planning</b> tool.
    </>
  ),
  habits: (
    <>
      Build and maintain positive habits with ease using our insightful{' '}
      <b>Habit Tracking</b> feature.
    </>
  ),
  schedule: (
    <>
      Optimize your daily routine and ensure a smooth workflow with our
      user-friendly <b>Scheduling</b> tool.
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
        <HStack gap={8}>
          <Icon value={tool} />
          <Container key={tool}>{productToolDescriptionRecord[tool]}</Container>
        </HStack>
      ))}
    </VStack>
  )
}
