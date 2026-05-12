import { BottomNav } from '@/components/BottomNav'

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* Centered content column — constrained on tablet/desktop */}
      <div id="main-content" className="mx-auto flex w-full max-w-lg min-h-screen flex-col pb-16">
        {children}
      </div>
      <BottomNav />
    </>
  )
}
