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
}

export const ProductEducationBlock = ({
  value,
}: ComponentWithValueProps<Education>) => {
  const { completedEducation } = useAssertUserState()

  const { mutate } = useUpdateUserMutation()

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
