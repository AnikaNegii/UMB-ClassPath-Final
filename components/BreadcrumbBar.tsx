import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface BreadcrumbItem {
  label: string
  href?: string // undefined means current page (no link)
}

interface BreadcrumbBarProps {
  items: BreadcrumbItem[]
  className?: string
}

export function BreadcrumbBar({ items, className }: BreadcrumbBarProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        'sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur-sm px-4 py-3',
        className
      )}
    >
      <ol className="flex flex-wrap items-center gap-1 text-sm" role="list">
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <li key={i} className="flex items-center gap-1" role="listitem">
              {i > 0 && (
                <ChevronRight
                  className="size-3.5 shrink-0 text-muted-foreground/50"
                  aria-hidden="true"
                />
              )}
              {isLast || !item.href ? (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  className={cn(
                    isLast
                      ? 'font-medium text-foreground'
                      : 'text-muted-foreground'
                  )}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-muted-foreground underline underline-offset-2 hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:rounded-sm"
                >
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
