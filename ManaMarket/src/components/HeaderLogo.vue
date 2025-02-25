<script setup lang="ts">
import { IonHeader, IonToolbar } from '@ionic/vue';
import LogoIcon from './Logo-icon.vue';
</script>

<template>
  <IonHeader class="small-header">
    <IonToolbar class="compact-toolbar">
      <div class="header-content">
        <LogoIcon class="small-logo" />
      </div>
    </IonToolbar>
  </IonHeader>
</template>

<style scoped>
.small-header {
  height: 30px; /* Reducir la altura del header */
}

.compact-toolbar {
  min-height: 40px; /* Ajustar altura del toolbar */
  padding: 0.25rem 1; /* Reducir padding superior e inferior */
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 0.5rem; /* Reducir espacio superior */
  margin-bottom: -6rem; /* Ajustar margen inferior */
}

.small-logo {
  width: 10px; /* Reducir el tamaño del logo */
  height: 10px;
  margin-bottom: 5.5rem;
}
</style>
