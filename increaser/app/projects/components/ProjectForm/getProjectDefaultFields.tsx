import {
  EnhancedProject,
  defaultEmojis,
} from '@increaser/ui/projects/EnhancedProject'
import { ProjectFields } from './ProjectFields'
import { randomlyPickOption } from '@lib/utils/array/randomlyPickOption'
import { range } from '@lib/utils/array/range'
import { labelColorsCount } from '@lib/ui/colors/generateLabelColorGetter'

type GetProjectDefaultFieldsInput = {
  projects: EnhancedProject[]
}

export const getProjectDefaultFields = ({
  projects,
}: GetProjectDefaultFieldsInput): ProjectFields => ({
  name: '',
  emoji: randomlyPickOption({
    options: defaultEmojis,
    used: projects.map((project) => project.emoji),
  }),
  color: randomlyPickOption({
    options: range(labelColorsCount),
    used: projects.map((project) => project.color),
  }),
})
