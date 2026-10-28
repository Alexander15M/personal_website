import Link from 'next/link'
import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote/rsc'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'

const components: MDXRemoteProps['components'] = {
  a: ({ href = '', children, ...props }) =>
    href.startsWith('/') || href.startsWith('#') ? (
      <Link href={href} {...props}>
        {children}
      </Link>
    ) : (
      <a href={href} target="_blank" rel="noreferrer noopener" {...props}>
        {children}
      </a>
    ),
}

export function Mdx({ source }: { source: string }) {
  return (
    <div className="prose">
      <MDXRemote
        source={source}
        components={components}
        options={{
          mdxOptions: {
            rehypePlugins: [
              rehypeSlug,
              [rehypeAutolinkHeadings, { behavior: 'wrap' }],
              [
                rehypePrettyCode,
                {
                  theme: { light: 'github-light', dark: 'github-dark-dimmed' },
                  defaultColor: false,
                  keepBackground: false,
                },
              ],
            ],
          },
        }}
      />
    </div>
  )
}
