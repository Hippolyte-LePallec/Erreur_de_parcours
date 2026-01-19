<template>
  <section class="auth-page">
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-12 col-lg-10">
          <div class="row g-4 align-items-stretch">
            <div class="col-12 col-lg-6 order-lg-2">
              <!-- Carte informative à droite -->
              <n-card size="large" class="h-100 auth-card">
                <n-space vertical size="large">
                  <n-tag type="info" round size="large">Sécurité</n-tag>
                  <h1 class="display-6 fw-bold mb-0">Réinitialisation</h1>
                  <p class="text-muted mb-0">
                    Choisissez un nouveau mot de passe sécurisé pour votre compte.
                  </p>
                  <n-alert v-if="error" type="error" :show-icon="true">
                    {{ error }}
                  </n-alert>
                  <n-alert v-if="success" type="success" :show-icon="true">
                    Votre mot de passe a été réinitialisé avec succès.
                  </n-alert>
                  <n-space align="center" size="small">
                    <span class="text-muted">Vous vous souvenez de votre mot de passe ?</span>
                    <RouterLink to="/login">Se connecter</RouterLink>
                  </n-space>
                </n-space>
              </n-card>
            </div>
            <div class="col-12 col-lg-6 order-lg-1">
              <!-- Formulaire de réinitialisation -->
              <n-card size="large" class="shadow-lg">
                <form @submit.prevent="handleReset" @click="console.log('Form clicked')">
                  <n-form>
                    <n-form-item label="Email">
                      <n-input
                        v-model:value="email"
                        type="email"
                        placeholder="votre@email.com"
                        autocomplete="email"
                        :disabled="loading"
                      />
                    </n-form-item>
                    <n-form-item label="Nouveau mot de passe">
                      <n-input
                        v-model:value="password"
                        type="password"
                        show-password-on="mousedown"
                        placeholder="6 caractères minimum"
                        autocomplete="new-password"
                        :disabled="loading"
                      />
                    </n-form-item>
                    <n-form-item label="Confirmer le mot de passe">
                      <n-input
                        v-model:value="confirmPassword"
                        type="password"
                        show-password-on="mousedown"
                        placeholder="Retapez votre mot de passe"
                        autocomplete="new-password"
                        :disabled="loading"
                      />
                    </n-form-item>
                    <n-button
                      type="primary"
                      block
                      size="large"
                      @click="handleReset"
                      :loading="loading"
                    >
                      Réinitialiser le mot de passe
                    </n-button>
                  </n-form>
                </form>
                <div class="mt-3 text-center text-muted">
                  <RouterLink to="/login">
                    <n-button text>
                      <template #icon>
                        <n-icon>
                          <arrow-back-icon />
                        </n-icon>
                      </template>
                      Retour à la connexion
                    </n-button>
                  </RouterLink>
                </div>
              </n-card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { NCard, NForm, NFormItem, NInput, NButton, NSpace, NTag, NAlert, NIcon } from 'naive-ui'
import { ArrowBack as ArrowBackIcon } from '@vicons/ionicons5'

const router = useRouter()
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const success = ref(false)
const loading = ref(false)

const isFormValid = computed(() => {
  return (
    email.value &&
    password.value &&
    confirmPassword.value &&
    password.value === confirmPassword.value &&
    password.value.length >= 6
  )
})

async function handleReset() {
  console.log('handleReset appelé')
  
  if (!isFormValid.value) {
    error.value = 'Veuillez remplir tous les champs correctement.'
    console.log('Formulaire invalide')
    return
  }

  error.value = ''
  loading.value = true
  console.log('Envoi de la requête...', {
    email: email.value,
    password: password.value
  })

  try {
    const response = await fetch('/api/users/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    })

    console.log('Réponse reçue:', response)
    
    let data
    try {
      data = await response.json()
      console.log('Données de la réponse:', data)
    } catch (parseError) {
      console.error('Erreur lors de l\'analyse de la réponse:', parseError)
      throw new Error('Réponse du serveur invalide')
    }

    if (!response.ok) {
      throw new Error(data.message || `Erreur HTTP ${response.status}`)
    }

    console.log('Réinitialisation réussie')
    success.value = true
    
    setTimeout(() => {
      router.push('/login')
    }, 2000)

  } catch (err) {
    console.error('Erreur lors de la réinitialisation:', err)
    error.value = err.message || 'Une erreur est survenue. Veuillez réessayer.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>

.mt-3 {
  margin-top: 1rem;
}

.text-center {
  text-align: center;
}

/* Style pour les cartes sur mobile */
@media (max-width: 991.98px) {
  .order-lg-1 {
    order: 2;
  }
  .order-lg-2 {
    order: 1;
    margin-bottom: 1.5rem;
  }
}
</style>