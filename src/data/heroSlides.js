// Each slide has its own headline, description, visual and calls to action.
// `href` is used for same-page anchors and `to` for router links.
export const heroSlides = [
  {
    id: 'ideas',
    tag: 'Share ideas',
    visual: 'spark',
    headline: 'Every startup begins as an idea worth sharing',
    description:
      'Post your concept, explain the problem it solves, and let a community of students and founders help you sharpen it.',
    primaryCta: { label: 'Explore Ideas', to: '/ideas' },
    secondaryCta: { label: 'See how it works', href: '#how-it-works' },
  },
  {
    id: 'innovation',
    tag: 'Innovation',
    visual: 'innovation',
    headline: 'Turn raw innovation into a plan people can back',
    description:
      'Lay out your budget, target audience and proposed solution on one structured page so the right people understand it fast.',
    primaryCta: { label: 'Share Your Idea', to: '/add-idea' },
    secondaryCta: { label: 'Explore Ideas', to: '/ideas' },
  },
  {
    id: 'collaboration',
    tag: 'Collaboration',
    visual: 'collaboration',
    headline: 'Better ideas come from better conversations',
    description:
      'Comment on other founders’ ideas, ask the hard questions and find teammates who care about the same problem.',
    primaryCta: { label: 'Join the Community', to: '/register' },
    secondaryCta: { label: 'Explore Ideas', to: '/ideas' },
  },
]
