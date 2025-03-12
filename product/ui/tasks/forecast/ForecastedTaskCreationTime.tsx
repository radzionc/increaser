import { borderRadius } from '@lib/ui/css/borderRadius'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { ClockIcon } from '@lib/ui/icons/ClockIcon'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { text } from '@lib/ui/text'
import { getColor } from '@lib/ui/theme/getters'
import { Tooltip } from '@lib/ui/tooltips/Tooltip'
import { formatTaskDeadline } from '@product/entities-utils/task/formatTaskDeadline'
import { format } from 'date-fns'
import styled from 'styled-components'

import { useCurrentForecastedTask } from './state/currentForecastedTask'

const Container = styled.div`
  ${horizontalPadding(8)};
  ${borderRadius.s};

  background: ${getColor('foreground')};

  ${text({
    centerVertically: true,
    size: 12,
    height: 's',
    weight: 600,
    color: 'supporting',
  })};
  gap: 6px;

  svg {
    color: ${({ theme }) =>
      theme.colors.foreground.getVariant({ l: () => 48 }).toCssValue()};
    font-size: 14px;
  }

  flex-shrink: 0;
`

export const ForecastedTaskCreationTime = () => {
  const { willBeCreatedAt } = useCurrentForecastedTask()

  return (
    <Tooltip
      renderOpener={(props) => (
        <Container {...props}>
          <IconWrapper>
            <ClockIcon />
          </IconWrapper>
          <span>
            {formatTaskDeadline({
              deadlineAt: willBeCreatedAt,
              now: Date.now(),
            })}
          </span>
        </Container>
      )}
      content={`This task will be created automatically on ${format(
        willBeCreatedAt,
        'd MMM',
      )}`}
    />
  )
}
