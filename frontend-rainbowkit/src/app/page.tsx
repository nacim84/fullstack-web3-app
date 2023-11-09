import { Hero } from '@/components/hero'

export default function Home() {
  return (
    <main className="w-full h-full">
      <div className="flex flex-col h-[830px] gap-20">
        <Hero />
      </div>
    </main>
  )
};
