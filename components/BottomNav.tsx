'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Map, Bookmark } from 'lucide-react'
import { cn } from '@/lib/utils'

const tabs = [
  { href: '/home',   label: 'Home',   icon: Home },
  { href: '/browse', label: 'Browse', icon: Map },
  { href: '/saved',  label: 'Saved',  icon: Bookmark },
] as const

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Main navigation"
      className="fixed bottom-0 inset-x-0 z-30 border-t border-border bg-card"
    >
      <div className="mx-auto max-w-lg grid h-16 grid-cols-3">
        {tabs.map(({ href, label, icon: Icon }) => {
          const isActive =
            pathname === href || (href !== '/home' && pathname.startsWith(href))

          return (
            <Link
              key={href}
              href={href}
              aria-current={isActive ? 'page' : undefined}
              aria-label={label}
              className="flex flex-col items-center justify-center gap-0.5 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
            >
              <span
                className={cn(
                  'flex flex-col items-center gap-0.5 rounded-sm px-4 py-1',
                  isActive
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground'
                )}
              >
                <Icon
                  className="size-5"
                  strokeWidth={isActive ? 2.25 : 1.75}
                  aria-hidden="true"
                />
                <span className={cn('text-[11px] leading-none', isActive ? 'font-bold' : 'font-medium')}>
                  {label}
                </span>
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
