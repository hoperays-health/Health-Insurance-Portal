import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/lib/api-client'
import { User, ApiResponse } from '@/types'
import { useUserStore } from '@/store'

// Query keys
export const userKeys = {
  all: ['user'] as const,
  detail: (id: string) => [...userKeys.all, id] as const,
  current: () => [...userKeys.all, 'current'] as const,
}

// Fetch current user
export function useCurrentUser() {
  return useQuery({
    queryKey: userKeys.current(),
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<User>>('/user/me')
      return response.data
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Update user profile
export function useUpdateUser() {
  const queryClient = useQueryClient()
  const updateUser = useUserStore((state) => state.updateUser)

  return useMutation({
    mutationFn: async (userData: Partial<User>) => {
      const response = await apiClient.patch<ApiResponse<User>>(
        '/user/me',
        userData
      )
      return response.data
    },
    onSuccess: (data) => {
      // Update the query cache
      queryClient.setQueryData(userKeys.current(), data)
      // Update Zustand store
      updateUser(data)
    },
  })
}

// Delete user account
export function useDeleteUser() {
  const queryClient = useQueryClient()
  const logout = useUserStore((state) => state.logout)

  return useMutation({
    mutationFn: async () => {
      await apiClient.delete('/user/me')
    },
    onSuccess: () => {
      // Clear all queries
      queryClient.clear()
      // Logout user
      logout()
    },
  })
}
