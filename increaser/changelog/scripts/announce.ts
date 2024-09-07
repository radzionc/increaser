import clipboardy from 'clipboardy'
import { parseChangelog } from '../utils/parseChangelog'
import { readChangelogFile } from '../utils/readChangelogFile'

const announce = () => {
  const changelog = readChangelogFile()

  const changelogItems = parseChangelog(changelog)
  const { items } = changelogItems[0]

  const prompt = [
    'You will write an announcement for new product updates.',
    'I will post it on Telegram channel, X, LinkedIn, Indie Hackers, and Reddit.',
    'Every announcement should be a plain text as those platforms do not support markdown.',
    'You can use emojis, or make plain text lists to make the announcement more readable.',
    'Keep the copy short, but make sure the user will understand each update and its value.',
    'Make each announcement feel native to the platform.',
    'Titles should represent an essence of the updates.',
    'Announcement on X should be a tweet with 280 characters max. Do not use hashtags. Return as a markdown snippet.',
    `Announcement on Reddit should be a Reddit post. You can use markdown for Reddit. Return title and content separately as markdown snippets. Include Increaser's url (https://increaser.org) in the content.`,
    `Announcement on Indie Hackers should be an Indie Hackers post. Return title and content separately as markdown snippets. Include Increaser's url (https://increaser.org) in the content.`,
    `Announcement on LinkedIn should be a LinkedIn post. Do not use markdown syntax, e.g. no **bold**, LinkedIn posts do not support it. Return as a markdown snippet.  Include Increaser's url (https://increaser.org) in the content.`,
    'Announcement on Telegram should be a message. Return as a markdown snippet.',
    'Updates are ordered by their priority.',
    'Product updates:',
    items.map((item) => `  - ${item}`).join('\n'),
  ].join('\n')

  console.log(prompt)
  clipboardy.writeSync(prompt)
}

announce()
