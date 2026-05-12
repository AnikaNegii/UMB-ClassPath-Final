'use client'

import { useState, useEffect, useCallback } from 'react'

export const STORAGE_KEYS = {
  ONBOARDED: 'classpath:onboarded',
  RECENT_SEARCHES: 'classpath:recent-searches',
  SAVED_ROUTES: 'classpath:saved-routes',
} as const

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue
    try {
      const item = window.localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // localStorage unavailable — silent fail in prototype
    }
  }, [key, value])

  return [value, setValue] as const
}

export function useSavedRoutes() {
  const [savedIds, setSavedIds] = useLocalStorage<string[]>(
    STORAGE_KEYS.SAVED_ROUTES,
    []
  )

  const save = useCallback(
    (roomId: string) => {
      setSavedIds(prev => (prev.includes(roomId) ? prev : [...prev, roomId]))
    },
    [setSavedIds]
  )

  const unsave = useCallback(
    (roomId: string) => {
      setSavedIds(prev => prev.filter(id => id !== roomId))
    },
    [setSavedIds]
  )

  const toggle = useCallback(
    (roomId: string) => {
      setSavedIds(prev =>
        prev.includes(roomId) ? prev.filter(id => id !== roomId) : [...prev, roomId]
      )
    },
    [setSavedIds]
  )

  const isSaved = useCallback(
    (roomId: string) => savedIds.includes(roomId),
    [savedIds]
  )

  return { savedIds, save, unsave, toggle, isSaved }
}

export function useRecentSearches() {
  const [recents, setRecents] = useLocalStorage<string[]>(
    STORAGE_KEYS.RECENT_SEARCHES,
    []
  )

  const addRecent = useCallback(
    (roomId: string) => {
      setRecents(prev => [roomId, ...prev.filter(id => id !== roomId)].slice(0, 5))
    },
    [setRecents]
  )

  const clearRecents = useCallback(() => setRecents([]), [setRecents])

  return { recents, addRecent, clearRecents }
}

export function useOnboarded() {
  const [onboarded, setOnboarded] = useLocalStorage<boolean>(
    STORAGE_KEYS.ONBOARDED,
    false
  )
  const markOnboarded = useCallback(() => setOnboarded(true), [setOnboarded])
  return { onboarded, markOnboarded }
}
