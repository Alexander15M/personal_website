export const SITE = {
  name: 'Alexander Meneses',
  shortName: 'AM',
  title: 'Alexander Meneses — Developer & Physicist',
  description:
    'Alexander Meneses is a physicist turned software engineer building useful tools and exploring complex systems.',
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://alexanderdev-website.netlify.app').replace(/\/$/, ''),
  github: 'https://github.com/Alexander15M',
  linkedin: 'https://www.linkedin.com/in/alexander-meneses-arismendi/',
  calendly: 'https://calendly.com/alexanderdev-contact/30min',
  // Optional: set NEXT_PUBLIC_CONTACT_EMAIL to show a mailto link on the site.
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? '',
} as const

export const NAV_LINKS = [
  { href: '/#work', label: 'Work' },
  { href: '/#about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
] as const
