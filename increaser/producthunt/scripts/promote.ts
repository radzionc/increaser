import clipboardy from 'clipboardy'

import { toEntries } from '@lib/utils/record/toEntries'

const socialPrompt = {
  Telegram: ['A message for Increaser telegram channel.'],
  X: [
    'A post on X, 280 characters max. Do not use hashtags. It will be posted from the founder account.',
  ],
  Reddit: ['A post on Reddit and a title for the post.'],
  ['Indie Hackers']: ['A post on IndieHackers and a title for the post.'],
  LinkedIn: [
    `Do not use markdown syntax, e.g. no **bold** or bullet lists, LinkedIn posts do not support markdown. It will be posted from the founder account`,
  ],
  'Hacker News': ['A post on Hacker News.'],
}

const run = () => {
  const prompt = [
    [
      'You will will write to promote a Product Hunt launch on social media.',
      'Make each text feel native to the platform.',
      `Include Product Hunt launch url in the content.`,
      'Return the result as a markdown code snippet with each platform starting with "# {platform_name}", but do not use markdown features in copies that don`t support markdown, .e.g. YouTube description should be plain text.',
    ].join(' '),

    ...toEntries(socialPrompt).map(({ key, value }) =>
      [`### ${key}`, value].join('\n'),
    ),
  ].join('\n\n')

  console.log(prompt)
  clipboardy.writeSync(prompt)
}

run()
