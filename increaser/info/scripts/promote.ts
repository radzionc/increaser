import clipboardy from 'clipboardy'
import fs from 'fs'

import { toEntries } from '@lib/utils/record/toEntries'
import {
  ProductUpdateSocial,
  productUpdateSocialName,
} from '@increaser/changelog/ProductUpdate'
import path from 'path'
import { InfoYouTubeVideo, infoYouTubeVideos } from '../infoYouTubeVideos'

const socialPrompt: Record<ProductUpdateSocial, string[]> = {
  telegram: ['A message for Increaser telegram channel.'],
  x: ['A post on X, 280 characters max. Do not use hashtags.'],
  reddit: ['A post on Reddit and a title for the post.'],
  indieHackers: ['A post on IndieHackers and a title for the post.'],
  linkedIn: [
    `Do not use markdown syntax, e.g. no **bold** or bullet lists, LinkedIn posts do not support markdown.`,
  ],
  youtube: [
    'A video title and description.',
    'The title should work for people who don`t know about the product.',
    'Include Increaser website url in the description.',
  ],
}

const announce = (id: InfoYouTubeVideo) => {
  const script = fs.readFileSync(
    path.resolve(__dirname, `../youtube/${id}.md`),
    'utf-8',
  )

  const youTubeVideoUrl = infoYouTubeVideos[id]

  if (!youTubeVideoUrl) {
    console.error('YouTube video URL not found')
    return
  }

  const prompt = [
    [
      'You will will write to promote a new YouTube video posted on Increaser YouTube channel.',
      'Use your judgment to make the text engaging and informative.',
      'Make each text feel native to the platform.',
      `Include YouTube video URL ${youTubeVideoUrl} in the content.`,
      'Return the result as a markdown code snippet with each platform starting with "# {platform_name}", but do not use markdown features in copies that don`t support markdown, .e.g. YouTube description should be plain text.',
    ].join(' '),

    ...toEntries(socialPrompt).map(({ key, value }) =>
      [`### ${productUpdateSocialName[key]}`, value].join('\n'),
    ),

    `YouTube video script: ${script}`,
  ].join('\n\n')

  console.log(prompt)
  clipboardy.writeSync(prompt)
}

announce(process.argv[2] as InfoYouTubeVideo)
