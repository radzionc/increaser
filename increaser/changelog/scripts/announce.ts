import clipboardy from 'clipboardy'
import { parseChangelog } from '../utils/parseChangelog'
import { readChangelogFile } from '../utils/changelogFile'
import { ProductUpdateSocial, productUpdateSocialName } from '../ProductUpdate'
import { toEntries } from '@lib/utils/record/toEntries'

const socialPrompt: Record<ProductUpdateSocial, string[]> = {
  telegram: [
    'A message for Increaser telegram channel.',
    `Include https://app.increaser.org url in the content.`,
  ],
  x: [
    'A post on X, 280 characters max. Do not use hashtags.',
    `Include https://increaser.org url in the content.`,
  ],
  reddit: [
    `Include Increaser's website url in the content.`,
    'Also provide a title for the post.',
    `Include https://increaser.org url in the content.`,
  ],
  indieHackers: [
    `Include Increaser's app url in the content.`,
    'Also provide a title for the post.',
    `Include https://increaser.org url in the content.`,
  ],
  linkedIn: [
    `Do not use markdown syntax, LinkedIn posts do not support markdown.`,
    `Include https://increaser.org url in the content.`,
  ],
  youtube: [
    'A video title and description.',
    `Do not use markdown syntax, YouTube title and description do not support markdown.`,
  ],
}

const announce = () => {
  const changelog = readChangelogFile()

  const changelogItems = parseChangelog(changelog)
  const { items } = changelogItems[0]

  const prompt = [
    [
      'You will write an announcement for new product updates.',
      'Use your judgment to make the announcement engaging and informative.',
      'Make each announcement feel native to the platform.',
      'Do not use words "user" or "users".',
      'Titles should represent an essence of the updates.',
      'Return the result as a markdown snippet with each platform starting with "# {platform_name}", but do not use markdown features in copies that don`t support markdown, .e.g. YouTube description should be plain text.',
    ].join(' '),

    ...toEntries(socialPrompt).map(({ key, value }) =>
      [`### ${productUpdateSocialName[key]}`, value].join('\n'),
    ),

    [
      'Updates are ordered by their priority: ',
      ...items.map((item, index) => `${index + 1}. ${item}`),
    ].join('\n'),
  ].join('\n\n')

  console.log(prompt)
  clipboardy.writeSync(prompt)
}

announce()
