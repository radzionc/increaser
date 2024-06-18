import { Education } from '@increaser/entities/Education'
import { ReactNode } from 'react'
import { useAssertUserState } from '../user/UserStateContext'
import { useUpdateUserMutation } from '../user/mutations/useUpdateUserMutation'
import { ComponentWithValueProps } from '@lib/ui/props'
import { EducationBlock } from '@lib/ui/info/EducationBlock'

const content: Record<Education, ReactNode> = {
  vision: (
    <>
      Envision your ideal life by describing specific attributes that define
      your perfect world, such as a happy marriage, a fit body, or financial
      independence. Ensure each attribute clearly resonates with your long-term
      aspirations and reflects what truly matters to you. Keep your vision clear
      and concise, making it easy to visualize and strive towards daily.
    </>
  ),
  goals: (
    <>
      Set practical and achievable goals that will bring you closer to your
      perfect life vision. Break down each goal into manageable steps, and focus
      on consistent progress rather than perfection. Remember to track your
      progress and adjust your goals as needed to stay aligned with your
      evolving vision.
    </>
  ),
  todayTasks: (
    <>
      To pick the right tasks for today, focus on what will have the biggest
      impact on your goals. Prioritize tasks that align with your long-term
      objectives and values. Remember, it's better to accomplish a few important
      tasks well than to be busy with many minor ones. Stay disciplined and make
      choices based on what truly matters.
    </>
  ),
  recurringTasks: (
    <>
      Recurring tasks automate repetitive actions, ensuring essential tasks are
      never missed and helping you stay on track with your goals. By setting
      tasks to recur on a schedule, you save time and mental effort, allowing
      you to focus on more critical work. This feature fosters good habits and
      boosts productivity, making it easier to achieve your goals.
    </>
  ),
}

export const ProductEducationBlock = ({
  value,
}: ComponentWithValueProps<Education>) => {
  const { completedEducation } = useAssertUserState()

  const { mutate } = useUpdateUserMutation()

  if (completedEducation.includes(value)) {
    return null
  }

  return (
    <EducationBlock
      onSubmit={() =>
        mutate({ completedEducation: [...completedEducation, value] })
      }
    >
      {content[value]}
    </EducationBlock>
  )
}
