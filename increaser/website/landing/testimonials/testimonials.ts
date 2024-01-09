import { Testimonial } from '@lib/ui/website/testimonials/Testimonial'

const getImageUrl = (name: string) => `/images/testimonials/${name}_200.webp`

export const testimonials: Testimonial[] = [
  {
    content: `Increaser helps me put consistent efforts into my startups. I've done a lot in the last few months!`,
    name: 'Semion Sobolevski',
    profileType: 'linkedin',
    profileUrl: 'https://www.linkedin.com/in/semion-sobolevski/',
    imageUrl: getImageUrl('semion'),
    position: 'Founder',
  },
  {
    content:
      'I found Increaser very useful and friendly. After one week, I managed to organize my work habits. UI is neat, and I enjoy that!',
    name: 'Adi',
    profileType: 'website',
    profileUrl: 'https://bgu.academia.edu/AdiSherzer',
    position: 'Postdoctoral Fellow',
    imageUrl: getImageUrl('adi'),
  },
  {
    content:
      'Increaser helps me better understand my activity breakdown and keeps my priorities in the ordered list.',
    name: 'Maksim Markevich',
    profileType: 'linkedin',
    profileUrl: 'https://www.linkedin.com/in/maksimmarkevich/',
    imageUrl: getImageUrl('maksim'),
    position: 'CTO',
  },
  {
    content: `Increaser is a useful tool for monitoring focus at work and retrospective performance analysis.`,
    name: `Eugene Pyrlog`,

    profileType: 'linkedin',
    profileUrl: 'https://www.linkedin.com/in/eugene-pyrlog-55b73b127',
    imageUrl: getImageUrl('eugene'),
    position: 'Team Lead',
  },
  {
    content: `I will be using it every day from now on. It's such a good way to keep track of the things I am spending my time on!`,
    name: `Athiya Rastogi`,

    profileType: 'linkedin',
    profileUrl: 'https://www.linkedin.com/in/athiyarastogi/',
    imageUrl: getImageUrl('athiya'),
    position: 'Data Scientist',
  },
  {
    name: 'Chi-Hua Wang',
    content:
      'Increaser has all that it takes: easy-to-use focus, daily and weekly goals, reports with projects breakdown. Increaser is perfect for me to be productive at academic work!',

    profileType: 'linkedin',
    profileUrl: 'https://www.linkedin.com/in/chi-hua-wang-82ba5ab2/',
    imageUrl: getImageUrl('chi'),
    position: 'Ph.D. Student',
  },
  {
    name: 'Gareth McKinney',
    content: `Increaser helps me keep the discipline of deep-focused work. I usually do 50 minutes sessions with 10 minutes breaks. Using Increaser is like playing a video game, which gives me an illusion of playing against a lazy version of myself.`,

    profileType: 'website',
    profileUrl: 'https://styleforces.com/',
    imageUrl: getImageUrl('gareth'),
    position: 'Creative Director',
  },
  {
    content:
      'I had a great experience with Increaser! It helped me organize my workday and better appreciate the time invested in every project.',
    name: 'Alfredo Pérez',

    profileType: 'linkedin',
    profileUrl: 'https://www.linkedin.com/in/alfalexdg/',
    imageUrl: getImageUrl('alfredo'),
    position: 'Graphic Designer',
  },
  {
    content: `I'm a college student with pretty limited time. Increaser allows me to focus on assignments or projects for set periods, so no time is wasted. It's an awesome time management tool!`,
    name: 'Dalton Hongell',

    profileType: 'linkedin',
    profileUrl: 'https://www.linkedin.com/in/dalton-hongell-7576551b3/',
    imageUrl: getImageUrl('dalton'),
    position: 'Finance Student',
  },
  {
    content:
      'For a researcher, it is crucial to alternate work with rest to stay productive and creative. In my opinion, Increaser is the best app for gentle engagement tracking throughout the day. The app will be convenient for everyone who wants to be in touch with time while doing intellectual or imaginative work!',
    name: 'Polina Belozerova',

    profileType: 'linkedin',
    profileUrl: 'https://www.linkedin.com/in/polikb/',
    imageUrl: getImageUrl('polina'),
    position: 'Senior Engineer',
  },
  {
    name: 'Mica Amd',
    content: `Increaser is an excellent time-management application that works across platforms. Radzion is a passionate and enthusiastic developer who cares about the quality of his product, and it shows. I Highly recommend it!`,

    profileType: 'x',
    profileUrl: 'https://twitter.com/AmdMica',
    imageUrl: getImageUrl('mica'),
    position: 'Professor',
  },
  {
    name: 'André Fonseca',
    content: `I'm using Increaser when working on my thesis, papers, and projects! The app keeps me productive.`,

    profileType: 'linkedin',
    profileUrl: 'https://www.linkedin.com/in/andre-fonseca-7a801b155/',
    imageUrl: getImageUrl('andre'),
    position: 'PhD',
  },
  {
    content:
      'I am using the tool throughout the day, and now, I can see the exact projects consuming my time.',
    name: `Aldo Nascimento`,

    profileType: 'linkedin',
    profileUrl: 'https://www.linkedin.com/in/aldomn/',
    imageUrl: getImageUrl('aldo'),
    position: 'Vice-president',
  },
  {
    content:
      'Some days I lose hold of time. After discovering the app, I get to manage my time way better and know where it goes!',
    name: 'Faith Omojola',

    profileType: 'linkedin',
    profileUrl: 'https://www.linkedin.com/in/faithomojola/',
    imageUrl: getImageUrl('faith'),
    position: 'Software Engineer',
  },
  {
    content: `Thanks a lot for this great product! Increaser is a great time tracker with a simple interface. I found it very helpful.`,
    name: `Prashant Sengar`,

    profileType: 'linkedin',
    profileUrl: 'https://www.linkedin.com/in/prashant-sengar/',
    imageUrl: getImageUrl('prashant'),
    position: 'Backend Developer',
  },
]
