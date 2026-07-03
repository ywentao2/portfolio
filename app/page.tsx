import { StatusBar } from "@/components/status-bar"
import { Hero } from "@/components/hero"
import { ResumeSection } from "@/components/resume-section"
import { Experience } from "@/components/experience"
import { SelectedWork } from "@/components/selected-work"
import { Stack } from "@/components/stack"
import { Achievements } from "@/components/achievements"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <main className="min-h-screen">
      <StatusBar />
      <div className="mx-auto max-w-[920px] px-7">
        <Hero />
        <ResumeSection />
        <Experience />
        <SelectedWork />
        <Stack />
        <Achievements />
        <SiteFooter />
      </div>
    </main>
  )
}