import { toast } from 'sonner'
import {
  getCurrentUser,
  login as loginService,
  logout as logoutService,
} from './actions'
import type { LoginPayload } from '@/types/auth'
import type { User } from '@/types/user'
import { createState } from '@/integrations/state/create-state'

export function useAuth() {
  const useAuthStatusState = createState<User>({
    key: ['auth-status-state'],
    resolver: getCurrentUser,
  })

  const {
    data: user,
    reset: resetUser,
    set: setUser,
    isLoading,
  } = useAuthStatusState()

  return {
    user,
    isLoading,
    login: async (payload: LoginPayload) => {
      await loginService(payload)
      resetUser()
    },
    logout: async () => {
      await logoutService()
      setUser(null)
      toast.success('Logged out successfully')
    },
  }
}
