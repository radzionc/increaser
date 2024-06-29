import { ProjectFields } from './ProjectFields'
import { randomlyPickOption } from '@lib/utils/array/randomlyPickOption'
import { range } from '@lib/utils/array/range'
import { labelColorsCount } from '@lib/ui/colors/generateLabelColorGetter'
import { Project } from '@increaser/entities/Project'
import { defaultEmojis } from '@lib/utils/entities/EntityWithEmoji'

type GetProjectDefaultFieldsInput = {
  projects: Project[]
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
