// Store Pinia d'exemple: compteur et double
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  // Valeur du compteur
  const count = ref(0)
  // Valeur dérivée
  const doubleCount = computed(() => count.value * 2)
  // Incrémente le compteur
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
