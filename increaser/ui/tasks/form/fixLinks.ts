import { TaskLink } from '@increaser/entities/Task'
import { attempt } from '@lib/utils/attempt'
import { extractRootDomain } from '@lib/utils/url/extractRootDomain'
import { validateUrl } from '@lib/utils/validation/validateUrl'

export const fixLinks = (links: TaskLink[]): TaskLink[] => {
  const result: TaskLink[] = []

  links.forEach(({ url, name }) => {
    if (validateUrl(url)) return

    result.push({
      url,
      name: name || attempt(() => extractRootDomain(url), url),
    })
  })

  return result
}
