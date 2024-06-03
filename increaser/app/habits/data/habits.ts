export const habitTags = [
  'health',
  'sleep',
  'productivity',
  'energy',
  'mind',
  'marriage',
] as const
export type HabitTag = (typeof habitTags)[number]

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
}

export type HabitId =
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
  },
  morningFast: {
    emoji: '🤤',
    name: 'No food before 11AM',
    tags: ['health', 'productivity'],
    description:
      'Push the first meal to a later time for a better morning focus and the health benefits of intermittent fasting.',
  },
  limitCoffee: {
    tags: ['sleep'],
    emoji: '☕️',
    name: 'No caffeine after 1AM',
    description:
      'Avoid caffeine within 8-10 hours of bedtime to fall asleep faster, and have better sleep quality. Dr. Matt Walker (sleep expert from UC Berkeley) might even say 12-14 hours.',
  },
  noAlcohol: {
    tags: ['sleep', 'health'],
    emoji: '🍷',
    name: 'No alcohol',
    description:
      'Drinking alcohol messes up your sleep, as do most sleep medications. The increased risk of certain cancers with alcohol (especially breast cancer) is striking. 1-2 drinks per week are probably OK for most adults, but the data say zero is better.',
  },
  noLateFood: {
    emoji: '😋',
    tags: ['health', 'sleep'],
    name: 'No food after 7PM',
    description:
      'Finishing eating a few hours before bedtime will improve the quality of sleep. To get health benefits from the classic intermittent fasting protocol of an 8-hour feeding window, combine the habit of pushing breakfast to 11 AM.',
  },
  earlySleep: {
    emoji: '😴',
    tags: ['sleep'],
    name: 'Go to bed at 10PM',
    description:
      'Wake up at the same time each day and go to sleep when you first start to feel sleepy. Pushing through the sleepy late evening feeling and going to sleep too late (for you) is one reason people wake at 3 am and can’t fall back asleep.',
  },
  meditation: {
    tags: ['mind'],
    emoji: '🧘‍♀️',
    name: 'Meditation or NSDR',
    description:
      'Meditation practices lead to long-term trait changes and neuroplasticity, including changing your default mood, reducing baseline anxiety/depression, increasing your ability to focus, enhancing relaxation, improving sleep, and increasing your overall happiness level.',
  },
  outdoors: {
    emoji: '🌳',
    tags: ['health', 'energy'],
    name: 'Spend 2 hours outdoors',
    description:
      'One of the best things you can do for your eyes, the habit prevents and offsets near-sightedness(myopia)',
  },
  supplements: {
    emoji: '💊',
    tags: ['health'],
    name: 'Take supplements',
    description: `It's hard to get everything your body needs from food only. To ensure you cover all the basic nutritional needs, take foundational supplements: vitamins and minerals, digestive enzymes, adaptogens, and probiotics/prebiotics.`,
  },
  exercise: {
    emoji: '🏋️‍♀️',
    tags: ['health', 'energy'],
    name: 'Exercise or stretching',
    description:
      'Physical exercise is a necessity for long-term both mental and physical health. Increasing flexibility can improve overall general health and reduce pain and inflammation.',
  },
  walk: {
    emoji: '🚶',
    tags: ['health'],
    name: 'Walk after dinner',
    description:
      'Taking a walk after dinner can speed up glucose clearing from the bloodstream and can be beneficial for weight loss, cardiovascular health, etc.',
  },
  learn: {
    tags: ['mind'],
    emoji: '📚',
    name: 'Learning session',
    description:
      'Instead of wasting time and energy consuming bite-sized content throughout the day, have an intentional learning time with books, audiobooks, or podcasts while taking notes in a notebook.',
  },
  prepare: {
    emoji: '📝',
    tags: ['productivity'],
    name: 'Prepare for tomorrow',
    description:
      'Make a plan for tomorrow to be more efficient and have less decision-making, clean the home to wake up to a good environment, and reflect in a journal to extract lessons from today.',
  },
  content: {
    emoji: '🥗',
    name: 'Eat without content consumption',
    tags: ['health', 'mind'],
    description:
      'Listening to podcasts or scrolling through social media will reduce focus on the food and make you more likely to overeat.',
  },
  max: {
    emoji: '📺',
    tags: ['mind'],
    name: 'Max 1 hour of TV/games',
    description:
      'TV and games are time sinks replaceable with better activities. They also take up your mental space in your idle time from creative or productive thoughts.',
  },
  noEarlyCoffee: {
    emoji: '☕️',
    tags: ['energy'],
    name: 'No caffeine 90 min after waking up',
    description:
      'Push the first coffee intake off for 90 minutes to have more energy in the afternoon.',
  },
  compliment: {
    emoji: '❤️',
    tags: ['marriage'],
    name: 'Give a compliment',
    description:
      'The first love language is words of affirmation, which includes verbal compliments, words of appreciation, or encouraging words.',
  },
  review: {
    emoji: '💏',
    tags: ['marriage'],
    name: 'Review the day with your partner',
    description: `Reviewing the day with your partner strengthens relationships by building a deeper friendship and making other love languages more effective. It can be extended by engaging in shared activities and treating them like dates.`,
  },
  help: {
    emoji: '🧹',
    tags: ['marriage'],
    name: 'Help your partner',
    description: `Acts of service are a love language that involves doing things for your partner, such as cooking and cleaning. By being aware of the tasks your partner requests most often and helping with them, you can express your love through practical actions.`,
  },
  noWorkAfterDinner: {
    emoji: '🍽',
    tags: ['mind', 'marriage'],
    name: 'No work after dinner',
    description: `You will have a better time falling asleep after a good amount of chill time before bed. Knowing that you have a limit for work time will make you do the most important tasks first and procrastinate less, knowing that you have a specific time when the workday ends. With clear boundaries for work, you can spend more uninterrupted time with family and friends.`,
  },
  noElectronicsInBedroom: {
    emoji: '📵',
    tags: ['sleep', 'marriage', 'mind'],
    name: 'No electronics in bedroom',
    description:
      'By disconnecting from screens before sleep, you allow your mind to unwind and promote better sleep while creating a space for genuine connection, conversation, and intimacy with your spouse. This habit also encourages a healthier morning routine, enabling you to start your day with focus and intention rather than being consumed by digital distractions.',
  },
  noCriticism: {
    emoji: '🙅‍♀️',
    tags: ['marriage'],
    name: 'No negative criticism',
    description:
      'Daily, take a moment to think before speaking when you feel upset or frustrated. Ask yourself: "Is my comment about the behavior or the person?" Aim to express concerns about actions, not character. This simple check helps you avoid hurtful criticism and keeps communication positive and constructive.',
  },
  coldShower: {
    emoji: '❄️',
    tags: ['health', 'energy', 'mind'],
    name: 'Cold shower',
    description:
      'Taking a cold shower boosts your energy levels, improves circulation, and enhances mental clarity. It can also help reduce stress and improve mood, making it a powerful way to start your day.',
  },
} as const
