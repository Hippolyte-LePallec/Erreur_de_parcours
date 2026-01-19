<template>
	<section class="page-hero">
		<div class="container py-5">
			<div class="row align-items-center g-4">
				<div class="col-12 col-lg-6">
                    <!-- Message d'accueil + CTA -->
					<n-space vertical size="large">
						<n-tag type="success" round size="large">Plateforme collaborative</n-tag>
						<h1 class="display-5 fw-bold mb-0">
							Bienvenue sur <span class="text-gradient">Erreur de Parcours</span>
						</h1>
						<p class="lead text-muted mb-0">
							Planifiez, priorisez et suivez vos tâches en équipe pour rester concentré sur vos objectifs universitaires.
						</p>
						<n-space size="large" align="center">
                            <!-- Boutons conditionnels selon la session -->
							<RouterLink to="/register" v-if="!userEmail" class="text-decoration-none">
								<n-button type="primary" size="large">Commencer maintenant</n-button>
							</RouterLink>
							<RouterLink to="/login" v-if="!userEmail" class="text-decoration-none">
								<n-button size="large">Se connecter</n-button>
							</RouterLink>
							<RouterLink to="/task" v-else class="text-decoration-none">
								<n-button type="primary" size="large">Accéder à mes tâches</n-button>
							</RouterLink>
						</n-space>
						<n-alert v-if="userEmail" type="success" :show-icon="true">
							Vous êtes connecté en tant que <strong>{{ userEmail }}</strong>.
						</n-alert>
					</n-space>
				</div>
				<div class="col-12 col-lg-6" v-if="userEmail">
                    <!-- Carte résumé pour l'utilisateur connecté -->
					<n-card size="large" class="shadow-lg">
						<n-space vertical size="large">
							<h2 class="h4 fw-bold mb-0">Un tableau de bord clair</h2>
							<p class="text-muted mb-0">
								Centralisez les tâches, suivez l’avancement et partagez les responsabilités.
							</p>
							<n-divider />
							<div class="row g-3">
								<div class="col-6">
									<n-statistic label="Tâches créées" :value="tasks.length" />
								</div>
								<div class="col-6">
									<n-statistic label="Tâches terminées" :value="doneCount" />
								</div>
							</div>
							<n-button secondary size="large" @click="$router.push('/task')">
								Ajouter maintenant des tâches
							</n-button>
						</n-space>
					</n-card>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
// Vue d'accueil: affiche CTA et stats selon l'état de session
import { ref, onMounted, computed, onBeforeUnmount } from 'vue'
import { NSpace, NTag, NButton, NAlert, NCard, NDivider, NStatistic } from 'naive-ui'

const userEmail = ref('')
const tasks = ref([])
const doneCount = computed(() => tasks.value.filter(task => task.done).length)

function getToken() {
	return localStorage.getItem('token') || ''
}

async function fetchTasks() {
	if (!getToken()) {
		tasks.value = []
		return
	}
	try {
		const res = await fetch('/api/tasks', {
			headers: { 'Authorization': 'Bearer ' + getToken() }
		})
		const data = await res.json()
		if (res.status === 200) {
			tasks.value = data.tasks || []
		} else {
			tasks.value = []
		}
	} catch (_e) {
		tasks.value = []
	}
}

function updateUserSession() {
	userEmail.value = localStorage.getItem('userEmail') || ''
	if (userEmail.value) {
		fetchTasks()
	} else {
		tasks.value = []
	}
}

onMounted(() => {
	// Récupère l'email depuis le stockage local
	updateUserSession()
	window.addEventListener('user-session-changed', updateUserSession)
})

onBeforeUnmount(() => {
	window.removeEventListener('user-session-changed', updateUserSession)
})
</script>
