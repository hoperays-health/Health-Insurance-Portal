import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/api-client'
import { DashboardStats, RevenueData, ApiResponse } from '@/types'

// Query keys
export const dashboardKeys = {
  all: ['dashboard'] as const,
  stats: () => [...dashboardKeys.all, 'stats'] as const,
  revenue: (period: string) => [...dashboardKeys.all, 'revenue', period] as const,
}

// Fetch dashboard stats
export function useDashboardStats() {
  return useQuery({
    queryKey: dashboardKeys.stats(),
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<DashboardStats>>(
        '/dashboard/stats'
      )
      return response.data
    },
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  })
}

// Fetch revenue data
export function useRevenueData(period: 'monthly' | 'quarterly' | 'yearly' = 'monthly') {
  return useQuery({
    queryKey: dashboardKeys.revenue(period),
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<RevenueData>>(
        `/dashboard/revenue?period=${period}`
      )
      return response.data
    },
  })
}
