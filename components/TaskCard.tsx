'use client'

import Link from 'next/link'
import { ChevronRight, type LucideIcon } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

const EASE_OUT = [0.22, 1, 0.36, 1] as const

interface TaskCardProps {
  href: string
  icon: LucideIcon
  title: string
  description: string
  index: number        // used to stagger entrance animation
}

export function TaskCard({ href, icon: Icon, title, description, index }: TaskCardProps) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        ease: EASE_OUT,
        duration: 0.28,
        delay: reduce ? 0 : 0.08 + index * 0.06,
      }}
    >
      <Link
        href={href}
        className={cn(
          'group flex items-center gap-4 rounded-md bg-card p-4',
          'border border-border shadow-sm',
          'transition-colors duration-[180ms]',
          'hover:border-primary/30 hover:bg-accent/30',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'active:scale-[0.98]'
        )}
      >
        {/* Icon container */}
        <span
          className="flex size-12 shrink-0 items-center justify-center rounded-sm bg-primary/8 text-primary"
          aria-hidden="true"
        >
          <Icon className="size-6" strokeWidth={1.75} />
        </span>

        {/* Text */}
        <div className="min-w-0 flex-1">
          <p className="font-heading text-[15px] font-semibold leading-snug text-foreground">
            {title}
          </p>
          <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
        </div>

        {/* Arrow */}
        <ChevronRight
          className="size-5 shrink-0 text-muted-foreground/60 transition-transform duration-[180ms] group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </Link>
    </motion.div>
  )
}
