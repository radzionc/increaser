import styled from 'styled-components'
import { useCurrentForecastedTask } from './state/currentForecastedTask'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { getColor } from '@lib/ui/theme/getters'
import { text } from '@lib/ui/text'
import { ClockIcon } from '@lib/ui/icons/ClockIcon'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { format } from 'date-fns'
import { Tooltip } from '@lib/ui/tooltips/Tooltip'
import { formatTaskDeadline } from '@increaser/entities-utils/task/formatTaskDeadline'

const Container = styled.div`
  ${horizontalPadding(8)};
  ${borderRadius.s};

  background: ${getColor('foreground')};

  ${text({
    centerVertically: true,
    size: 12,
    height: 'small',
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
