type ProfilePageType = 'linkedin' | 'academic' | 'website' | 'twitter'

interface ProfilePage {
  type: ProfilePageType
  url: string
}

export interface Testimonial {
  html: string
  name: string
  profilePage: ProfilePage
  position: string
  imageUrl: string
}

const getImageUrl = (name: string) => `/images/testimonials/${name}_200.webp`

export const testimonials: Testimonial[] = [
  {
    html: `Increaser helps me put <em>consistent efforts into my startups.</em> I've done a lot in the last few months!`,
    name: 'Semion Sobolevski',
    profilePage: {
      type: 'linkedin',
      url: 'https://www.linkedin.com/in/semion-sobolevski/',
    },
    imageUrl: getImageUrl('semion'),
    position: 'Founder & Product Engineer',
  },
  {
    html: 'I found Increaser very useful and friendly. After one week, I managed to <em>organize my work habits</em>. UI is neat, and I enjoy that!',
    name: 'Adi',
    profilePage: {
      type: 'academic',
      url: 'https://bgu.academia.edu/AdiSherzer',
    },
    position: 'Postdoctoral Fellow',
    imageUrl: getImageUrl('adi'),
  },
  {
    html: 'Increaser helps me better understand my activity breakdown and <em>keeps my priorities in the ordered list.</em>',
    name: 'Maksim Markevich',
    profilePage: {
      type: 'linkedin',
      url: 'https://www.linkedin.com/in/maksimmarkevich/',
    },
    imageUrl: getImageUrl('maksim'),
    position: 'Chief Technology Officer',
  },
  {
    html: `Increaser is a useful tool for monitoring <em>focus at work</em> and retrospective performance analysis.`,
    name: `Eugene Pyrlog`,
    profilePage: {
      type: 'linkedin',
      url: 'https://www.linkedin.com/in/eugene-pyrlog-55b73b127',
    },
    imageUrl: getImageUrl('eugene'),
    position: 'Team Lead',
  },
  {
    html: `I will be using it every day from now on. It's such a good way to keep <em>track of the things I am spending my time on!</em>`,
    name: `Athiya Rastogi`,
    profilePage: {
      type: 'linkedin',
      url: 'https://www.linkedin.com/in/athiyarastogi/',
    },
    imageUrl: getImageUrl('athiya'),
    position: 'Data Scientist',
  },
  {
    name: 'Chi-Hua Wang',
    html: 'Increaser has all that it takes: easy-to-use focus, daily and weekly goals, reports with projects breakdown. Increaser is perfect for me to be <em>productive at academic work!</em>',
    profilePage: {
      type: 'linkedin',
      url: 'https://www.linkedin.com/in/chi-hua-wang-82ba5ab2/',
    },
    imageUrl: getImageUrl('chi'),
    position: 'Ph.D. Student',
  },
  {
    name: 'Gareth McKinney',
    html: `Increaser helps me keep <em>the discipline of deep-focused work.</em> I usually do 50 minutes sessions with 10 minutes breaks. Using Increaser is like playing a video game, which gives me an illusion of playing against a lazy version of myself.`,
    profilePage: {
      type: 'website',
      url: 'https://styleforces.com/',
    },
    imageUrl: getImageUrl('gareth'),
    position: 'Creative Director',
  },
  {
    html: 'I had a great experience with Increaser! It helped me <em>organize my workday</em> and better appreciate the time invested in every project.',
    name: 'Alfredo Pérez',
    profilePage: {
      type: 'linkedin',
      url: 'https://www.linkedin.com/in/alfalexdg/',
    },
    imageUrl: getImageUrl('alfredo'),
    position: 'Graphic Designer',
  },
  {
    html: `I'm a college student with pretty limited time. Increaser allows me to focus on assignments or projects for set periods, so <em>no time is wasted.</em> It's an awesome time management tool!`,
    name: 'Dalton Hongell',
    profilePage: {
      type: 'linkedin',
      url: 'https://www.linkedin.com/in/dalton-hongell-7576551b3/',
    },
    imageUrl: getImageUrl('dalton'),
    position: 'Finance Student',
  },
  {
    html: 'For a researcher, it is crucial to alternate work with rest to stay productive and creative. In my opinion, Increaser is the best app for gentle engagement tracking throughout the day. The app will be convenient for everyone who wants <em>to be in touch with time while doing intellectual or imaginative work!</em>',
    name: 'Polina Belozerova',
    profilePage: {
      type: 'linkedin',
      url: 'https://www.linkedin.com/in/polikb/',
    },
    imageUrl: getImageUrl('polina'),
    position: 'Senior Engineer in Quantum Computing',
  },
  {
    name: 'Mica Amd',
    html: `Increaser is <em>an excellent time-management application</em> that works across platforms. Radzion is a passionate and enthusiastic developer who cares about the quality of his product, and it shows. I Highly recommend it!`,
    profilePage: {
      type: 'twitter',
      url: 'https://twitter.com/AmdMica',
    },
    imageUrl: getImageUrl('mica'),
    position: 'Professor',
  },
  {
    name: 'André Fonseca',
    html: `I'm using Increaser when working on my thesis, papers, and projects! <em>The app keeps me productive.</em>`,
    profilePage: {
      type: 'linkedin',
      url: 'https://www.linkedin.com/in/andre-fonseca-7a801b155/',
    },
    imageUrl: getImageUrl('andre'),
    position: 'PhD Candidate Chemistry',
  },
  {
    html: 'I am using the tool throughout the day, and now, I can see <em>the exact projects consuming my time.</em>',
    name: `Aldo Nascimento`,
    profilePage: {
      type: 'linkedin',
      url: 'https://www.linkedin.com/in/aldomn/',
    },
    imageUrl: getImageUrl('aldo'),
    position: 'Vice-president',
  },
  {
    html: 'Some days I lose hold of time. After discovering the app, I get to <em>manage my time way better and know where it goes!</em>',
    name: 'Faith Omojola',
    profilePage: {
      type: 'linkedin',
      url: 'https://www.linkedin.com/in/faithomojola/',
    },
    imageUrl: getImageUrl('faith'),
    position: 'Software Engineer',
  },
  {
    html: `Thanks a lot for this great product! Increaser is <em>a great time tracker</em> with a simple interface. I found it very helpful.`,
    name: `Prashant Sengar`,
    profilePage: {
      type: 'linkedin',
      url: 'https://www.linkedin.com/in/prashant-sengar/',
    },
    imageUrl: getImageUrl('prashant'),
    position: 'Backend Developer',
  },
]
