import clipboardy from 'clipboardy'

import { readChangelogFile } from '../utils/changelogFile'
import { parseChangelog } from '../utils/parseChangelog'

const youtube = () => {
  const changelog = readChangelogFile()

  const changelogItems = parseChangelog(changelog)
  const { items } = changelogItems[0]

  const prompt = [
    'You will write a script for a YouTube video about new product updates.',
    'It should be a short video, just a few minutes long, enough to make the user understand the value of the updates.',
    'It should not be promotional, but sound human, as it is just a founder talking about what is new in the product.',
    'The script should be plain text, free from any formatting, and be ready to put in a teleprompter.',
    'The ending should be as short as possible, and should have a call to action to try it and give feedback.',
    'Start with "Hey everyone, Radzion here." and launch into the updates as fast as possible.',
    'Return the script as a markdown snippet.',
    'Updates are ordered by their priority:',
    items.map((item) => `  - ${item}`).join('\n'),
  ].join('\n')

  console.log(prompt)
  clipboardy.writeSync(prompt)
}

youtube()
