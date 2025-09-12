import { useState, useMemo } from 'react'
import { useDebounce } from './useDebounce'

export interface UseSearchProps<T> {
  data: T[]
  searchFields: string[]
  initialQuery?: string
  debounceDelay?: number
}

export function useSearch<T extends Record<string, any>>({
  data,
  searchFields,
  initialQuery = '',
  debounceDelay = 300,
}: UseSearchProps<T>) {
  const [query, setQuery] = useState(initialQuery)
  const debouncedQuery = useDebounce(query, debounceDelay)

  const filteredData = useMemo(() => {
    if (!debouncedQuery.trim()) {
      return data
    }

    const searchTerm = debouncedQuery.toLowerCase()
    
    return data.filter((item) =>
      searchFields.some((field) => {
        const value = getNestedValue(item, field as string)
        if (typeof value === 'string') {
          return value.toLowerCase().includes(searchTerm)
        }
        if (typeof value === 'number') {
          return String(value).includes(searchTerm)
        }
        return false
      })
    )
  }, [data, searchFields, debouncedQuery])

  const getNestedValue = (obj: Record<string, any>, path: string): any => {
    return path.split('.').reduce((current, key) => {
      if (current && typeof current === 'object' && key in current) {
        return (current as Record<string, any>)[key]
      }
      return undefined
    }, obj as unknown)
  }

  const clearSearch = () => {
    setQuery('')
  }

  const setSearchQuery = (newQuery: string) => {
    setQuery(newQuery)
  }

  return {
    query,
    setQuery: setSearchQuery,
    debouncedQuery,
    filteredData,
    clearSearch,
    isSearching: query !== debouncedQuery,
    hasResults: filteredData.length > 0,
    resultCount: filteredData.length,
  }
}
