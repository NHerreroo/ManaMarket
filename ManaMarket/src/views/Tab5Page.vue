<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Scanner</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="camera-container">
        <!-- Botón para iniciar el escaneo -->
        <ion-button @click="startScan">Start Scan</ion-button>

        <!-- Mostrar el resultado del escaneo -->
        <div v-if="scannedBarcode" class="scan-result">
          Scanned Barcode: {{ scannedBarcode }}
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
import { ref } from 'vue';
import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent,
  IonButton
} from '@ionic/vue';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';

const scannedBarcode = ref('');
const errorMessage = ref('');

const startScan = async () => {
  try {
    // Verificar si estamos en un dispositivo móvil
    if (!Capacitor.isNativePlatform()) {
      errorMessage.value = 'Barcode scanning is only supported on mobile devices.';
      return;
    }

    const { supported } = await BarcodeScanner.isSupported();
    if (!supported) {
      errorMessage.value = 'Barcode scanner is not supported on this device.';
      return;
    }

    let { camera } = await BarcodeScanner.checkPermissions();
    if (camera !== 'granted') {
      const permission = await BarcodeScanner.requestPermissions();
      if (permission.camera !== 'granted') {
        errorMessage.value = 'Camera permission not granted.';
        return;
      }
    }

    const { barcodes } = await BarcodeScanner.scan({ formats: ['QR_CODE'] });

    if (barcodes.length > 0) {
      scannedBarcode.value = barcodes[0].rawValue || 'No data';
    }
  } catch (error) {
    console.error('Error scanning barcode:', error);
    errorMessage.value = 'Error scanning barcode';
  }
};

</script>

<style scoped>
.camera-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #000;
  color: white;
  padding: 20px;
}

.scan-result {
  margin-top: 20px;
  color: white;
  font-size: 1.2rem;
  text-align: center;
}

.error-message {
  margin-top: 20px;
  color: red;
  font-size: 1rem;
  text-align: center;
}

ion-content {
  --background: #000;
}

ion-toolbar {
  --background: rgba(0, 0, 0, 0.8);
  --color: white;
}
</style>
