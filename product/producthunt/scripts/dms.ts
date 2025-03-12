import clipboardy from 'clipboardy'

const run = async () => {
  const prompt = [
    'I will be sending DMs to people in my network asking them for an upvote.',
    'Write 3 templates for the DMs. One with a template for a name, another with a template without a name where I do not know the person, and a third one in Russian for my Russian-speaking network.',
    'I will be sending these DMs on social media platforms and messaging apps, so keep them short and casual.',
    'Return the result as a markdown code snippet with each template staring with # {template_name}',
  ].join('\n')

  console.log(prompt)
  clipboardy.writeSync(prompt)
}

run()
