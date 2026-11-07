import { collection, config, fields } from '@keystatic/core'

// Local mode: the editor at /keystatic reads and writes the MDX files in ./content.
// It is only available while running `next dev`.
export default config({
  storage: { kind: 'local' },
  ui: { brand: { name: 'Portfolio CMS' } },
  collections: {
    posts: collection({
      label: 'Blog posts',
      slugField: 'title',
      path: 'content/posts/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ label: 'Description', multiline: true, validation: { isRequired: true } }),
        pubDate: fields.date({ label: 'Publish date', validation: { isRequired: true } }),
        updatedDate: fields.date({ label: 'Updated date' }),
        author: fields.text({ label: 'Author', defaultValue: 'Alexander Meneses' }),
        coverImage: fields.text({ label: 'Cover image path', description: 'A path inside /public, e.g. /cover.webp' }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (props) => props.value,
        }),
        draft: fields.checkbox({ label: 'Draft', description: 'Hidden in production while checked', defaultValue: true }),
        content: fields.mdx({ label: 'Content' }),
      },
    }),
    projects: collection({
      label: 'Projects',
      slugField: 'title',
      path: 'content/projects/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ label: 'Description', multiline: true, validation: { isRequired: true } }),
        technologies: fields.array(fields.text({ label: 'Technology' }), {
          label: 'Technologies',
          itemLabel: (props) => props.value,
        }),
        status: fields.text({ label: 'Status', defaultValue: 'Active' }),
        demo: fields.url({ label: 'Demo URL' }),
        github: fields.url({ label: 'GitHub URL' }),
        number: fields.text({ label: 'Card number', description: 'e.g. 07' }),
        type: fields.text({ label: 'Card label', description: 'e.g. Software · AI' }),
        accent: fields.select({
          label: 'Card colour',
          options: [
            { label: 'Violet', value: 'violet' },
            { label: 'Orange', value: 'orange' },
            { label: 'Cyan', value: 'cyan' },
            { label: 'Green', value: 'green' },
            { label: 'Rose', value: 'rose' },
            { label: 'Blue', value: 'blue' },
          ],
          defaultValue: 'violet',
        }),
        image: fields.image({
          label: 'Card image',
          description: 'Shown on the home page card (1500×1200, transparent PNG). Leave empty to keep the icon.',
          directory: 'public/images/projects',
          publicPath: '/images/projects/',
        }),
        cover: fields.image({
          label: 'Cover image',
          description: 'Shown at the top of the project page (2400×1350).',
          directory: 'public/images/projects',
          publicPath: '/images/projects/',
        }),
        gallery: fields.array(
          fields.object({
            src: fields.image({
              label: 'Screenshot',
              directory: 'public/images/projects',
              publicPath: '/images/projects/',
              validation: { isRequired: true },
            }),
            caption: fields.text({ label: 'Caption' }),
          }),
          { label: 'Gallery', itemLabel: (props) => props.fields.caption.value || 'Screenshot' },
        ),
        icon: fields.select({
          label: 'Card icon',
          description: 'Used when no card image is set.',
          options: [
            { label: 'Sparkles', value: 'sparkles' },
            { label: 'Microphone', value: 'mic' },
            { label: 'Store', value: 'store' },
            { label: 'Chart', value: 'line-chart' },
            { label: 'Shield', value: 'shield' },
            { label: 'Puzzle', value: 'puzzle' },
            { label: 'Pen', value: 'pen' },
          ],
          defaultValue: 'sparkles',
        }),
        order: fields.integer({ label: 'Order on home page', defaultValue: 99 }),
        featured: fields.checkbox({ label: 'Show on home page', defaultValue: true }),
        hidden: fields.checkbox({
          label: 'Hidden',
          description: 'Kept in the files and left off the site, including its own page.',
          defaultValue: false,
        }),
        content: fields.mdx({ label: 'Content' }),
      },
    }),
  },
})
