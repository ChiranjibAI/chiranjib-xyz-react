import type { Metadata } from 'next'
import { SERVICE_DEMO_DATA } from '@/lib/serviceData'
import type { ServiceDemoProps } from '@/components/remotion/ServiceDemoComposition'
import { ServiceDemoGallery } from '@/components/remotion/players/ServiceDemoGallery'

export const metadata: Metadata = {
  title: 'Service Demo Gallery | Chiranjib.xyz — AI Automation Services',
  description:
    'Watch 13-second demos of all 20 AI automation services: AI agents, WhatsApp bots, n8n workflows, RAG/LLM, web scraping, security audits, computer vision, and voice AI.',
  openGraph: {
    title: 'Service Demo Gallery | Chiranjib.xyz',
    description: 'Live animated demos of every AI automation service offered by Chiranjib.',
  },
}

export default function ServiceDemosPage() {
  // Group services by category
  const allServices = Object.values(SERVICE_DEMO_DATA)
  const grouped = allServices.reduce<Record<string, ServiceDemoProps[]>>(
    (acc: Record<string, ServiceDemoProps[]>, service: ServiceDemoProps) => {
      const cat = service.category
      if (!acc[cat]) acc[cat] = []
      acc[cat].push(service)
      return acc
    },
    {}
  )

  const categories = Object.keys(grouped)

  return (
    <main className="min-h-screen bg-[#030303] pt-24 pb-20">
      {/* Page header */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted mb-4">
          / service demos
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-text mb-4 tracking-tight">
          All Service Demos
        </h1>
        <p className="text-base text-muted max-w-2xl">
          13-second animated demos for each of the 20 AI automation services.
          Each video shows the problem, solution, and key result metric.
        </p>
      </div>

      {/* Gallery grouped by category — client component handles expand/play */}
      <ServiceDemoGallery grouped={grouped} categories={categories} />
    </main>
  )
}
