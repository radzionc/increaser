const habitTags = [
  'health',
  'sleep',
  'productivity',
  'energy',
  'mind',
  'marriage',
] as const
type HabitTag = (typeof habitTags)[number]

export const habitTagColors = {
  health: 4,
  sleep: 9,
  productivity: 2,
  energy: 6,
  mind: 7,
  marriage: 11,
}

export interface HabitInfo {
  emoji: string
  name: string
  description: string
  tags: HabitTag[]
  plan: string
}

type HabitId =
  | 'sunlight'
  | 'morningFast'
  | 'limitCoffee'
  | 'noAlcohol'
  | 'noLateFood'
  | 'earlySleep'
  | 'meditation'
  | 'outdoors'
  | 'supplements'
  | 'exercise'
  | 'walk'
  | 'learn'
  | 'prepare'
  | 'content'
  | 'max'
  | 'noEarlyCoffee'
  | 'compliment'
  | 'review'
  | 'help'
  | 'noWorkAfterDinner'
  | 'noElectronicsInBedroom'
  | 'noCriticism'
  | 'coldShower'

export const habitRecord: Record<HabitId, HabitInfo> = {
  sunlight: {
    emoji: '☀️',
    tags: ['sleep', 'energy'],
    name: 'View sunlight after waking up',
    description:
      'View sunlight by going outside within 30-60 minutes of waking. Do that again in the late afternoon, prior to sunset. If you wake up before the sun is out and you want to be awake, turn on artificial lights and then go outside once the sun rises.',
    plan: 'Go outside first thing after waking up, or turn on lights if it’s still dark.',
  },
  morningFast: {
    emoji: '🤤',
    name: 'No food before 11AM',
    tags: ['health', 'productivity'],
    description:
      'Push the first meal to a later time for a better morning focus and the health benefits of intermittent fasting.',
    plan: 'Set a reminder to have the first meal at 11AM to stick to fasting.',
  },
  limitCoffee: {
    tags: ['sleep'],
    emoji: '☕️',
    name: 'No caffeine after 1PM',
    description:
      'Avoid caffeine within 8-10 hours of bedtime to fall asleep faster, and have better sleep quality. Dr. Matt Walker (sleep expert from UC Berkeley) might even say 12-14 hours.',
    plan: 'Have coffee only in the morning and switch to decaf or water after 1PM.',
  },
  noAlcohol: {
    tags: ['sleep', 'health'],
    emoji: '🍷',
    name: 'No alcohol',
    description:
      'Drinking alcohol messes up your sleep, as do most sleep medications. The increased risk of certain cancers with alcohol (especially breast cancer) is striking. 1-2 drinks per week are probably OK for most adults, but the data say zero is better.',
    plan: 'Opt for non-alcoholic drinks in social settings and track no-drink days.',
  },
  noLateFood: {
    emoji: '😋',
    tags: ['health', 'sleep'],
    name: 'No food after 7PM',
    description:
      'Finishing eating a few hours before bedtime will improve the quality of sleep. To get health benefits from the classic intermittent fasting protocol of an 8-hour feeding window, combine the habit of pushing breakfast to 11 AM.',
    plan: 'Set a reminder to have dinner by 7PM and avoid late snacks.',
  },
  earlySleep: {
    emoji: '😴',
    tags: ['sleep'],
    name: 'Go to bed at 10PM',
    description:
      'Wake up at the same time each day and go to sleep when you first start to feel sleepy. Pushing through the sleepy late evening feeling and going to sleep too late (for you) is one reason people wake at 3 am and can’t fall back asleep.',
    plan: 'Set a bedtime reminder at 9:30PM to start winding down.',
  },
  meditation: {
    tags: ['mind'],
    emoji: '🧘‍♀️',
    name: 'Meditation or NSDR',
    description:
      'Meditation practices lead to long-term trait changes and neuroplasticity, including changing your default mood, reducing baseline anxiety/depression, increasing your ability to focus, enhancing relaxation, improving sleep, and increasing your overall happiness level.',
    plan: 'Meditate for 5 minutes in the morning and gradually increase duration.',
  },
  outdoors: {
    emoji: '🌳',
    tags: ['health', 'energy'],
    name: 'Spend 2 hours outdoors',
    description:
      'One of the best things you can do for your eyes, the habit prevents and offsets near-sightedness(myopia).',
    plan: 'Schedule outdoor time in the morning or after lunch to ensure consistency.',
  },
  supplements: {
    emoji: '💊',
    tags: ['health'],
    name: 'Take supplements',
    description:
      "It's hard to get everything your body needs from food only. To ensure you cover all the basic nutritional needs, take foundational supplements: vitamins and minerals, digestive enzymes, adaptogens, and probiotics/prebiotics.",
    plan: 'Set a specific time each day, such as morning, to take your supplements.',
  },
  exercise: {
    emoji: '🏋️‍♀️',
    tags: ['health', 'energy'],
    name: 'Exercise or stretching',
    description:
      'Physical exercise is a necessity for long-term both mental and physical health. Increasing flexibility can improve overall general health and reduce pain and inflammation.',
    plan: 'Schedule a daily workout or stretching session, even if it’s just 15 minutes.',
  },
  walk: {
    emoji: '🚶',
    tags: ['health'],
    name: 'Walk after dinner',
    description:
      'Taking a walk after dinner can speed up glucose clearing from the bloodstream and can be beneficial for weight loss, cardiovascular health, etc.',
    plan: 'Take a short walk after dinner each evening, ideally for 10-20 minutes.',
  },
  learn: {
    tags: ['mind'],
    emoji: '📚',
    name: 'Learning session',
    description:
      'Instead of wasting time and energy consuming bite-sized content throughout the day, have an intentional learning time with books, audiobooks, or podcasts while taking notes in a notebook.',
    plan: 'Block out 30 minutes each day for focused learning without distractions.',
  },
  prepare: {
    emoji: '📝',
    tags: ['productivity'],
    name: 'Prepare for tomorrow',
    description:
      'Make a plan for tomorrow to be more efficient and have less decision-making, clean the home to wake up to a good environment, and reflect in a journal to extract lessons from today.',
    plan: 'Before bed, take 5 minutes to plan tasks for the next day and tidy up.',
  },
  content: {
    emoji: '🥗',
    name: 'Eat without content consumption',
    tags: ['health', 'mind'],
    description:
      'Listening to podcasts or scrolling through social media will reduce focus on the food and make you more likely to overeat.',
    plan: 'Commit to meals without devices, focusing on the food and the eating experience.',
  },
  max: {
    emoji: '📺',
    tags: ['mind'],
    name: 'Max 1 hour of TV/games',
    description:
      'TV and games are time sinks replaceable with better activities. They also take up your mental space in your idle time from creative or productive thoughts.',
    plan: 'Limit screen time by setting a daily alarm after one hour of entertainment.',
  },
  noEarlyCoffee: {
    emoji: '☕️',
    tags: ['energy'],
    name: 'No caffeine 90 min after waking up',
    description:
      'Push the first coffee intake off for 90 minutes to have more energy in the afternoon.',
    plan: 'Set a timer after waking to delay the first coffee of the day by 90 minutes.',
  },
  compliment: {
    emoji: '❤️',
    tags: ['marriage'],
    name: 'Give a compliment',
    description:
      'The first love language is words of affirmation, which includes verbal compliments, words of appreciation, or encouraging words.',
    plan: 'Aim to give at least one heartfelt compliment to your partner daily.',
  },
  review: {
    emoji: '💏',
    tags: ['marriage'],
    name: 'Review the day with your partner',
    description:
      'Reviewing the day with your partner strengthens relationships by building a deeper friendship and making other love languages more effective.',
    plan: 'Spend a few minutes each evening to share highlights of your day together.',
  },
  help: {
    emoji: '🧹',
    tags: ['marriage'],
    name: 'Help your partner',
    description:
      'Acts of service are a love language that involves doing things for your partner, such as cooking and cleaning.',
    plan: 'Identify a daily task to do for your partner, such as helping with chores.',
  },
  noWorkAfterDinner: {
    emoji: '🍽',
    tags: ['mind', 'marriage'],
    name: 'No work after dinner',
    description:
      'Having clear boundaries for work allows for a balanced life and more family time.',
    plan: 'Set a hard stop on work after dinner and focus on relaxation or family time.',
  },
  noElectronicsInBedroom: {
    emoji: '📵',
    tags: ['sleep', 'marriage', 'mind'],
    name: 'No electronics in bedroom',
    description:
      'Disconnecting from screens before sleep promotes better rest and deeper connection with your partner.',
    plan: 'Charge your phone outside the bedroom to avoid late-night screen time.',
  },
  noCriticism: {
    emoji: '🙅‍♀️',
    tags: ['marriage'],
    name: 'No negative criticism',
    description:
      'Take a moment before speaking when upset to avoid criticism and keep communication constructive.',
    plan: 'Pause, breathe, and consider positive language before addressing concerns.',
  },
  coldShower: {
    emoji: '❄️',
    tags: ['health', 'energy', 'mind'],
    name: 'Cold shower',
    description:
      'Cold showers boost energy, improve circulation, and reduce stress.',
    plan: 'Take a 30-second cold shower at the end of your regular shower each morning.',
  },
}
