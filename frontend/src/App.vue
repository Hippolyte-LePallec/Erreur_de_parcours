<script setup>
// Composant racine: affiche la barre de navigation et la vue courante
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue';
</script>

<template>
  <div>
    <!-- Barre de navigation principale -->
    <Navbar/>
    <!-- Zone d'affichage des pages (router) -->
    <RouterView/>
  </div>
</template>
