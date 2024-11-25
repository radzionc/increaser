import clipboardy from 'clipboardy'
import { productHuntLaunchUrl } from '../config'
import fs from 'fs'
import path from 'path'

const run = async () => {
  const youTubeScript = await fs.readFileSync(
    path.resolve(__dirname, '../../new-year/script.md'),
    'utf-8',
  )

  const prompt = [
    'Today we are launching Increaser on Product Hunt.',
    'You will help me promoting the launch.',
    `Product Hunt launch url: ${productHuntLaunchUrl}`,
    `It will be a special edition posted at the end of November about reaching new year's goals.`,
    `For more context, below is the script for the YouTube video that will be included in the Product Hunt launch.`,
    `Reply "Yes" if you understand the product and are ready to help.`,
    youTubeScript,
  ].join('\n')

  console.log(prompt)
  clipboardy.writeSync(prompt)
}

run()
