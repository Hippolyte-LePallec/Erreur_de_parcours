<template>
    <nav class="navbar-custom">
        <!-- Conteneur principal de la navbar -->
        <n-space justify="space-between" align="center" style="width: 100%">
            <!-- Liens de navigation à gauche -->
            <n-space align="center">
                <n-button class="nav-link-btn" text tag="a" @click="$router.push('/')">
                    <!-- Bouton Home avec icône -->
                    <template #icon>
                        <n-icon><HomeIcon /></n-icon>
                    </template>
                    Home
                </n-button>
                <n-button v-if="userEmail" class="nav-link-btn" text tag="a" @click="$router.push('/task')">
                    Tâches
                </n-button>
            </n-space>
            <!-- Actions de session à droite -->
            <n-space align="center">
                <template v-if="userEmail">
                    <!-- Affiche l'email de l'utilisateur -->
                    <span class="user-email">{{ userEmail }}</span>
                    <n-button text tag="a" @click="logout">Se déconnecter</n-button>
                </template>
                <template v-else>
                    <!-- Liens de connexion/inscription -->
                    <n-button class="nav-link-btn" text tag="a" @click="$router.push('/login')">
                        Se connecter
                    </n-button>
                    <n-button type="primary" @click="$router.push('/register')">
                        S'inscrire
                    </n-button>
                </template>
            </n-space>
        </n-space>
    </nav>
</template>

<script setup>
// Barre de navigation: affiche les liens selon la session
import { NSpace, NButton, NGradientText, NIcon } from 'naive-ui'
import { Home as HomeIcon } from '@vicons/ionicons5'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'


const userEmail = ref(localStorage.getItem('userEmail') || '')
const router = useRouter()

function updateUserEmail() {
    // Synchronise l'email depuis le localStorage
    userEmail.value = localStorage.getItem('userEmail') || ''
}

// Met à jour userEmail si le localStorage change (autre onglet)
window.addEventListener('storage', updateUserEmail)

// Met à jour userEmail si un event custom est émis (login/logout)
onMounted(() => {
    // Écoute l'évènement custom émis après login/logout
    window.addEventListener('user-session-changed', updateUserEmail)
})
onBeforeUnmount(() => {
    window.removeEventListener('user-session-changed', updateUserEmail)
    window.removeEventListener('storage', updateUserEmail)
})

function logout() {
    // Efface la session et redirige
    localStorage.removeItem('token')
    localStorage.removeItem('userEmail')
    userEmail.value = ''
    window.dispatchEvent(new Event('user-session-changed'))
    router.push('/login')
}
</script>

