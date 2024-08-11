import { PrincipleIdea } from '@increaser/entities-utils/principle/principleIdeas'
import { ComponentWithValueProps } from '@lib/ui/props'
import styled from 'styled-components'
import { defaultPrincipleCategories } from '@increaser/entities/PrincipleCategory'
import { findBy } from '@lib/utils/array/findBy'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { tightListItemConfig } from '@lib/ui/list/tightListItemConfig'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { Text } from '@lib/ui/text'
import { getColor } from '@lib/ui/theme/getters'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { EmojiTextPrefix } from '@lib/ui/text/EmojiTextPrefix'
import { AddPrincipleIdea } from './AddPrincipleIdea'
import { GoalSection } from '../goals/GoalSection'
import { BookIcon } from '@lib/ui/icons/BookIcon'

const Content = styled(VStack)`
  ${verticalPadding(tightListItemConfig.verticalPadding)};
  gap: 8px;
`

const Header = styled(HStack)`
  gap: 8px;
  width: 100%;
  justify-content: space-between;
`

const Tag = styled(HStack)`
  align-items: center;
  padding: 4px 8px;
  border: 1px solid ${getColor('mistExtra')};
  ${borderRadius.s};
  font-size: 14px;
  align-self: start;
  color: ${getColor('contrast')};
`

export const PrincipleIdeaItem = ({
  value,
}: ComponentWithValueProps<PrincipleIdea>) => {
  const { description, name, categoryId, source } = value

  const category = shouldBePresent(
    findBy(defaultPrincipleCategories, 'id', categoryId),
  )

  return (
    <Content>
      <Header>
        <HStack
          alignItems="center"
          fullWidth
          justifyContent="space-between"
          gap={8}
        >
          <HStack wrap="wrap" alignItems="center" gap={8}>
            <Text color="contrast" weight="500">
              {name}
            </Text>
            <Tag>
              <EmojiTextPrefix emoji={category.emoji} />
              {category.name.toLowerCase()}
            </Tag>
          </HStack>
          <AddPrincipleIdea value={value} />
        </HStack>
      </Header>
      <GoalSection icon={<BookIcon />}>
        <Text size={14} color="supporting">
          "{source.name}" by {source.author}
        </Text>
      </GoalSection>
      {description && (
        <Text size={14} color="regular" weight="500">
          {description}
        </Text>
      )}
    </Content>
  )
}
