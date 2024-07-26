import { Principle } from '@increaser/entities/Principle'
import {
  workPrincipleCategory,
  marriagePrincipleCategory,
  healthPrincipleCategory,
  financePrincipleCategory,
  mindsetPrincipleCategory,
} from '@increaser/entities/PrincipleCategory'

export const principleSourceTypes = ['book']
export type PrincipleSourceType = (typeof principleSourceTypes)[number]
export type PrincipleSource = {
  type: PrincipleSourceType
  name: string
  author: string
}

export type PrincipleIdea = Omit<Principle, 'updatedAt'> & {
  source: PrincipleSource
}

export const workIdeas: PrincipleIdea[] = [
  {
    id: 'highImpactTasks',
    name: 'Focus on high-impact tasks',
    description:
      'Prioritize tasks that have the highest impact on your goals and overall productivity. Use the 80/20 rule to identify and focus on these tasks.',
    source: {
      type: 'book',
      name: 'The 80/20 Principle: The Secret to Achieving More with Less',
      author: 'Richard Koch',
    },
  },
  {
    id: 'clearGoals',
    name: 'Set clear goals',
    description:
      'Define clear, achievable goals to provide direction and motivation. Break down larger goals into smaller, manageable tasks.',
    source: {
      type: 'book',
      name: 'The 4 Disciplines of Execution: Achieving Your Wildly Important Goals',
      author: 'Chris McChesney, Sean Covey, Jim Huling',
    },
  },
  {
    id: 'continuousImprovement',
    name: 'Commit to continuous improvement',
    description:
      'Always seek to improve your skills and processes. Small, incremental improvements can lead to significant gains over time.',
    source: {
      type: 'book',
      name: 'Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones',
      author: 'James Clear',
    },
  },
  {
    id: 'workLifeBalance',
    name: 'Maintain work-life balance',
    description:
      'Ensure a healthy balance between work and personal life to avoid burnout and maintain long-term productivity and well-being.',
    source: {
      type: 'book',
      name: 'The One Thing',
      author: 'Gary Keller and Jay Papasan',
    },
  },
  {
    id: 'timeManagement',
    name: 'Practice time management',
    description:
      'Use techniques such as time blocking, the Pomodoro Technique, and prioritization to manage your time effectively and enhance productivity.',
    source: {
      type: 'book',
      name: 'Getting Things Done: The Art of Stress-Free Productivity',
      author: 'David Allen',
    },
  },
  {
    id: 'growthMindset',
    name: 'Cultivate a growth mindset',
    description:
      'Adopt a growth mindset by viewing challenges as opportunities for growth. Embrace failures as learning experiences.',
    source: {
      type: 'book',
      name: 'Mindset: The New Psychology of Success',
      author: 'Carol S. Dweck',
    },
  },
  {
    id: 'delegateCollaborate',
    name: 'Delegate and collaborate',
    description:
      'Delegate tasks that others can do and focus on what you do best. Collaborate with others to leverage their strengths and achieve better results.',
    source: {
      type: 'book',
      name: 'The 4-Hour Workweek',
      author: 'Tim Ferriss',
    },
  },
  {
    id: 'limitDistractions',
    name: 'Limit distractions',
    description:
      'Create a work environment that minimizes distractions. Use tools and techniques to stay focused, such as turning off notifications and setting boundaries.',
    source: {
      type: 'book',
      name: 'Deep Work: Rules for Focused Success in a Distracted World',
      author: 'Cal Newport',
    },
  },
  {
    id: 'reflectAdjust',
    name: 'Regularly reflect and adjust',
    description:
      'Regularly reflect on your progress and adjust your strategies as needed. Continuous improvement is key to long-term success.',
    source: {
      type: 'book',
      name: 'The Lean Startup',
      author: 'Eric Ries',
    },
  },
  {
    id: 'healthCare',
    name: 'Take care of your health',
    description:
      'Your physical and mental health directly impact your productivity. Ensure you get enough sleep, exercise regularly, and maintain a healthy diet.',
    source: {
      type: 'book',
      name: 'Eat Move Sleep: How Small Choices Lead to Big Changes',
      author: 'Tom Rath',
    },
  },
].map((idea) => ({ ...idea, categoryId: workPrincipleCategory.id }))

