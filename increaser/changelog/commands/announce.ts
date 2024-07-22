import { productUpdates, lastAnnouncementWasAt } from '../productUpdates'
import { pick } from '@lib/utils/record/pick'
import clipboardy from 'clipboardy'

const announce = () => {
  const newUpdates = productUpdates.filter(({ releasedAt }) =>
    lastAnnouncementWasAt ? releasedAt > lastAnnouncementWasAt : true,
  )

  const prompt = [
    'Every week I announce new features and improvement that have been added to the app.',
    'I do it on Telegram, X, and LinkedIn.',
    'Every update has a corresponding video clip that showcases the new feature (without sound).',
    'On X, it should be a thread if there are more than one update.',
    'On Telegram, it should be a similar format to X, but with a separate message for each update, as Telegram does not support threads.',
    'On LinkedIn, it should be a post which will highlight the most important update, and since LinkedIn does not support threads or multiple videos in a single post, other features should be added as comments.',
    'Return the each message/comment/post in a separate markdown snippet. Use plain text without bullet points or numbered lists as those platforms do not support makdown syntax.',
    'Below is the list of updates that need to be announced: ',
    ...newUpdates.map((update) =>
      JSON.stringify(pick(update, ['name', 'description'])),
    ),
  ].join('\n')

  console.log(prompt)
  clipboardy.writeSync(prompt)
}

announce()
