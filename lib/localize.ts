import type { Post, Project } from '@/lib/content'
import { localizeFields, tagLabel, type Locale } from '@/lib/i18n'

const firstPostEs = `Esta es mi primera publicación en el sitio nuevo. Quiero compartir el camino en desarrollo web y los proyectos en los que estoy trabajando.

## Qué vas a encontrar

Voy a escribir sobre:

- **Desarrollo web** ideas, trucos y tutoriales
- **Mis proyectos** cómo se construyen, por dentro
- **Tecnología** lo que voy pensando de las tendencias
- **El camino profesional** lo que he vivido trabajando en Marttech

## Proyectos recientes

Últimamente he estado en un par de cosas:

### Sitio personal
Es esta página. Hecha con:

- Astro para generación de sitios estáticos
- Tailwind CSS para los estilos
- TypeScript para tener tipos

### Plataforma de comercio
Una solución full-stack con:

- Frontend moderno en React
- Backend en Node.js
- Base de datos PostgreSQL
- Pagos con Stripe

## Qué sigue

Van a venir notas más concretas:

- Tutoriales y recorridos de código
- Casos de proyectos
- Lecturas de la industria

Gracias por leer. Bienvenido al blog.

---

*Si quieres, conecta conmigo en redes o mira el trabajo en Marttech.*
`

const postEs: Record<string, { title: string; description: string; content: string }> = {
  'my-first-post': {
    title: 'Mi primera publicación',
    description: 'Bienvenido a mi blog. Esta es mi primera nota sobre desarrollo web y mi camino.',
    content: firstPostEs,
  },
}

export function localizeProject(project: Project, locale: Locale): Project {
  return localizeFields(project, locale)
}

export function localizePost(post: Post, locale: Locale): Post {
  if (locale !== 'es') return post
  const extra = postEs[post.slug]
  if (!extra) return post
  return { ...post, ...extra }
}

export function displayTag(locale: Locale, name: string) {
  return tagLabel(locale, name)
}
