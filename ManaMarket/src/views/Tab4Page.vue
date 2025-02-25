<template>
  <ion-page>
    <ion-content class="search-container">
      <HeaderLogo/>
      <div class="content-wrapper">
        <!-- Search Bar -->
        <div class="search-bar">
          <input 
            type="text" 
            placeholder="Card Name"
            class="search-input"
          />
          <button class="search-button">
            <ion-icon :icon="searchOutline" class="search-icon"></ion-icon>
          </button>
        </div>

        <!-- Filter Toggle Button -->
        <button class="filter-toggle" @click="showFilters = !showFilters">
          <span>Filters</span>
          <ion-icon :icon="chevronDownOutline" :class="{'rotate': showFilters}"></ion-icon>
        </button>

        <!-- Filters Section -->
        <div class="filters-section" :class="{'expanded': showFilters}">
          <div class="filters-grid">
            <!-- Primera fila -->
            <div class="filters-row">
              <div class="filter-group">
                <label>Language</label>
                <select class="filter-select">
                  <option>All</option>
                </select>
              </div>

              <div class="filter-group">
                <label>Expansion</label>
                <select class="filter-select">
                  <option>All</option>
                </select>
              </div>
            </div>

            <!-- Segunda fila -->
            <div class="filters-row">
              <div class="filter-group price-input-container">
                <label>Min. Price</label>
                <input type="number" placeholder="0.00" class="filter-input" />
              </div>

              <div class="filter-group price-input-container">
                <label>Max. Price</label>
                <input type="number" placeholder="0.00" class="filter-input" />
              </div>

              <div class="filter-group">
                <label>Min Condition</label>
                <select class="filter-select">
                  <option>Poor</option>
                </select>
              </div>
            </div>

            <!-- Tercera fila -->
            <div class="filters-row">
              <div class="filter-group">
                <label>Foil?</label>
                <select class="filter-select">
                  <option>Any</option>
                </select>
              </div>

              <div class="filter-group">
                <label>Rarity</label>
                <select class="filter-select">
                  <option>Rare</option>
                </select>
              </div>

              <div class="filter-group">
                <label>Altered</label>
                <select class="filter-select">
                  <option>Any</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <swiper
            :modules="[SwiperAutoplay, SwiperPagination, SwiperNavigation]"
            :slides-per-view="3"
            :space-between="50"
            :pagination="{ clickable: true }"
            :navigation="false"
            :autoplay="{ delay: 3000, disableOnInteraction: false }"
            :breakpoints="{
              '640': {
                slidesPerView: 2,
                spaceBetween: 15,
              },
              '768': {
                slidesPerView: 3,
                spaceBetween: 20,
              },
            }"
            class="trending-carousel"
          >
            <swiper-slide v-for="(card, index) in trendingCards" :key="index">
              <ion-card class="card-item-car">
                <ion-img :src="card.image" :alt="card.name" class="card-image-car"></ion-img>
              </ion-card>
            </swiper-slide>
          </swiper>

        <!-- Cards List -->
        <div class="cards-list">
          <div class="card-item" v-for="(card, index) in cards" :key="index">
            <div class="card-content">
              <div class="card-left">
                <ion-icon :icon="cameraOutline" class="camera-icon"></ion-icon>
                <span class="card-name">{{ card.name }}</span>
              </div>
              <div class="card-right">
                <span class="card-price">{{ card.price }}</span>
                <button class="cart-button">
                  <ion-icon :icon="cartOutline"></ion-icon>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import { IonPage, IonContent, IonIcon, IonHeader } from '@ionic/vue';
import { searchOutline, cartOutline, cameraOutline, chevronDownOutline } from 'ionicons/icons';
import HeaderLogo from '@/components/HeaderLogo.vue';


import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Rename the modules to avoid conflicts
const SwiperAutoplay = Autoplay;
const SwiperPagination = Pagination;
const SwiperNavigation = Navigation;

const trendingCards = [
  { name: 'Card 1', image: 'https://cards.scryfall.io/large/front/3/1/31e4b7a1-b377-49d2-a92e-4bcb0db35f16.jpg?1721428130' },
  { name: 'Card 1', image: 'https://cards.scryfall.io/large/front/b/d/bd8fa327-dd41-4737-8f19-2cf5eb1f7cdd.jpg?1614638838' },
  { name: 'Card 1', image: 'https://cards.scryfall.io/normal/front/0/2/02cbd397-3ef3-465f-84fe-765dd1444af8.jpg?1698988417' },
  { name: 'Card 1', image: 'https://cards.scryfall.io/normal/front/5/9/59793f1c-8c7e-433e-9c09-40aa3ce931a1.jpg?1730489103' },
  { name: 'Card 1', image: 'https://cards.scryfall.io/normal/front/7/9/79ba5c35-6e5c-406a-b95f-844d5ec296ab.jpg?1692933638' },
  { name: 'Card 1', image: 'https://cards.scryfall.io/normal/front/d/0/d0d33d52-3d28-4635-b985-51e126289259.jpg?1599707796' },
  { name: 'Card 2', image: 'https://cards.scryfall.io/normal/front/9/3/93f786a2-a7b7-4f9e-92e8-9a6a11efe290.jpg?1627428096' },
  { name: 'Card 3', image: 'https://cards.scryfall.io/normal/front/2/e/2e261489-8dde-4594-8868-69f432f03d03.jpg?1740336344' },
];



