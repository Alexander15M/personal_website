import { notFound } from 'next/navigation'
import KeystaticApp from './keystatic'

export default function Layout() {
  // Local-mode storage only works against the dev server's file system.
  if (process.env.NODE_ENV === 'production') notFound()
  return <KeystaticApp />
}
