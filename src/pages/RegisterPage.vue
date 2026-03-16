<script setup lang="ts">
import { useMessage } from 'naive-ui'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { useApi } from '../composables/useApi.js'
import { ROUTES } from '../constants/routes.js'
import { useAuthStore } from '../stores/auth.js'

const router = useRouter()
const message = useMessage()
const auth = useAuthStore()
const api = useApi()

const username = ref('')
const email = ref('')
const password = ref('')
const loading = ref(false)

async function handleRegister() {
  if (!username.value || !email.value || !password.value) {
    message.warning('Veuillez remplir tous les champs')
    return
  }

  loading.value = true
  try {
    const res = await api.signUp({
      username: username.value,
      email: email.value,
      password: password.value,
    })
    auth.setAuth(res.token, res.user)
    router.push(ROUTES.HOME)
  } catch (err: unknown) {
    message.error(
      err instanceof Error ? err.message : "Erreur lors de l'inscription",
    )
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="auth-page">
    <div class="auth-card">
      <h1 class="auth-title">Inscription</h1>

      <NSpace vertical :size="20">
        <NFormItem label="Nom d'utilisateur" :show-feedback="false">
          <NInput
            v-model:value="username"
            type="text"
            placeholder="Dresseur42"
            size="large"
            @keyup.enter="handleRegister"
          />
        </NFormItem>

        <NFormItem label="Email" :show-feedback="false">
          <NInput
            v-model:value="email"
            type="text"
            placeholder="votre@email.com"
            size="large"
            @keyup.enter="handleRegister"
          />
        </NFormItem>

        <NFormItem label="Mot de passe" :show-feedback="false">
          <NInput
            v-model:value="password"
            type="password"
            placeholder="••••••••"
            size="large"
            show-password-on="click"
            @keyup.enter="handleRegister"
          />
        </NFormItem>

        <NButton
          color="#18a058"
          size="large"
          block
          :loading="loading"
          @click="handleRegister"
        >
          S'inscrire
        </NButton>

        <p class="auth-link">
          Déjà un compte ?
          <RouterLink :to="ROUTES.LOGIN">Se connecter</RouterLink>
        </p>
      </NSpace>
    </div>
  </div>
</template>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  padding: 24px;
}

.auth-card {
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 40px 36px;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.auth-title {
  font-size: 1.6rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 28px;
}

.auth-link {
  text-align: center;
  color: #667;
  font-size: 0.875rem;
  margin: 0;
}

.auth-link a {
  color: #18a058;
  text-decoration: none;
}

.auth-link a:hover {
  text-decoration: underline;
}
</style>
