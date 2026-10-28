export const locales = ['en', 'es'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'

export function isLocale(value: string): value is Locale {
  return value === 'en' || value === 'es'
}

export function stripLocale(pathname: string): string {
  if (pathname === '/es' || pathname === '/en') return '/'
  if (pathname.startsWith('/es/')) return pathname.slice(3) || '/'
  if (pathname.startsWith('/en/')) return pathname.slice(3) || '/'
  return pathname || '/'
}

/** English stays unprefixed. Spanish lives under /es. Hash is preserved. */
export function localizeHref(locale: Locale, path: string): string {
  const hashAt = path.indexOf('#')
  const hash = hashAt >= 0 ? path.slice(hashAt) : ''
  const pathname = hashAt >= 0 ? path.slice(0, hashAt) || '/' : path
  const bare = stripLocale(pathname)
  const localized = locale === defaultLocale ? bare : bare === '/' ? '/es' : `/es${bare}`
  return `${localized}${hash}`
}

export function pageAlternates(locale: Locale, path: string) {
  return {
    canonical: localizeHref(locale, path),
    languages: {
      en: localizeHref('en', path),
      es: localizeHref('es', path),
      'x-default': localizeHref('en', path),
    },
  }
}

const en = {
  language: 'Language',
  navLabel: 'Primary navigation',
  home: 'home',
  openNav: 'Open navigation',
  closeNav: 'Close navigation',
  talk: "Let's talk",
  themeLight: 'Switch to light mode',
  themeDark: 'Switch to dark mode',
  nav: [
    { href: '/#work', label: 'Work' },
    { href: '/#about', label: 'About' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ],
  hero: {
    kicker: 'Open to full-time roles',
    line1: 'Making digital things',
    line2: 'feel simple.',
    copy: "I'm Alexander, a software developer and physicist building useful tools, exploring complex systems, and staying curious about how things work.",
    work: 'Explore my work',
    about: 'More about me',
  },
  work: {
    eyebrow: 'Selected work',
    line1: "A few things I've",
    line2: 'helped bring to life.',
  },
  about: {
    eyebrow: 'A little context',
    line1: 'Curious by default.',
    line2: 'Precise by choice.',
    p1: 'A physicist turned software engineer with 4+ years building scalable web products with US startups, and a growing focus on AI and data science.',
    p2: "Outside of work you'll find me reading, chasing new ideas, or dancing salsa.",
    cta: 'Get to know me',
  },
  notes: {
    eyebrow: 'From the blog',
    title: 'Thoughts, occasionally.',
    viewAll: 'View all',
    empty: 'Nothing published yet.',
  },
  contactBand: {
    eyebrow: 'Have a good one in mind?',
    line1: "Let's make",
    line2: 'something good.',
    orForm: 'Or use the form',
  },
  footer: {
    built: 'Built with curiosity and intention.',
    email: 'Email',
    rss: 'RSS feed',
  },
  seo: {
    title: 'Alexander Meneses, Developer & Physicist',
    description:
      'Alexander Meneses is a physicist turned software engineer building useful tools and exploring complex systems.',
    ogTitle: 'Making digital things feel simple.',
    ogEyebrow: 'Developer & Physicist',
  },
  contact: {
    title: 'Contact',
    description: 'Send me a message or book a free 30 minute call.',
    eyebrow: 'Have a good one in mind?',
    titleStart: "Let's make",
    titleEnd: 'something good.',
    lead: 'Book a call to talk it through, or just drop a message. You can also email',
    formTitle: 'Send a message',
    bookTitle: 'Book a free meeting',
  },
  form: {
    name: 'Name',
    email: 'Email',
    message: 'Message',
    send: 'Send message',
    sending: 'Sending…',
    sent: 'Thanks, your message was sent.',
    invalid: 'Please fill in every field with valid values.',
    unconfigured: 'The contact form is not configured yet. Please book a call instead.',
    failed: 'Could not send your message. Please try again later.',
    fallback: 'Something went wrong.',
  },
  blog: {
    title: 'Blog',
    description: 'Writing about web development, the projects I build and what I learn along the way.',
    eyebrow: 'The blog',
    titleStart: 'Thoughts,',
    titleEnd: 'occasionally.',
    lead: "Writing about web development, the projects I'm building and what I learn along the way.",
    search: 'Search posts',
    searchPlaceholder: 'Search posts…',
    filter: 'Filter by tag',
    all: 'All',
    searching: 'Searching…',
    none: 'No posts match.',
    tagPage: 'Open tag page',
    allPosts: 'All posts',
    updated: 'Updated',
    minRead: 'min read',
    draft: 'Draft',
    draftPreview: 'Draft preview',
    onThisPage: 'On this page',
    toc: 'Table of contents',
    related: 'Related posts',
    tagged: 'Posts tagged {tag}',
    post: 'post',
    posts: 'posts',
  },
  project: {
    title: 'Projects',
    description: 'Selected projects: software, AI and automation I have helped bring to life.',
    all: 'All projects',
    status: 'Status',
    visit: 'Visit site',
    source: 'Source',
    og: 'Project',
  },
}

const es: typeof en = {
  language: 'Idioma',
  navLabel: 'Navegación principal',
  home: 'inicio',
  openNav: 'Abrir navegación',
  closeNav: 'Cerrar navegación',
  talk: 'Hablemos',
  themeLight: 'Cambiar a modo claro',
  themeDark: 'Cambiar a modo oscuro',
  nav: [
    { href: '/#work', label: 'Trabajo' },
    { href: '/#about', label: 'Sobre mí' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contacto' },
  ],
  hero: {
    kicker: 'Abierto a roles de tiempo completo',
    line1: 'Hacer que lo digital',
    line2: 'se sienta simple.',
    copy: 'Soy Alexander, desarrollador de software y físico. Construyo herramientas útiles, exploro sistemas complejos y sigo curioso por cómo funcionan las cosas.',
    work: 'Ver mi trabajo',
    about: 'Más sobre mí',
  },
  work: {
    eyebrow: 'Trabajo seleccionado',
    line1: 'Algunas cosas que',
    line2: 'ayudé a crear.',
  },
  about: {
    eyebrow: 'Un poco de contexto',
    line1: 'Curioso por naturaleza.',
    line2: 'Preciso por elección.',
    p1: 'Físico convertido en ingeniero de software, con más de 4 años construyendo productos web escalables con startups de EE. UU., y un enfoque creciente en IA y ciencia de datos.',
    p2: 'Fuera del trabajo me vas a encontrar leyendo, persiguiendo ideas nuevas o bailando salsa.',
    cta: 'Conóceme',
  },
  notes: {
    eyebrow: 'Del blog',
    title: 'Ideas, de vez en cuando.',
    viewAll: 'Ver todo',
    empty: 'Todavía no hay nada publicado.',
  },
  contactBand: {
    eyebrow: '¿Tienes algo bueno en mente?',
    line1: 'Hagamos',
    line2: 'algo bueno.',
    orForm: 'O usa el formulario',
  },
  footer: {
    built: 'Hecho con curiosidad e intención.',
    email: 'Correo',
    rss: 'Feed RSS',
  },
  seo: {
    title: 'Alexander Meneses, Desarrollador y físico',
    description:
      'Alexander Meneses es un físico que se convirtió en ingeniero de software. Construye herramientas útiles y explora sistemas complejos.',
    ogTitle: 'Hacer que lo digital se sienta simple.',
    ogEyebrow: 'Desarrollador y físico',
  },
  contact: {
    title: 'Contacto',
    description: 'Escríbeme o agenda una llamada gratis de 30 minutos.',
    eyebrow: '¿Tienes algo bueno en mente?',
    titleStart: 'Hagamos',
    titleEnd: 'algo bueno.',
    lead: 'Agenda una llamada para conversarlo, o deja un mensaje. También puedes escribir a',
    formTitle: 'Envía un mensaje',
    bookTitle: 'Agenda una reunión gratis',
  },
  form: {
    name: 'Nombre',
    email: 'Correo',
    message: 'Mensaje',
    send: 'Enviar mensaje',
    sending: 'Enviando…',
    sent: 'Gracias, tu mensaje se envió.',
    invalid: 'Completa todos los campos con datos válidos.',
    unconfigured: 'El formulario todavía no está configurado. Mejor agenda una llamada.',
    failed: 'No pude enviar tu mensaje. Inténtalo de nuevo más tarde.',
    fallback: 'Algo salió mal.',
  },
  blog: {
    title: 'Blog',
    description: 'Notas sobre desarrollo web, los proyectos que construyo y lo que voy aprendiendo.',
    eyebrow: 'El blog',
    titleStart: 'Ideas,',
    titleEnd: 'de vez en cuando.',
    lead: 'Escribo sobre desarrollo web, los proyectos que estoy construyendo y lo que voy aprendiendo en el camino.',
    search: 'Buscar publicaciones',
    searchPlaceholder: 'Buscar publicaciones…',
    filter: 'Filtrar por etiqueta',
    all: 'Todas',
    searching: 'Buscando…',
    none: 'Ninguna publicación coincide.',
    tagPage: 'Abrir página de la etiqueta',
    allPosts: 'Todas las publicaciones',
    updated: 'Actualizado',
    minRead: 'min de lectura',
    draft: 'Borrador',
    draftPreview: 'Vista previa',
    onThisPage: 'En esta página',
    toc: 'Tabla de contenidos',
    related: 'Publicaciones relacionadas',
    tagged: 'Publicaciones etiquetadas {tag}',
    post: 'publicación',
    posts: 'publicaciones',
  },
  project: {
    title: 'Proyectos',
    description: 'Proyectos seleccionados: software, IA y automatización que ayudé a crear.',
    all: 'Todos los proyectos',
    status: 'Estado',
    visit: 'Ver sitio',
    source: 'Código',
    og: 'Proyecto',
  },
}

export const messages = { en, es }
export type Messages = typeof en

const tagsEs: Record<string, string> = {
  Meta: 'Meta',
  'Web Development': 'Desarrollo web',
}

export function tagLabel(locale: Locale, name: string) {
  if (locale !== 'es') return name
  return tagsEs[name] ?? name
}

const projectEs: Record<string, { description: string; type: string; status: string }> = {
  hellohaven: {
    description: 'Asistente de IA personal que recuerda tu vida, te encuentra en cualquier canal y de verdad resuelve cosas',
    type: 'Software · IA',
    status: 'Activo',
  },
  sara: {
    description: 'Asistente de voz para restaurantes: pedir comida hablando, con IA',
    type: 'Interfaz de voz · SaaS',
    status: 'Activo',
  },
  loma: {
    description: 'Marketplace local que conecta al barrio y hace más fácil el comercio de cerca',
    type: 'Marketplace · Comunidad',
    status: 'En desarrollo',
  },
  investsense: {
    description: 'Plataforma para inversionistas con analítica, portafolio e ideas de inversión',
    type: 'Fintech · Analítica',
    status: 'Activo',
  },
  privacybrain: {
    description: 'Automatización de backend para gestionar privacidad y proteger datos',
    type: 'Backend · Privacidad',
    status: 'Activo',
  },
  'bubble-plugins': {
    description: 'Plugins de JavaScript e integraciones a medida para la plataforma no-code Bubble.io',
    type: 'No-code · Plugins',
    status: 'Activo',
  },
}

export function localizeFields<T extends { slug: string; description: string; type?: string; status?: string }>(
  item: T,
  locale: Locale,
): T {
  if (locale !== 'es') return item
  const extra = projectEs[item.slug]
  if (!extra) return item
  return { ...item, ...extra }
}
