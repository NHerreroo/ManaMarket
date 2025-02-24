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
import { scan } from "ionicons/icons";
import { onMounted, ref } from "vue";
import { Capacitor } from "@capacitor/core";

const isSupported = ref(false);
const isScanning = ref(false); // Estado para controlar si se está escaneando
const videoElement = ref<HTMLVideoElement | null>(null); // Referencia al elemento de video

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
  isScanning.value = true; // Activar el modo de escaneo

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

<template>
  <ion-page>
    <ion-content class="camera-container" :scroll-y="!isScanning"> <!-- Desactivar scroll cuando se está escaneando -->
      <!-- Mostrar mensaje y botón si no se está escaneando -->
      <div v-if="!isScanning" class="scan-prompt">
        <h1>¡Escanea tus cartas y sácales partido!</h1>
        <ion-button @click="startScanning" expand="block">
          <ion-icon :icon="scan" slot="start"></ion-icon>
          Escanear
        </ion-button>
      </div>

      <!-- Mostrar la cámara cuando se esté escaneando -->
      <video v-if="isScanning && isSupported" ref="videoElement" autoplay playsinline class="camera-preview"></video>
    </ion-content>
  </ion-page>
</template>

<style scoped>
.camera-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Ocupa toda la altura de la pantalla */
  overflow: hidden; /* Evita el desplazamiento */
  background: black; /* Fondo negro para áreas no cubiertas por la cámara */
}

.scan-prompt {
  text-align: center;
  color: white;
  padding: 20px;
}

.camera-preview {
  width: 100%; /* Ocupa todo el ancho disponible */
  height: 100vh; /* Ocupa toda la altura de la pantalla */
  object-fit: cover; /* Asegura que el video cubra toda el área sin distorsionar */
}
</style>