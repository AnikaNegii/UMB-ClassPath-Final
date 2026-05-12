'use client'

import { useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

const EASE_OUT = [0.22, 1, 0.36, 1] as const

interface BottomSheetProps {
  open: boolean
  onClose: () => void
  title: string        // required — used as aria-label
  children: React.ReactNode
  className?: string
}

export function BottomSheet({ open, onClose, title, children, className }: BottomSheetProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)
  const reduce = useReducedMotion()

  // Remember the element that opened the sheet so we can return focus
  useEffect(() => {
    if (open) {
      triggerRef.current = document.activeElement as HTMLElement
      setTimeout(() => panelRef.current?.focus(), 10)
    } else {
      triggerRef.current?.focus()
    }
  }, [open])

  // Escape + Tab trap
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!open) return
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key !== 'Tab') return
      const panel = panelRef.current
      if (!panel) return
      const focusables = Array.from(
        panel.querySelectorAll<HTMLElement>(
          'button:not([disabled]),[href],input:not([disabled]),[tabindex]:not([tabindex="-1"])'
        )
      )
      if (focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    },
    [open, onClose]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.18 }}
            className="fixed inset-0 z-40 bg-black/40"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            key="panel"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            tabIndex={-1}
            initial={reduce ? false : { y: '100%' }}
            animate={{ y: 0 }}
            exit={reduce ? {} : { y: '100%' }}
            transition={{ ease: EASE_OUT, duration: reduce ? 0 : 0.48 }}
            className={cn(
              'fixed inset-x-0 bottom-0 z-50 rounded-t-xl bg-card pb-safe outline-none',
              className
            )}
          >
            {/* Drag handle (visual only) */}
            <div className="mx-auto mt-3 h-1 w-10 rounded-full bg-border" aria-hidden="true" />
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
