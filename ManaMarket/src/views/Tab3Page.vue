<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tab 3 🥇 Principal</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <!-- Componente de vista previa de la cámara -->
      <div id="camera-container" style="width: 100%; height: 100%;"></div>

      <ion-button @click="startCamera" router-link="/tabs/tab1/secundaria">Tab 3 🥈 Secundaria (RL)</ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/vue';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

const startCamera = async () => {
  try {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera, // Usamos la cámara del dispositivo
      quality: 100
    });
    
    // Mostrar la vista previa en el contenedor
    const cameraContainer = document.getElementById('camera-container');
    if (cameraContainer) {
      const cameraImage = document.createElement('img');
      cameraImage.src = photo.webPath!;
      cameraImage.style.width = '100%';
      cameraImage.style.height = '100%';
      cameraImage.style.objectFit = 'cover';
      cameraContainer.appendChild(cameraImage);
    }
  } catch (error) {
    console.error('Error al acceder a la cámara:', error);
  }
};
</script>


<style>
  ion-content {
    text-align: center;
    padding: 0;
    margin: 0;
    height: 100%;
  }

  ion-button {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
  }
</style>
