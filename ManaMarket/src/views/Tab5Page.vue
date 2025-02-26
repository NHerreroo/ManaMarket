<template>
  <ion-page>
    <ion-content class="scanner-container" :scroll-y="!isScanning">
      <HeaderLogo></HeaderLogo>
      <!-- Main content when not scanning -->
      <div v-if="!isScanning" class="welcome-container">
        <div class="content-box">
          <h1 class="title">Escáner de Cartas</h1>
          <p class="subtitle">Escanea tus cartas para descubrir su valor y características</p>
          
          <ion-button 
            @click="startScanning" 
            class="scan-button"
            expand="block"
            :class="{ 'button-disabled': !isSupported }"
          >
            <ion-icon :icon="scan" slot="start"></ion-icon>
            Iniciar Escaneo
          </ion-button>
        </div>
      </div>

      <!-- Camera view when scanning -->
      <div v-if="isScanning" class="camera-view">
        <video 
          v-if="isSupported" 
          ref="videoElement" 
          autoplay 
          playsinline 
          class="camera-preview"
        ></video>

        <!-- Scanner overlay -->
        <div v-if="scannerOverlayVisible" class="scanner-overlay">
          <div class="scan-area">
            <div class="corner-tl"></div>
            <div class="corner-tr"></div>
            <div class="corner-bl"></div>
            <div class="corner-br"></div>
          </div>
          
          <ion-button 
            @click="stopScanning" 
            class="close-button"
            fill="clear"
          >
            <ion-icon :icon="close" slot="icon-only"></ion-icon>
          </ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonContent,
  IonButton,
  IonIcon,
  alertController,
  onIonViewWillLeave, // Hook de Ionic para cuando la vista está a punto de ser abandonada
} from "@ionic/vue";

import { BarcodeScanner } from "@capacitor-mlkit/barcode-scanning";
import { scan, close } from "ionicons/icons";
import { onMounted, ref } from "vue";
import { Capacitor } from "@capacitor/core";
import HeaderLogo from "@/components/HeaderLogo.vue";


const isSupported = ref(false);
const isScanning = ref(false);
const videoElement = ref<HTMLVideoElement | null>(null);
const scannerOverlayVisible = ref(false);

onMounted(async () => {
  if (Capacitor.isNativePlatform()) {
    const { supported } = await BarcodeScanner.isSupported();
    isSupported.value = supported;

    if (!isSupported.value) {
      presentAlert("Error", "Barcode Scanner is not supported on this device.");
    }
  } else {
    isSupported.value = true; // Asumimos que la web es compatible
  }
});

// Reiniciar el estado cuando la vista está a punto de ser abandonada
onIonViewWillLeave(() => {
  isScanning.value = false; // Reiniciar el estado de escaneo
  stopCamera(); // Detener la cámara si está activa
});

const startScanning = async () => {
  isScanning.value = true;
  scannerOverlayVisible.value = true;

  if (Capacitor.isNativePlatform()) {
    const granted = await requestPermissions();
    if (!granted) {
      presentAlert("Permission denied", "Please grant camera permission to use the barcode scanner.");
      return;
    }

    try {
      const { barcodes } = await BarcodeScanner.scan();
      if (barcodes.length > 0) {
        // Aquí puedes manejar los códigos escaneados si es necesario
        console.log("Barcodes scanned:", barcodes);
      }
    } catch (error) {
      console.error("Error scanning barcode:", error);
      presentAlert("Scan Error", "There was an issue scanning the barcode.");
    }
  } else {
    // Verificar si el contexto es seguro (https o localhost)
    if (!isSecureContext()) {
      presentAlert("Insecure Context", "Camera access is only allowed in secure contexts (https or localhost).");
      return;
    }

    // Usar la API de getUserMedia para la web
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });

      // Asignar el flujo de video al elemento <video>
      if (videoElement.value) {
        videoElement.value.srcObject = stream;
        videoElement.value.play();
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      presentAlert("Camera Error", "There was an issue accessing the camera.");
    }
  }
};

const stopCamera = () => {
  if (videoElement.value && videoElement.value.srcObject) {
    const stream = videoElement.value.srcObject as MediaStream;
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop()); // Detener todas las pistas de la cámara
    videoElement.value.srcObject = null; // Limpiar la referencia
  }
};


const stopScanning = () => {
  isScanning.value = false;
  scannerOverlayVisible.value = false;
  stopCamera();
};

const requestPermissions = async () => {
  const { camera } = await BarcodeScanner.requestPermissions();
  return camera === "granted" || camera === "limited";
};

const presentAlert = async (hdr: string, msg: string) => {
  const alert = await alertController.create({
    header: hdr,
    message: msg,
    buttons: ["OK"],
  });
  await alert.present();
};

// Función para verificar si el contexto es seguro
const isSecureContext = () => {
  return window.isSecureContext;
};
</script>

<style scoped>
.scanner-container {
  --background: #121212;
  height: 100vh;
}

.welcome-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.content-box {
  background: #2a2a2a;
  border-radius: 1.5rem;
  padding: 2rem;
  width: 100%;
  max-width: 500px;
  text-align: center;
}

.title {
  color: white;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.subtitle {
  color: #999;
  margin-bottom: 2rem;
  line-height: 1.5;
}

.scan-button {
  --background: #E67E22;
  --background-hover: #d35400;
  --border-radius: 0.5rem;
  font-weight: 500;
  margin-top: 1rem;
  height: 48px;
}

.button-disabled {
  opacity: 0.5;
  pointer-events: none;
}

.camera-view {
  position: relative;
  height: 100%;
  background: black;
}

.camera-preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.scanner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.scan-area {
  width: 80%;
  height: 50%;
  max-width: 300px;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
}

.corner-tl, .corner-tr, .corner-bl, .corner-br {
  position: absolute;
  width: 20px;
  height: 20px;
  border: 2px solid #E67E22;
}

.corner-tl {
  top: 0;
  left: 0;
  border-right: 0;
  border-bottom: 0;
}

.corner-tr {
  top: 0;
  right: 0;
  border-left: 0;
  border-bottom: 0;
}

.corner-bl {
  bottom: 0;
  left: 0;
  border-right: 0;
  border-top: 0;
}

.corner-br {
  bottom: 0;
  right: 0;
  border-left: 0;
  border-top: 0;
}

.close-button {
  position: absolute;
  top: 5rem;
  right: 1rem;
  --color: white;
  --background: rgba(0, 0, 0, 0.5);
  --border-radius: 50%;
  width: 48px;
  height: 48px;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.scan-area::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 2px solid rgba(230, 126, 34, 0.5);
  border-radius: 20px;
  animation: pulse 2s infinite;
}
</style>