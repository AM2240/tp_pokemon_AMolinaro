import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { useStorage } from '../composables/useStorage.js'
import type { User } from '../types/index.js'

const storage = useStorage()

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(storage.get<string>('token'))
  const user = ref<User | null>(storage.get<User>('user'))

  const isAuthenticated = computed(() => !!token.value)

  function setAuth(newToken: string, newUser: User) {
    token.value = newToken
    user.value = newUser
    storage.set('token', newToken)
    storage.set('user', newUser)
  }

  function logout() {
    token.value = null
    user.value = null
    storage.remove('token', 'user')
  }

  return { token, user, isAuthenticated, setAuth, logout }
})
