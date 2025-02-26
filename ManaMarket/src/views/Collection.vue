<template>
  <ion-page>
    <HeaderLogo></HeaderLogo>
    <ion-content class="collection-container">
      <!-- Header -->
      <div class="header">
        <button class="back-button" @click="router.back()">
          <ion-icon :icon="arrowBackOutline"></ion-icon>
        </button>

      </div>

      <!-- Search Bar -->
      <div class="search-bar">
        <input 
          type="text" 
          placeholder="Card Name"
          class="search-input"
          v-model="searchQuery"
        />
        <button class="search-button">
          <ion-icon :icon="searchOutline"></ion-icon>
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="loading-container">
        <ion-spinner name="crescent"></ion-spinner>
      </div>

      <!-- Card Grid -->
      <div v-else class="cards-grid">
        <div v-for="(card, index) in cards" :key="index" class="card-wrapper">
          <img 
            :src="card.image" 
            :alt="card.name" 
            class="card-image"
            @error="handleImageError(index)"
          />
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { IonPage, IonContent, IonIcon, IonSpinner } from '@ionic/vue';
import { 
  searchOutline, 
  arrowBackOutline,
} from 'ionicons/icons';
import HeaderLogo from '@/components/HeaderLogo.vue';

const router = useRouter();
const searchQuery = ref('');
const loading = ref(true);
const cards = ref([]);

// Use Vite's import.meta.glob to get all jpg files from the cards directory
const imageFiles = import.meta.glob('@/cards/*.jpg', { eager: true });

// Convert imported files to URLs
const imageUrls = Object.values(imageFiles).map(file => file.default);

// Function to get a random image
const getRandomImage = () => {
  if (imageUrls.length === 0) return '/placeholder-card.jpg';
  return imageUrls[Math.floor(Math.random() * imageUrls.length)];
};

// Handle image loading errors
const handleImageError = (index) => {
  cards.value[index].image = '/placeholder-card.jpg';
};

// Initialize cards with random images
const initializeCards = () => {
  try {
    cards.value = Array(24).fill(null).map(() => ({
      name: "Mistbreath Elder",
      image: getRandomImage()
    }));
  } catch (error) {
    console.error('Error initializing cards:', error);
    // Fallback to placeholder images
    cards.value = Array(24).fill({
      name: "Mistbreath Elder",
      image: '/placeholder-card.jpg'
    });
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  initializeCards();
});
</script>

<style scoped>
.collection-container {
  --background: #121212;
  min-height: 100vh;
}

.header {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 1rem;
  background-color: #121212;
  position: sticky;
  top: 1.5rem;
  z-index: 10;
  margin-top: 2rem;
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}

.back-button {
  background-color: #d87219;
  border: none;
  border-radius: 9999px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
}

.back-button:hover {
  background-color: #c56516;
}

.title {
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
  
}

.search-bar {
  position: relative;
  margin: 1rem;
}

.search-input {
  width: 100%;
  background-color: #383838;
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: none;
  outline: none;
  font-size: 0.875rem;
  height: 45px;
}

.search-input::placeholder {
  color: #7c7c7c;
}

.search-button {
  position: absolute;
  right: 0;
  top: 0;
  height: 45px;
  width: 45px;
  background-color: #d87219;
  border: none;
  border-radius: 0 0.5rem 0.5rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
}

.search-button:hover {
  background-color: #c56516;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  padding: 1rem;
  margin-bottom: 8rem;
}

.card-wrapper {
  aspect-ratio: 2.5/3.5;
  border-radius: 0.5rem;
  overflow: hidden;
  background-color: #383838;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

ion-icon {
  font-size: 1.5rem;
}
</style>