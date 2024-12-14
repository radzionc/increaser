import { HStack, VStack } from '@lib/ui/css/stack'
import { Text } from '@lib/ui/text'
import { LabeledValue } from '@lib/ui/text/LabeledValue'
import { format } from 'date-fns'
import { ScoreboardDisplayName } from '@increaser/ui/scoreboard/ScoreboardDisplayName'
import { VoteForFeature } from './VoteForFeature'
import { useCurrentProductFeature } from './CurrentProductFeatureProvider'
import { MatchUserProfileQuery } from '../../community/components/MatchUserProfileQuery'

export const ProductFeatureDetails = () => {
  const { createdAt, proposedBy, description } = useCurrentProductFeature()

  return (
    <VStack gap={18}>
      <HStack fullWidth alignItems="center" justifyContent="space-between">
        <VStack style={{ fontSize: 14 }} gap={8}>
          <LabeledValue name="Proposed at">
            {format(createdAt, 'dd MMM yyyy')}
          </LabeledValue>
          <LabeledValue name="Proposed by">
            {proposedBy ? (
              <MatchUserProfileQuery
                id={proposedBy}
                success={(profile) => {
                  return (
                    <ScoreboardDisplayName
                      name={profile?.name || 'Anonymous'}
                      country={profile?.country ?? undefined}
                    />
                  )
                }}
              />
            ) : (
              <ScoreboardDisplayName name="Unknown" />
            )}
          </LabeledValue>
        </VStack>
        <VoteForFeature />
      </HStack>
      {description && <Text height="l">{description}</Text>}
    </VStack>
  )
}
