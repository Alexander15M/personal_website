export const SITE = {
  name: 'Alexander Meneses',
  shortName: 'AM',
  title: 'Alexander Meneses,  Developer & Physicist',
  description:
    'Alexander Meneses is a physicist turned software engineer building useful tools and exploring complex systems.',
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://alexanderdev-website.netlify.app').replace(/\/$/, ''),
  github: 'https://github.com/Alexander15M',
  linkedin: 'https://www.linkedin.com/in/alexander-meneses-arismendi/',
  calendly: 'https://calendly.com/alexanderdev-contact/30min',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@alexmeneses.com',
} as const

