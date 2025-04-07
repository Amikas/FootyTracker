'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function ExportButton() {
  const [isLoading, setIsLoading] = useState(false)

  const handleExportCSV = async () => {
    if (isLoading) return
    
    setIsLoading(true)
    try {
      const response = await fetch('/api/export')
      if (!response.ok) throw new Error('Export failed')
      
      const result = await response.json()
      if (!result.success) throw new Error(result.error || 'Export failed')
      
      // Convert to CSV
      const csv = convertToCSV(result.data)
      
      // Create download
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `footy-tracker-export-${new Date().toISOString().split('T')[0]}.csv`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      
      alert('Export successful!')
    } catch (error) {
      console.error('Export error:', error)
      alert('Export failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleExportCSV}
      disabled={isLoading}
      variant="outline"
      size="sm"
    >
      {isLoading ? 'Exporting...' : 'Export CSV'}
    </Button>
  )
}

// Helper function to convert data to CSV
function convertToCSV(data) {
  if (!data || !data.length) return ''
  
  const headers = Object.keys(data[0])
  const csvRows = [
    headers.join(','), // header row
    ...data.map(row => {
      return headers.map(field => {
        const value = row[field]
        // Handle special cases (strings with commas, etc.)
        return typeof value === 'string' && value.includes(',') 
          ? `"${value.replace(/"/g, '""')}"` 
          : value
      }).join(',')
    })
  ]
  
  return csvRows.join('\n')
}