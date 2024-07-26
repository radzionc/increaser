import { PrincipleIdea } from '@increaser/entities-utils/principle/principleIdeas'
import { Hoverable } from '@lib/ui/base/Hoverable'
import { ComponentWithValueProps } from '@lib/ui/props'
import styled from 'styled-components'
import { useCreateUserEntityMutation } from '../userEntity/api/useCreateUserEntityMutation'
import { useDeleteUserEntityMutation } from '../userEntity/api/useDeleteUserEntityMutation'
import { useAssertUserState } from '../user/UserStateContext'
import { defaultPrincipleCategories } from '@increaser/entities/PrincipleCategory'
import { findBy } from '@lib/utils/array/findBy'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { tightListItemConfig } from '@lib/ui/list/tightListItemConfig'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { Text } from '@lib/ui/text'
import { PrincipleName } from './PrincipleName'
import { PrincipleDescription } from './PrincipleDescription'
import { PrincipleHeader } from './PrincipleHeader'
import { PrefixedItemFrame } from '@lib/ui/list/PrefixedItemFrame'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { BookIcon } from '@lib/ui/icons/BookIcon'
import { getColor } from '@lib/ui/theme/getters'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { round } from '@lib/ui/css/round'
import { CheckIcon } from '@lib/ui/icons/CheckIcon'
import { PlusIcon } from '@lib/ui/icons/PlusIcon'

const Container = styled(Hoverable)`
  text-align: start;
  width: 100%;
`

const Content = styled(VStack)`
  ${verticalPadding(tightListItemConfig.verticalPadding)};
  gap: 4px;
`

const Source = styled(PrefixedItemFrame)`
  padding: 0;
  color: ${getColor('textShy')};
`

const Indicator = styled(HStack)`
  align-items: center;
  gap: 8px;
  height: ${toSizeUnit(tightListItemConfig.lineHeight)};
  ${horizontalPadding(12)};
  background: ${getColor('foreground')};
  ${round};
  font-size: 14px;
`

export const PrincipleIdeaItem = ({
  value: { id, description, name, categoryId, source },
}: ComponentWithValueProps<PrincipleIdea>) => {
  const { principles, principleCategories } = useAssertUserState()
  const { mutate: createPrinciple } = useCreateUserEntityMutation('principle')
  const { mutate: createPrincipleCategory } =
    useCreateUserEntityMutation('principleCategory')

  const { mutate: deletePrinciple } = useDeleteUserEntityMutation('principle')

  const isAdded = id in principles

  const category = shouldBePresent(
    findBy(defaultPrincipleCategories, 'id', categoryId),
  )

  return (
    <Container
      onClick={() => {
        if (isAdded) {
          deletePrinciple(id)
        } else {
          const principle = {
            id,
            name,
            description,
            categoryId,
            updatedAt: Date.now(),
          }
          if (!(categoryId in principleCategories)) {
            createPrincipleCategory(category, {
              onSuccess: () => {
                createPrinciple(principle)
              },
            })
          } else {
            createPrinciple(principle)
          }
        }
      }}
      verticalOffset={0}
    >
      <Content>
        <PrincipleHeader
          prefix={<Text color="contrast">{category.emoji}</Text>}
        >
          <HStack fullWidth justifyContent="space-between">
            <PrincipleName>{name}</PrincipleName>
            <Indicator>
              <IconWrapper>
                {isAdded ? <CheckIcon /> : <PlusIcon />}
              </IconWrapper>
              {isAdded ? 'Added' : 'Add'}
            </Indicator>
          </HStack>
        </PrincipleHeader>
        <Source
          prefix={
            <IconWrapper>
              <BookIcon />
            </IconWrapper>
          }
        >
          "{source.name}" by {source.author}
        </Source>
        {description && (
          <PrincipleDescription>{description}</PrincipleDescription>
        )}
      </Content>
    </Container>
  )
}
