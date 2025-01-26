import { PageTitle } from '@lib/ui/text/PageTitle'
import { useTodaySets } from '../../sets/hooks/useTodaySets'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { RhythmicRerender } from '@lib/ui/base/RhythmicRerender'
import { Text } from '@lib/ui/text'
import { getLastItem } from '@lib/utils/array/getLastItem'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { convertDuration } from '@lib/utils/time/convertDuration'

export const HomePageTitle = () => {
  const todaySets = useTodaySets()

  return (
    <PageTitle>
      {isEmpty(todaySets) ? (
        'Start a focus session'
      ) : (
        <RhythmicRerender
          render={(time) => {
            const duration = time - getLastItem(todaySets).end
            const value = formatDuration(duration, 'ms', {
              kind: 'long',
            })

            if (duration < convertDuration(1, 'min', 'ms')) {
              return 'Last session ended just now'
            }

            return (
              <Text centerVertically={{ gap: 8 }}>
                <span>Time since last session:</span>
                <Text as="span" color="primary">
                  {value}
                </Text>
              </Text>
            )
          }}
        />
      )}
    </PageTitle>
  )
}
