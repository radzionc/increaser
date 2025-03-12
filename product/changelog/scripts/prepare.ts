import clipboardy from 'clipboardy'

import { readChangelogFile } from '../utils/changelogFile'
import { parseChangelog } from '../utils/parseChangelog'

const getPrompt = (items: string[]) => {
  if (items.length === 1) {
    return [
      'You will write an announcement for a new product update.',
      'It will be displayed in the "What\'s new" section of the app and website.',
      'Return it as a JavaScript object with the "name" and "description" string properties.',
      'Keep the copy short, but make sure the user will understand each update and its value.',
      'Description should be a plain text, emojis are allowed if you think it makes it more engaging.',
      'The name should capture the essence of the update.',
      'Return it as a JavaScript object with the "name" and "description" properties.',
      `Product update: ${items[0]}`,
    ].join('\n')
  }

  return [
    'You will write an announcement for new product updates.',
    'It will be displayed in the "What\'s new" section of the app and website.',
    'Return it as a JavaScript object with the "name" and "description" string properties and "items" property which is an array of objects with a "description" string property.',
    'Keep the copy short, but make sure the user will understand each update and its value.',
    'Updates are ordered by their priority.',
    'The name should capture the essence of the update and should not be generic.',
    'The description should summarize the updates.',
    'Each item should correspond to a product update.',
    'Product updates:',
    items.map((item) => `  - ${item}`).join('\n'),
  ].join('\n')
}

const productUpdate = () => {
  const changelog = readChangelogFile()

  const changelogItems = parseChangelog(changelog)
  const { items } = changelogItems[0]

  const prompt = getPrompt(items)

  console.log(prompt)
  clipboardy.writeSync(prompt)
}

productUpdate()