const showFilters = ref(false);
const cards = ref(Array(11).fill({
  name: 'Sol Ring',
  price: '1,99$'
}));
</script>

<style scoped>
.search-container {
  --background: #000000;
  min-height: 100vh;
}

.content-wrapper {
  padding: 1.5rem;
  max-width: 600px;
  margin-top: 2rem;
}

.search-bar {
  position: relative;
  margin-bottom: 1rem;
}

.search-input {
  width: 100%;
  background-color: #1A1A1A;
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: none;
  outline: none;
  font-size: 0.875rem;
  height: 45px;
}

.search-button {
  position: absolute;
  right: 0;
  top: 0;
  height: 45px;
  width: 45px;
  background-color: #E67E22;
  border: none;
  border-radius: 0 0.5rem 0.5rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
}

.search-button:hover {
  background-color: #D35400;
}

.search-icon {
  color: white;
  font-size: 1.5rem;
}

.filter-toggle {
  width: 100%;
  background-color: #E67E22;
  border: none;
  border-radius: 0.5rem;
  color: white;
  padding: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  cursor: pointer;
}

.filter-toggle ion-icon {
  transition: transform 0.3s ease;
}

.filter-toggle ion-icon.rotate {
  transform: rotate(180deg);
}

.filters-section {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
}

.filters-section.expanded {
  max-height: 500px;
  margin-bottom: 1rem;
}

.filters-grid {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.filters-row {
  display: grid;
  gap: 1rem;
  width: 100%;
}

/* Primera fila: 2 columnas */
.filters-row:nth-child(1) {
  grid-template-columns: 1fr 1fr;
}

/* Segunda fila: 3 columnas */
.filters-row:nth-child(2) {
  grid-template-columns: 1fr 1fr 1fr;
}

/* Tercera fila: 3 columnas */
.filters-row:nth-child(3) {
  grid-template-columns: 1fr 1fr 1fr;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-group label {
  color: white;
  font-size: 0.875rem;
  font-weight: 500;
}

.filter-select,
.filter-input {
  width: 100%;
  background-color: #1A1A1A;
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: none;
  outline: none;
  height: 45px;
  font-size: 0.875rem;
}

/* Input placeholder color */
input::placeholder {
  color: #666;
}

/* Select arrow styling */
select {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23666666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1em;
  padding-right: 2rem;
}

.cards-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.card-item {
  background-color: #1A1A1A;
  border-radius: 0.5rem;
}

.card-content {
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.camera-icon {
  color: #E67E22;
  font-size: 1.5rem;
}

.card-name {
  color: #ffffff;
  font-size: 1rem;
}

.card-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.card-price {
  color: white;
  font-weight: 500;
}

.cart-button {
  background: none;
  border: none;
  color: #E67E22;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cart-button ion-icon {
  font-size: 1.25rem;
}

/* Focus states */
.search-input:focus,
.filter-select:focus,
.filter-input:focus {
  box-shadow: 0 0 0 2px #E67E22;
}

/* Remove default focus outline */
button:focus,
input:focus,
select:focus {
  outline: none;
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .content-wrapper {
    padding: 1rem;
  }

  .filters-row {
    gap: 0.75rem;
  }

  .filter-select,
  .filter-input {
    padding: 0.75rem 0.5rem;
    font-size: 0.8rem;
  }
}


.trending-carousel {
  width: 100%;
  height: 180px; /* Altura reducida */
  padding: 10px 0; /* Padding reducido */
}

.card-item-car {
  margin: 0;
  background: #2a2a2a;
  height: 130px; /* Altura fija más pequeña */
  width: 90px; /* Ancho fijo más pequeño */
}

.card-image-car {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

/* Controles del carrusel más pequeños */
.trending-carousel :deep(.swiper-button-next),
.trending-carousel :deep(.swiper-button-prev) {
  color: #E67E22;
  transform: scale(0.7); /* Hace las flechas más pequeñas */
}

.trending-carousel :deep(.swiper-button-next):after,
.trending-carousel :deep(.swiper-button-prev):after {
  font-size: 20px; /* Tamaño de flecha más pequeño */
}

.trending-carousel :deep(.swiper-pagination-bullet) {
  background: #fff;
  width: 6px; /* Bullets más pequeños */
  height: 6px;
}

/* Ajuste del espacio para los controles */
.trending-carousel :deep(.swiper-button-next) {
  right: 5px;
}

.trending-carousel :deep(.swiper-button-prev) {
  left: 5px;
}
</style>