export const marriageIdeas: PrincipleIdea[] = [
  {
    id: 'activeListening',
    name: 'Practice active listening',
    description:
      'Fully engage in conversations by actively listening, showing empathy, and avoiding interruptions. This fosters understanding and strengthens the marital bond.',
    source: {
      type: 'book',
      name: 'The 7 Habits of Highly Effective People',
      author: 'Stephen R. Covey',
    },
  },
  {
    id: 'expressGratitude',
    name: 'Express gratitude regularly',
    description:
      'Regularly expressing gratitude helps to build a positive and appreciative atmosphere in your marriage.',
    source: {
      type: 'book',
      name: 'The Gratitude Diaries',
      author: 'Janice Kaplan',
    },
  },
  {
    id: 'effectiveCommunication',
    name: 'Communicate effectively',
    description:
      'Clear and open communication is crucial for resolving conflicts and building trust in marriage. Practice honesty and clarity in your interactions.',
    source: {
      type: 'book',
      name: 'Crucial Conversations: Tools for Talking When Stakes Are High',
      author: 'Kerry Patterson, Joseph Grenny, Ron McMillan, and Al Switzler',
    },
    categoryId: 'marriage',
  },
  {
    id: 'qualityTime',
    name: 'Spend quality time together',
    description:
      'Prioritize spending quality time with your spouse to strengthen your connection and create lasting memories.',
    source: {
      type: 'book',
      name: 'The 5 Love Languages: The Secret to Love that Lasts',
      author: 'Gary Chapman',
    },
  },
  {
    id: 'showEmpathy',
    name: 'Show empathy and understanding',
    description:
      'Empathy involves understanding and sharing the feelings of your spouse. Practicing empathy can enhance your marriage by making your partner feel valued and understood.',
    source: {
      type: 'book',
      name: 'Empathy: Why It Matters, and How to Get It',
      author: 'Roman Krznaric',
    },
  },
  {
    id: 'buildTrust',
    name: 'Build and maintain trust',
    description:
      'Trust is the foundation of any strong marriage. Build trust through consistency, honesty, and reliability in your actions and words.',
    source: {
      type: 'book',
      name: 'The Speed of Trust: The One Thing that Changes Everything',
      author: 'Stephen M.R. Covey',
    },
  },
  {
    id: 'resolveConflicts',
    name: 'Resolve conflicts peacefully',
    description:
      'Approach conflicts with a calm and open mindset, seeking to understand your spouse’s perspective and finding mutually beneficial solutions.',
    source: {
      type: 'book',
      name: 'Nonviolent Communication: A Language of Life',
      author: 'Marshall B. Rosenberg',
    },
  },
  {
    id: 'supportNetwork',
    name: 'Create a supportive environment',
    description:
      'Build a supportive and positive marital environment that provides encouragement, advice, and assistance when needed.',
    source: {
      type: 'book',
      name: 'How to Win Friends and Influence People',
      author: 'Dale Carnegie',
    },
  },
  {
    id: 'manageBoundaries',
    name: 'Establish and respect boundaries',
    description:
      'Healthy marriages require clear boundaries. Communicate your limits and respect the boundaries set by your spouse to maintain mutual respect.',
    source: {
      type: 'book',
      name: 'Boundaries: When to Say Yes, How to Say No to Take Control of Your Life',
      author: 'Henry Cloud and John Townsend',
    },
  },
  {
    id: 'sharedGoals',
    name: 'Set and pursue shared goals',
    description:
      'Identify and work towards shared goals with your spouse to build a sense of partnership and common purpose.',
    source: {
      type: 'book',
      name: 'The Seven Principles for Making Marriage Work',
      author: 'John M. Gottman',
    },
  },
].map((idea) => ({ ...idea, categoryId: marriagePrincipleCategory.id }))

