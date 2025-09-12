import { useState, useMemo } from 'react'

export interface UsePaginationProps {
  totalItems: number
  itemsPerPage?: number
  initialPage?: number
}

export function usePagination({
  totalItems,
  itemsPerPage = 10,
  initialPage = 1,
}: UsePaginationProps) {
  const [currentPage, setCurrentPage] = useState(initialPage)

  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems)

  const pagination = useMemo(() => ({
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    startIndex,
    endIndex,
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1,
    canGoNext: currentPage < totalPages,
    canGoPrev: currentPage > 1,
  }), [currentPage, totalPages, totalItems, itemsPerPage, startIndex, endIndex])

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const goToFirst = () => {
    setCurrentPage(1)
  }

  const goToLast = () => {
    setCurrentPage(totalPages)
  }

  const reset = () => {
    setCurrentPage(1)
  }

  return {
    ...pagination,
    goToPage,
    nextPage,
    prevPage,
    goToFirst,
    goToLast,
    reset,
  }
}
