<template>
  <ion-page>
    <HeaderLogo></HeaderLogo>
    <ion-content class="collection-container">
      <!-- Header -->
      <div class="header">
        <button class="back-button" @click="router.back()">
          <ion-icon :icon="arrowBackOutline"></ion-icon>
        </button>
        <h1 class="title">Commander:</h1>
        <button class="edit-button" @click="editDeck">
          <ion-icon :icon="pencilOutline"></ion-icon>
        </button>
      </div>

      <!-- Commander Card -->
      <div class="commander-card">
        <img :src="commander.image" :alt="commander.name" class="card-image" />
      </div>

      <!-- Creatures Section -->
      <div class="section">
        <h2>CREATURES ({{ creatures.length }})</h2>
        <div class="cards-grid">
          <div v-for="(card, index) in creatures" :key="index" class="card-wrapper">
            <img :src="card.image" :alt="card.name" class="card-image" />
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { IonPage, IonContent, IonIcon } from '@ionic/vue';
import { arrowBackOutline, pencilOutline } from 'ionicons/icons';
import HeaderLogo from '@/components/HeaderLogo.vue';

const router = useRouter();

const commander = ref({
  name: "Bello, Bard of the Brambles",
  image: "https://cards.scryfall.io/large/front/c/9/c976edeb-0fa1-4647-a16c-870d8a3c30c6.jpg?1727175653"
});

const creatures = ref(Array(34).fill({
  name: "Magic Card",
  image: "https://cards.scryfall.io/large/front/0/4/040d064e-b023-4750-afeb-1f58e36bc4ab.jpg?1738357042"
}));

const editDeck = () => {
  console.log("Edit deck clicked");
};
</script>

<style scoped>
.collection-container {
  --background: #121212;
  min-height: 100vh;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: #121212;
  position: sticky;
  top: 1.5rem;
  z-index: 10;
}

.back-button, .edit-button {
  font-size: 24px;
  background-color: #d87219;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;

}

.back-button:hover, .edit-button:hover {
  background-color: #c56516;
}

.title {
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
}

.commander-card {
  display: flex;
  justify-content: center;
  margin: 1.5rem 0;
}

.card-image {
  width: 200px;
  border-radius: 10px;
}

.section {
  padding: 1rem;
  color: white;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
}

.card-wrapper {
  aspect-ratio: 2.5/3.5;
  border-radius: 0.5rem;
  overflow: hidden;
}
</style>
