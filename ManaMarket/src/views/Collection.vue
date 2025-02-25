<template>
    <ion-page>
        <HeaderLogo></HeaderLogo>
      <ion-content class="collection-container">
        <!-- Header -->
        <div class="header">
          <button class="back-button" @click="router.back()">
            <ion-icon :icon="arrowBackOutline"></ion-icon>
          </button>
          <h1 class="title">Your collection</h1>
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
  
        <!-- Card Grid -->
        <div class="cards-grid">
          <div v-for="(card, index) in cards" :key="index" class="card-wrapper">
            <img :src="card.image" :alt="card.name" class="card-image" />
          </div>
        </div>

      </ion-content>
    </ion-page>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { IonPage, IonContent, IonIcon } from '@ionic/vue';
  import { 
    searchOutline, 
    arrowBackOutline,
    listOutline,
    walletOutline,
    cartOutline,
    cameraOutline
  } from 'ionicons/icons';
import HeaderLogo from '@/components/HeaderLogo.vue';
  
  const router = useRouter();
  const searchQuery = ref('');
  
  // Mock data - replace with actual API call
  const cards = ref(Array(24).fill({
    name: "Mistbreath Elder",
    image: "https://cards.scryfall.io/normal/front/3/1/31e4b7a1-b377-49d2-a92e-4bcb0db35f16.jpg?1721428130"
  }));
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
    gap: 0.5rem;
    padding: 1rem;
  }
  
  .card-wrapper {
    aspect-ratio: 2.5/3.5;
    border-radius: 0.5rem;
    overflow: hidden;
  }
  
  .card-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .bottom-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #1e1e1e;
    display: flex;
    justify-content: space-around;
    padding: 1rem;
  }
  
  .nav-button {
    background: none;
    border: none;
    color: white;
    padding: 0.5rem;
    cursor: pointer;
    transition: color 0.2s;
  }
  
  .nav-button:hover {
    color: #d87219;
  }
  
  .nav-button.active {
    color: #d87219;
  }
  
  ion-icon {
    font-size: 1.5rem;
  }
  </style>