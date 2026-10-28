import { AboutSection, ContactSection, Hero, NotesSection, WorkSection } from '@/components/site/sections'
import { getAllPosts, getAllProjects } from '@/lib/content'

export const revalidate = 3600

export default function Page() {
  const projects = getAllProjects()
  const posts = getAllPosts().slice(0, 3)

  return (
    <>
      <Hero />
      <WorkSection projects={projects} />
      <AboutSection />
      <NotesSection posts={posts} />
      <ContactSection />
    </>
  )
}
