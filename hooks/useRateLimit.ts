"use client"

import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'haikuSubmissions'
const MAX_SUBMISSIONS = 3
const WINDOW_MS = 24 * 60 * 60 * 1000 // 24 hours

interface SubmissionData {
  count: number
  firstSubmission: number
}

export function useRateLimit() {
  const [submissionsRemaining, setSubmissionsRemaining] = useState(MAX_SUBMISSIONS)

  const getStoredData = useCallback((): SubmissionData | null => {
    if (typeof window === 'undefined') return null

    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return null

    try {
      return JSON.parse(stored) as SubmissionData
    } catch {
      return null
    }
  }, [])

  const isWindowExpired = useCallback((data: SubmissionData): boolean => {
    return Date.now() - data.firstSubmission >= WINDOW_MS
  }, [])

  const updateSubmissionsRemaining = useCallback(() => {
    const data = getStoredData()

    if (!data || isWindowExpired(data)) {
      setSubmissionsRemaining(MAX_SUBMISSIONS)
      return
    }

    setSubmissionsRemaining(Math.max(0, MAX_SUBMISSIONS - data.count))
  }, [getStoredData, isWindowExpired])

  useEffect(() => {
    updateSubmissionsRemaining()
  }, [updateSubmissionsRemaining])

  const canSubmit = useCallback((): boolean => {
    const data = getStoredData()

    if (!data || isWindowExpired(data)) {
      return true
    }

    return data.count < MAX_SUBMISSIONS
  }, [getStoredData, isWindowExpired])

  const recordSubmission = useCallback((): void => {
    if (typeof window === 'undefined') return

    const data = getStoredData()
    const now = Date.now()

    if (!data || isWindowExpired(data)) {
      const newData: SubmissionData = {
        count: 1,
        firstSubmission: now
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData))
    } else {
      const updatedData: SubmissionData = {
        count: data.count + 1,
        firstSubmission: data.firstSubmission
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData))
    }

    updateSubmissionsRemaining()
  }, [getStoredData, isWindowExpired, updateSubmissionsRemaining])

  const getSubmissionsRemaining = useCallback((): number => {
    const data = getStoredData()

    if (!data || isWindowExpired(data)) {
      return MAX_SUBMISSIONS
    }

    return Math.max(0, MAX_SUBMISSIONS - data.count)
  }, [getStoredData, isWindowExpired])

  return {
    canSubmit,
    recordSubmission,
    getSubmissionsRemaining,
    submissionsRemaining
  }
}
