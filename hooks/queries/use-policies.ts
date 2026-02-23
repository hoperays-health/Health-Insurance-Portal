import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/lib/api-client'
import { Policy, ApiResponse, PaginatedResponse } from '@/types'

// Query keys
export const policyKeys = {
  all: ['policies'] as const,
  lists: () => [...policyKeys.all, 'list'] as const,
  list: (filters: string) => [...policyKeys.lists(), filters] as const,
  details: () => [...policyKeys.all, 'detail'] as const,
  detail: (id: string) => [...policyKeys.details(), id] as const,
}

interface PoliciesFilters {
  page?: number
  pageSize?: number
  status?: Policy['status']
  type?: Policy['type']
  search?: string
}

// Fetch all policies with pagination
export function usePolicies(filters: PoliciesFilters = {}) {
  const queryString = new URLSearchParams(
    Object.entries(filters).reduce((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value)
      }
      return acc
    }, {} as Record<string, string>)
  ).toString()

  return useQuery({
    queryKey: policyKeys.list(queryString),
    queryFn: async () => {
      const response = await apiClient.get<PaginatedResponse<Policy>>(
        `/policies?${queryString}`
      )
      return response
    },
  })
}

// Fetch single policy
export function usePolicy(id: string) {
  return useQuery({
    queryKey: policyKeys.detail(id),
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<Policy>>(`/policies/${id}`)
      return response.data
    },
    enabled: !!id,
  })
}

// Create new policy
export function useCreatePolicy() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (policyData: Omit<Policy, 'id'>) => {
      const response = await apiClient.post<ApiResponse<Policy>>(
        '/policies',
        policyData
      )
      return response.data
    },
    onSuccess: () => {
      // Invalidate policies list
      queryClient.invalidateQueries({ queryKey: policyKeys.lists() })
    },
  })
}

// Update policy
export function useUpdatePolicy(id: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (policyData: Partial<Policy>) => {
      const response = await apiClient.patch<ApiResponse<Policy>>(
        `/policies/${id}`,
        policyData
      )
      return response.data
    },
    onSuccess: (data) => {
      // Update the specific policy in cache
      queryClient.setQueryData(policyKeys.detail(id), data)
      // Invalidate the list to refetch
      queryClient.invalidateQueries({ queryKey: policyKeys.lists() })
    },
  })
}

// Delete policy
export function useDeletePolicy() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/policies/${id}`)
      return id
    },
    onSuccess: (id) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: policyKeys.detail(id) })
      // Invalidate the list
      queryClient.invalidateQueries({ queryKey: policyKeys.lists() })
    },
  })
}
