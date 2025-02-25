<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/tabs/tab1">
          <ion-icon aria-hidden="true" :icon="homeOutline" />
          <ion-label>Tab 1</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab2" href="/tabs/tab2">
          <ion-icon aria-hidden="true" :icon="searchOutline" />
          <ion-label>Tab 2</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab3" href="/tabs/tab3">
          <ion-icon aria-hidden="true" :icon="fileTrayStackedOutline"></ion-icon>
          <ion-label>Tab 3</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab4" href="/tabs/tab4">
          <ion-icon aria-hidden="true" :icon="cartOutline"></ion-icon>
          <ion-label>Tab 4</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab5" href="/tabs/tab5">
          <ion-icon aria-hidden="true" :icon="cameraOutline"></ion-icon>
          <ion-label>Tab 5</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { 
  IonTabBar, 
  IonTabButton, 
  IonTabs, 
  IonLabel, 
  IonIcon, 
  IonPage, 
  IonRouterOutlet 
} from '@ionic/vue';

import { homeOutline, searchOutline, fileTrayStackedOutline, cameraOutline, cartOutline } from 'ionicons/icons';
</script>

<style>
/* Color del ícono y texto cuando el tab está seleccionado */
ion-tab-button.tab-selected {
  color: #E67E22;
}

/* Color del ícono y texto cuando el tab está seleccionado (para iOS) */
.ios ion-tab-button.tab-selected ion-icon,
.ios ion-tab-button.tab-selected ion-label {
  color: #E67E22;
}

/* Color del ícono y texto cuando el tab está seleccionado (para Material Design) */
.md ion-tab-button.tab-selected ion-icon,
.md ion-tab-button.tab-selected ion-label {
  color: #E67E22;
}
</style>