export const healthIdeas: PrincipleIdea[] = [
  {
    id: 'regularExercise',
    name: 'Exercise regularly',
    description:
      'Incorporate regular physical activity into your routine to maintain physical health, boost mood, and improve overall well-being.',
    source: {
      type: 'book',
      name: 'Spark: The Revolutionary New Science of Exercise and the Brain',
      author: 'John J. Ratey',
    },
  },
  {
    id: 'balancedDiet',
    name: 'Maintain a balanced diet',
    description:
      'Eat a balanced diet rich in fruits, vegetables, whole grains, and lean proteins to fuel your body and support overall health.',
    source: {
      type: 'book',
      name: "In Defense of Food: An Eater's Manifesto",
      author: 'Michael Pollan',
    },
  },
  {
    id: 'adequateSleep',
    name: 'Get adequate sleep',
    description:
      'Ensure you get 7-9 hours of quality sleep each night to support cognitive function, emotional well-being, and physical health.',
    source: {
      type: 'book',
      name: 'Why We Sleep: Unlocking the Power of Sleep and Dreams',
      author: 'Matthew Walker',
    },
  },
  {
    id: 'stressManagement',
    name: 'Manage stress effectively',
    description:
      'Adopt stress management techniques such as mindfulness, meditation, and deep breathing exercises to maintain mental health and resilience.',
    source: {
      type: 'book',
      name: 'The Relaxation Response',
      author: 'Herbert Benson',
    },
  },
  {
    id: 'stayHydrated',
    name: 'Stay hydrated',
    description:
      'Drink plenty of water throughout the day to support bodily functions, maintain energy levels, and promote overall health.',
    source: {
      type: 'book',
      name: "Your Body's Many Cries for Water",
      author: 'F. Batmanghelidj',
    },
  },
  {
    id: 'regularCheckups',
    name: 'Schedule regular check-ups',
    description:
      'Visit your healthcare provider for regular check-ups and screenings to monitor your health and catch potential issues early.',
    source: {
      type: 'book',
      name: 'The Checklist Manifesto: How to Get Things Right',
      author: 'Atul Gawande',
    },
  },
  {
    id: 'mentalHealth',
    name: 'Prioritize mental health',
    description:
      'Take care of your mental health by seeking therapy if needed, practicing self-care, and maintaining a positive outlook.',
    source: {
      type: 'book',
      name: 'The Happiness Advantage: How a Positive Brain Fuels Success in Work and Life',
      author: 'Shawn Achor',
    },
  },
  {
    id: 'healthyHabits',
    name: 'Develop healthy habits',
    description:
      'Cultivate habits that promote health, such as not smoking, limiting alcohol intake, and avoiding excessive consumption of processed foods.',
    source: {
      type: 'book',
      name: 'Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones',
      author: 'James Clear',
    },
  },
  {
    id: 'socialConnections',
    name: 'Maintain social connections',
    description:
      'Nurture your social relationships to improve mental health, reduce stress, and increase longevity.',
    source: {
      type: 'book',
      name: 'Social: Why Our Brains Are Wired to Connect',
      author: 'Matthew D. Lieberman',
    },
  },
  {
    id: 'healthyEnvironment',
    name: 'Create a healthy environment',
    description:
      'Surround yourself with a clean, organized, and positive environment to support your physical and mental health.',
    source: {
      type: 'book',
      name: 'The Life-Changing Magic of Tidying Up',
      author: 'Marie Kondo',
    },
  },
].map((idea) => ({ ...idea, categoryId: healthPrincipleCategory.id }))

export const financesIdeas: PrincipleIdea[] = [
  {
    id: 'payYourselfFirst',
    name: 'Pay yourself first',
    description:
      'Prioritize saving a portion of your income before spending on anything else to build a strong financial foundation.',
    source: {
      type: 'book',
      name: 'The Richest Man in Babylon',
      author: 'George S. Clason',
    },
  },
  {
    id: 'liveBelowMeans',
    name: 'Live below your means',
    description:
      'Spend less than you earn to save and invest the difference, which is crucial for long-term financial stability.',
    source: {
      type: 'book',
      name: 'Your Money or Your Life',
      author: 'Vicki Robin and Joe Dominguez',
    },
  },
  {
    id: 'diversifyInvestments',
    name: 'Diversify your investments',
    description:
      'Spread your investments across different asset classes to reduce risk and increase the potential for returns.',
    source: {
      type: 'book',
      name: 'The Intelligent Investor',
      author: 'Benjamin Graham',
    },
  },
  {
    id: 'buildEmergencyFund',
    name: 'Build an emergency fund',
    description:
      'Set aside three to six months of living expenses in a readily accessible account to cover unexpected expenses.',
    source: {
      type: 'book',
      name: 'Total Money Makeover',
      author: 'Dave Ramsey',
    },
  },
  {
    id: 'avoidBadDebt',
    name: 'Avoid bad debt',
    description:
      'Minimize high-interest debt such as credit card balances and personal loans, which can hinder financial progress.',
    source: {
      type: 'book',
      name: 'Rich Dad Poor Dad',
      author: 'Robert T. Kiyosaki',
    },
  },
  {
    id: 'investEarly',
    name: 'Invest early and often',
    description:
      'Start investing as early as possible to take advantage of compound interest, which can significantly grow your wealth over time.',
    source: {
      type: 'book',
      name: 'The Little Book of Common Sense Investing',
      author: 'John C. Bogle',
    },
  },
  {
    id: 'specificKnowledge',
    name: 'Build specific knowledge',
    description:
      'Develop unique, specific knowledge that cannot be easily replaced, providing you with a competitive advantage.',
    source: {
      type: 'book',
      name: 'The Almanack of Naval Ravikant',
      author: 'Naval Ravikant',
    },
  },
  {
    id: 'budgeting',
    name: 'Stick to a budget',
    description:
      'Create and adhere to a budget to track your spending, ensure you live within your means, and meet your financial goals.',
    source: {
      type: 'book',
      name: 'The Total Money Makeover',
      author: 'Dave Ramsey',
    },
  },
  {
    id: 'continuousEducation',
    name: 'Continuously educate yourself',
    description:
      'Stay informed about financial principles and investment strategies to make better financial decisions.',
    source: {
      type: 'book',
      name: 'The Millionaire Next Door',
      author: 'Thomas J. Stanley and William D. Danko',
    },
  },
  {
    id: 'frugality',
    name: 'Practice frugality',
    description:
      'Adopt a frugal lifestyle to maximize savings and invest more towards financial independence.',
    source: {
      type: 'book',
      name: 'The Simple Path to Wealth',
      author: 'JL Collins',
    },
  },
].map((idea) => ({ ...idea, categoryId: financePrincipleCategory.id }))

