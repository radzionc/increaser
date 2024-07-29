import { PageTitle } from '@increaser/app/ui/PageTitle'
import { useCurrentFocus } from '@increaser/ui/focus/CurrentFocusProvider'
import { RhytmicRerender } from '@lib/ui/base/RhytmicRerender'
import { PageMetaTags } from '@lib/next-ui/metadata/PageMetaTags'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { TitleProjectSelector } from './TitleProjectSelector'
import { TitleFocusDurationSelector } from './TitleFocusDurationSelector'

export const FocusTitle = () => {
  const { intervals } = useCurrentFocus()

  const { start } = intervals[0]

  return (
    <>
      <RhytmicRerender
        render={() => {
          const duration = Date.now() - start
          const title = `${formatDuration(duration, 'ms', {
            kind: 'digitalClock',
            minUnit: 's',
            maxUnit: 'h',
          })}`
          return <PageMetaTags title={title} />
        }}
      />
      <PageTitle
        title={
          <>
            <TitleProjectSelector /> <TitleFocusDurationSelector /> session
          </>
        }
      />
    </>
  )
}
