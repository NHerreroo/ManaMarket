<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Scanner</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="camera-container">
        <!-- Vista previa de la cámara -->
        <video 
          ref="videoRef" 
          class="camera-preview" 
          autoplay 
          playsinline
          :class="{ 'camera-active': isCameraActive }"
        ></video>

        <!-- Overlay para el scanner -->
        <div class="scan-overlay">
          <div class="scan-area"></div>
        </div>

        <!-- Mensaje de error de permisos -->
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent 
} from '@ionic/vue';

const videoRef = ref<HTMLVideoElement | null>(null);
const isCameraActive = ref(false);
const errorMessage = ref('');

// Iniciar la cámara
const startCamera = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'environment', // Usar cámara trasera
        width: { ideal: 1920 },
        height: { ideal: 1080 }
      },
      audio: false
    });

    if (videoRef.value) {
      videoRef.value.srcObject = stream;
      isCameraActive.value = true;
      errorMessage.value = '';
    }
  } catch (error) {
    console.error('Error accessing camera:', error);
    errorMessage.value = 'Please enable camera access to use the scanner';
  }
};

// Detener la cámara
const stopCamera = () => {
  if (videoRef.value && videoRef.value.srcObject) {
    const stream = videoRef.value.srcObject as MediaStream;
    const tracks = stream.getTracks();
    tracks.forEach(track => track.stop());
    videoRef.value.srcObject = null;
    isCameraActive.value = false;
  }
};

// Iniciar la cámara cuando se monta el componente
onMounted(() => {
  startCamera();
});

// Limpiar cuando se desmonta el componente
onUnmounted(() => {
  stopCamera();
});
</script>

<style scoped>
.camera-container {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #000;
  overflow: hidden;
}

.camera-preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scaleX(-1); /* Descomenta si necesitas espejo */
}

.scan-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.scan-area {
  width: 80%;
  height: 50%;
  border: 2px solid #E67E22;
  border-radius: 10px;
  box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5);
}

.error-message {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  max-width: 80%;
}

/* Animación cuando la cámara está activa */
.camera-active {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Asegurarse de que el contenido ocupe toda la pantalla */
ion-content {
  --background: #000;
}

ion-content::part(scroll) {
  display: flex;
  flex-direction: column;
}

/* Ajustes para la toolbar */
ion-toolbar {
  --background: transparent;
  --color: white;
}

/* Hacer la toolbar flotante sobre la cámara */
ion-header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
}

ion-header::after {
  display: none;
}
</style>