export const mindsetIdeas: PrincipleIdea[] = [
  {
    id: 'growthMindset',
    name: 'Adopt a growth mindset',
    description:
      'Embrace challenges and view failures as opportunities to learn and grow.',
    source: {
      type: 'book',
      name: 'Mindset: The New Psychology of Success',
      author: 'Carol S. Dweck',
    },
  },
  {
    id: 'positiveThinking',
    name: 'Practice positive thinking',
    description:
      'Focus on positive outcomes and maintain an optimistic outlook to improve resilience and motivation.',
    source: {
      type: 'book',
      name: 'The Power of Positive Thinking',
      author: 'Norman Vincent Peale',
    },
  },
  {
    id: 'selfAwareness',
    name: 'Increase self-awareness',
    description:
      'Regularly reflect on your thoughts, emotions, and behaviors to better understand your strengths and areas for improvement.',
    source: {
      type: 'book',
      name: 'Emotional Intelligence 2.0',
      author: 'Travis Bradberry and Jean Greaves',
    },
  },
  {
    id: 'embraceChange',
    name: 'Embrace change',
    description:
      'Be open to new experiences and adapt to changes with flexibility and a positive attitude.',
    source: {
      type: 'book',
      name: 'Who Moved My Cheese?',
      author: 'Spencer Johnson',
    },
  },
  {
    id: 'resilience',
    name: 'Build resilience',
    description:
      'Develop the ability to bounce back from setbacks and maintain a strong, positive mindset through adversity.',
    source: {
      type: 'book',
      name: 'Resilient',
      author: 'Rick Hanson',
    },
  },
  {
    id: 'selfCompassion',
    name: 'Practice self-compassion',
    description:
      'Treat yourself with kindness and understanding, especially during difficult times, to maintain a healthy mindset.',
    source: {
      type: 'book',
      name: 'Self-Compassion: The Proven Power of Being Kind to Yourself',
      author: 'Kristin Neff',
    },
  },
  {
    id: 'visualization',
    name: 'Use visualization techniques',
    description:
      'Visualize your goals and success to increase motivation and create a clear path to achievement.',
    source: {
      type: 'book',
      name: 'Creative Visualization',
      author: 'Shakti Gawain',
    },
  },
  {
    id: 'mindfulness',
    name: 'Practice mindfulness',
    description:
      'Stay present and fully engage with the current moment to reduce stress and improve mental clarity.',
    source: {
      type: 'book',
      name: 'The Miracle of Mindfulness',
      author: 'Thich Nhat Hanh',
    },
  },
  {
    id: 'goalSetting',
    name: 'Set clear, achievable goals',
    description:
      'Define specific, measurable goals to provide direction and maintain focus on your personal and professional growth.',
    source: {
      type: 'book',
      name: 'Goals!: How to Get Everything You Want -- Faster Than You Ever Thought Possible',
      author: 'Brian Tracy',
    },
  },
  {
    id: 'learnFromFailure',
    name: 'Learn from failure',
    description:
      'View failures as valuable learning experiences that provide insights and opportunities for growth.',
    source: {
      type: 'book',
      name: 'Failing Forward: Turning Mistakes into Stepping Stones for Success',
      author: 'John C. Maxwell',
    },
  },
].map((idea) => ({ ...idea, categoryId: mindsetPrincipleCategory.id }))

export const principleIdeas = [
  ...workIdeas,
  ...marriageIdeas,
  ...healthIdeas,
  ...financesIdeas,
  ...mindsetIdeas,
]
