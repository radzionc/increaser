import clipboardy from 'clipboardy'

const run = async () => {
  const prompt = [
    'Promote the launch on subreddits.',
    'Find the top 10 subreddits (including r/getdisciplined) where I can post about the Product Hunt Launch.',
    'Return the result as a markdown code snippet with each subreddit starting with "# {subreddit_name}}"',
    'Each post should include links to the Product Hunt launch.',
  ].join('\n')

  console.log(prompt)
  clipboardy.writeSync(prompt)
}

run()
